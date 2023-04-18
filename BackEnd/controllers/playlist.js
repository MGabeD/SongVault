const Playlist = require('../models/playlist');
const User = require('../models/user');
const Song = require('../models/song');

const { initializeFirebase } = require('../utils/firebase');

// const multer = require("multer");
// const fs = require('fs');
// const path = require('path');
// const admin = require('firebase-admin');
// const serviceAccount = require('../node_modules/songvault-7f750-firebase-adminsdk-6x758-8dfbc34995.json');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   storageBucket: 'gs://songvault-7f750.appspot.com'
// });

// const bucket = admin.storage().bucket();

// // Create a Multer storage object with options
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

const multer = require("multer");
const fs = require('fs');
const path = require('path');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const bucket = initializeFirebase();

exports.createPlaylist = async (req, res, next) => {
  try {
    upload.fields([
      { name: "Image", maxCount: 1 },
    ])(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).header('Content-Type', 'application/json').send("Failed to upload files");
      }

      if (!req.files || !req.files["Image"]) {
        return res.status(400).header('Content-Type', 'application/json').json({ message: "Missing files" });
      }

      const imageFile = req.files["Image"][0];

      const playlist = new Playlist({
        name: req.body.name,
        songs: req.body.songs,
        owner: req.body.owner,
        followers: req.body.followers,
      });

      const savedPlaylist = await playlist.save();
      console.log(savedPlaylist._id);

      const imageFileObject = bucket.file(
        `${savedPlaylist._id}/${imageFile.originalname}`
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
            imageFileObject.makePublic(),
          ]);

          savedPlaylist.imageLink = `https://storage.googleapis.com/${imageFileObject.bucket.name}/${imageFileObject.name}`;

          const upPlaylist = {
            imageLink: savedPlaylist.imageLink,
          };
          console.log(upPlaylist);
          await Playlist.updateOne({ _id: savedPlaylist._id }, { $set: upPlaylist });
          const members = [...playlist.followers, playlist.owner];
          User.updateMany({ _id: { $in: members } }, { $push: { playlists: savedPlaylist._id } })
            .then((result) => {
              // res.status(200).json({ message: "Playlist added to users' list of playlists" });
            })
            .catch((error) => {
              res.status(500).header('Content-Type', 'application/json').json({
                message: "Failed to add playlist to users' list of playlists",
                error: error
              });
            });
          savedPlaylist.imageLink = upPlaylist.imageLink;
          res.status(201).header('Content-Type', 'application/json').json({
            message: "Playlist created successfully",
            playlist: savedPlaylist,
          });
        } catch (error) {
          console.error(error);
          res.status(500).header('Content-Type', 'application/json').json({
            message: "Failed to save playlist with URL",
          });
        }
      });

      imageStream.end(imageFile.buffer);
    });
  } catch (error) {
    console.log(error);
    res.status(500).header('Content-Type', 'application/json').json({
      message: "An error occurred while creating the playlist",
    });
  }
};

exports.addSong = async (req, res) => {
  try {
    const playlistId = req.params.id;
    const songId = req.body.songId;

    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      return res.status(404).header('Content-Type', 'application/json').json({ message: 'Playlist not found' });
    }

    const song = await Song.findById(songId);
    if (!song) {
      return res.status(404).header('Content-Type', 'application/json').json({ message: 'Song not found' });
    }

    if (playlist.songs.includes(songId)) {
      return res.status(400).header('Content-Type', 'application/json').json({ message: 'Song already in playlist' });
    }

    playlist.songs.push(songId);
    await playlist.save();

    return res.status(200).header('Content-Type', 'application/json').json({ message: 'Song added to playlist', playlist });
  } catch (error) {
    console.error(error);
    res.status(500).header('Content-Type', 'application/json').json({ message: 'Failed to add song to playlist' });
  }
};

exports.getPlaylistById = async (req, res, next) => {
    Playlist.findById(req.params.id)
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
