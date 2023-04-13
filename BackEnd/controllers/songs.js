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
    if (!req.files || !req.files["Audio"] || !req.files["Image"]) {
        return res.status(400).json({ message: "Missing files" });
    }
      
    const audioFile = req.files["Audio"][0];
    const imageFile = req.files["Image"][0];
      
      // the rest of the code here
      
    // const audioFile = req.files["Audio"][0];
    // const imageFile = req.files["Image"][0];
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


