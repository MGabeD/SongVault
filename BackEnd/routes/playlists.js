const express = require("express");
const router = express.Router();
const playListController = require("../controllers/playlist");

router.post("", playListController.createPlaylist);

module.exports = router;