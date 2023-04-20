const Song = require('../models/song');
const User = require('../models/user')

const { initializeFirebase } = require('../utils/firebase');

// use the bucket object to upload and download files from Firebase Storage
// use the upload object to handle file uploads using multer

// initializeFirebase();
const multer = require("multer");
const fs = require('fs');
const path = require('path');
// const admin = require('firebase-admin');
// const serviceAccount = require('../node_modules/songvault-7f750-firebase-adminsdk-6x758-8dfbc34995.json');

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     storageBucket: 'gs://songvault-7f750.appspot.com'
//   });
  
  // const bucket = admin.storage().bucket();
  
//   // Create a Multer storage object with options
  const storage = multer.memoryStorage();
  const upload = multer({ storage: storage });
  const bucket = initializeFirebase();

exports.createSong = async (req, res, next) => {
    try {
      upload.fields([
        { name: "Audio", maxCount: 1 },
        { name: "Image", maxCount: 1 },
      ])(req, res, async (err) => {
        if (err) {
          console.error(err);
          return res.status(500).header('Content-Type', 'application/json').send("Failed to upload files");
        }
  
        if (!req.files || !req.files["Audio"] || !req.files["Image"]) {
          return res.status(400).header('Content-Type', 'application/json').json({ message: "Missing files" });
        }
  
        const audioFile = req.files["Audio"][0];
        const imageFile = req.files["Image"][0];
  
        const song = new Song({
          name: req.body.songName,
          artist: req.body.user,
          likes: req.body.likes,
          plays: req.body.plays,
          genre: req.body.genre,
          artistNames: req.body.userName,
        });
  
        const savedSong = await song.save();
        // console.log(savedSong._id);
  
        const audioFileObject = bucket.file(
          `${savedSong._id}/${audioFile.originalname}`
        );
        const audioStream = audioFileObject.createWriteStream({
          metadata: {
            contentType: audioFile.mimetype,
          },
        });
  
        audioStream.on("error", (err) => {
          console.error(err);
          res.status(500).header('Content-Type', 'application/json').send("Failed to upload audio file");
        });
  
        audioStream.on("finish", async () => {
          const imageFileObject = bucket.file(
            `${savedSong._id}/${imageFile.originalname}`
          );
          const imageStream = imageFileObject.createWriteStream({
            metadata: {
              contentType: imageFile.mimetype,
            },
          });
  
          imageStream.on("error", (err) => {
            console.error(err);
            res.status(500).header('Content-Type', 'application/json').send("Failed to upload image file");
          });
  
          imageStream.on("finish", async () => {
            try {
              await Promise.all([
                audioFileObject.makePublic(),
                imageFileObject.makePublic(),
              ]);
  
              savedSong.mp3Link = `https://storage.googleapis.com/${audioFileObject.bucket.name}/${audioFileObject.name}`;
              savedSong.imageLink = `https://storage.googleapis.com/${imageFileObject.bucket.name}/${imageFileObject.name}`;
  
              const upSong = {
                imageLink: savedSong.imageLink,
                mp3Link: savedSong.mp3Link,
              };
              console.log(upSong);
              await Song.updateOne({ _id: savedSong._id }, { $set: upSong });
              User.updateMany({ _id: { $in: song.artist } }, { $push: { songs: savedSong._id } })
                .then((result) => {
                    // res.status(200).json({ message: "Song added to users' list of songs" });
                })
                .catch((error) => {
                    res.status(500).header('Content-Type', 'application/json').json({
                    message: "Failed to add song to users' list of songs",
                    error: error
                    });
                });
                song.mp3Link = upSong.mp3Link;
                song.imageLink = upSong.imageLink;
              res.status(201).header('Content-Type', 'application/json').json({
                message: "Song created successfully",
                song: song,
              });
            } catch (error) {
              console.error(error);
              res.status(500).header('Content-Type', 'application/json').json({
                message: "Failed to save song with URLs",
              });
            }
          });
  
          imageStream.end(imageFile.buffer);
        });
  
        audioStream.end(audioFile.buffer);
      });
    } catch (error) {
      console.log(error);
      res.status(500).header('Content-Type', 'application/json').json({
        message: "An error occurred while creating the song",
      });
    }
};
  
exports.getSongById = (req,res, next) => {
    Song.findById(req.params.id)
        .then((post) => {
            if (post) {
                res.status(200).header('Content-Type', 'application/json').json(post)
            } else {
                res.status(404).header('Content-Type', 'application/json').json({ message: "Song not found!" });
            }
        })
        .catch((error) => {
            res.status(500).header('Content-Type', 'application/json').json({
                message: "Fetching Song failed!",
            });
        });
};

exports.getSong = (req, res, next) => {
    const pageSize = +req.query.pageSize;
    const currPage = +req.query.page;
    const songQuery = Song.find();
    let fetchedSong;
    if (pageSize && currPage) {
      songQuery.skip(pageSize * (currPage - 1)).limit(pageSize);
    }
    songQuery
      .populate() // populate all fields
      .then((docs) => {
        fetchedSong = docs;
        console.log(fetchedSong);
        return Song.countDocuments();
      })
      .then((count) => {
        res.status(200).header('Content-Type', 'application/json').json({
          message: "All songs fetched 200!",
          posts: fetchedSong,
          maxPosts: count,
        });
      })
      .catch((error) => {
        res.status(500).header('Content-Type', 'application/json').json({
          message: "Fetching songs failed!",
        });
      });
  };

exports.updateSong = (req, res, next) => {
    const updatedSong = {
        name: req.body.songName,
        artist: req.body.user,
        likes: req.body.likes,
        plays: req.body.plays,
        imageLink: req.body.imageLink,
        mp3Link: req.body.mp3Link,
        genre: req.body.genre,
        artistNames: req.body.userName,
    };
    // console.log(updatedSong);
    Song.updateOne({ _id: req.params.id }, { $set: updatedSong })
        .then((result) => {
            res.status(200).header('Content-Type', 'application/json').json({ message: "Update is successful!" });
        })
        .catch((error) => {
            res.status(500).header('Content-Type', 'application/json').json({
                message: "Couldn't update Song!",
            });
            console.log(error);
        });
};

exports.deleteSong = (req, res, next) => {
  // console.log("here");
  console.log(req.params.id);
  Song.findByIdAndDelete(req.params.id)
    .then((deletedSong) => {
      User.updateMany(
        { songs: { $in: [deletedSong._id] } },
        { $pull: { songs: deletedSong._id } }
      )
        .then(() => {
          res.status(200).header('Content-Type', 'application/json').json({ message: "Delete is successful!" });
        })
        .catch((error) => {
          res.status(500).header('Content-Type', 'application/json').json({
            message: "Couldn't delete song from user's list of songs!",
          });
        });
    })
    .catch((error) => {
      res.status(500).header('Content-Type', 'application/json').json({
        message: "Couldn't delete song!",
      });
    });
};
