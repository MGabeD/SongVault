const Song = require('../models/song');

const multer = require("multer");
const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');
const serviceAccount = require('../node_modules/songvault-7f750-firebase-adminsdk-6x758-8dfbc34995.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'gs://songvault-7f750.appspot.com'
  });
  
  const bucket = admin.storage().bucket();
  
  // Create a Multer storage object with options
  const storage = multer.memoryStorage();
  const upload = multer({ storage: storage });


exports.createSong = async (req, res, next) => {
  try {
    const audioFile = req.files["Audio"][0];
    const imageFile = req.files["Image"][0];
    const song = new Song({
      name: req.body.songName,
      artist: req.body.user,
      likes: req.body.likes,
      plays: req.body.plays,
    });

    const savedSong = await song.save();

    const audioFileObject = bucket.file(`${savedSong._id}/${audioFile.originalname}`);
    const audioStream = audioFileObject.createWriteStream({
      metadata: {
        contentType: audioFile.mimetype,
      },
    });

    audioStream.on("error", (err) => {
      console.error(err);
      res.status(500).send("Failed to upload audio file");
    });

    audioStream.on("finish", async () => {
      const imageFileObject = bucket.file(`${savedSong._id}/${imageFile.originalname}`);
      const imageStream = imageFileObject.createWriteStream({
        metadata: {
          contentType: imageFile.mimetype,
        },
      });

      imageStream.on("error", (err) => {
        console.error(err);
        res.status(500).send("Failed to upload image file");
      });

      imageStream.on("finish", async () => {
        try {
          savedSong.audioUrl = `gs://${audioFileObject.bucket.name}/${audioFileObject.name}`;
          savedSong.imageUrl = `gs://${imageFileObject.bucket.name}/${imageFileObject.name}`;
          const updatedSong = await savedSong.save();
          res.status(201).json({
            message: "Song created successfully",
            song: updatedSong,
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({
            message: "Failed to save song with URLs",
          });
        }
      });

      imageStream.end(imageFile.buffer);
    });

    audioStream.end(audioFile.buffer);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "An error occurred while creating the song",
    });
  }
};



exports.getSong = (req, res, next) => {
    const pageSize = +req.query.pageSize;
    const currPage = +req.query.page;
    const songQuery = User.find();
    let fetchedSong;
    if (pageSize && currPage) {
      songQuery.skip(pageSize * (currPage - 1)).limit(pageSize);
    }
    songQuery
      .populate() // populate all fields
      .then((docs) => {
        fetchedUser = docs;
        console.log(fetchedUser);
        return Song.countDocuments();
      })
      .then((count) => {
        res.status(200).json({
          message: "All song fetched 200!",
          posts: fetchedSong,
          maxPosts: count,
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: "Fetching Songs failed!",
        });
      });
  };  
  

exports.getUserById = (req,res, next) => {
    Song.findById(req.params.id)
        .then((post) => {
            if (post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({ message: "User not found!" });
            }
        })
        .catch((error) => {
            res.status(500).json({
                message: "Fetching user failed!",
            });
        });
};

exports.updateSong = (req, res, next) => {
    const updatedSong = {
        title: req.body.title,
        artist: req.body.artists
    };
    console.log(updatedSong);
    Song.updateOne({ _id: req.params.id }, { $set: updatedSong })
        .then((result) => {
            res.status(200).json({ message: "Update is successful!" });
        })
        .catch((error) => {
            res.status(500).json({
                message: "Couldn't update song!",
            });
            console.log(error);
        });
};

exports.deleteSong = (req, res, next) => {
    console.log("here");
    console.log(req.params.id);
    Song.deleteOne({ _id: req.params.id })
    .then((resp) => {
        res.status(200).json({ message: "Delete is successful!" });
    })
    .catch((error) => {
        res.status(500).json({
            message: "Couldn't delete song!",
        });
    });
};