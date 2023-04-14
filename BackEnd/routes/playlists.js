const express = require("express");
const router = express.Router();
const playListController = require("../controllers/playlist");
const playlist = require("../models/playlist");

router.post("", playListController.createPlaylist);

router.put("/:id", playListController.addSong);

router.get("/:id", playListController.getPlaylistById);

module.exports = router;