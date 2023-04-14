const express = require("express");
const router = express.Router();
const playListController = require("../controllers/playlist");

router.post("", playListController.createPlaylist);

router.put("/:id", playListController.addSong);

module.exports = router;