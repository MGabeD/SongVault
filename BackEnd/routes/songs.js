const express = require("express");
const router = express.Router();
const userController = require("../controllers/songs");

router.post("", songController.createSong);

router.put("/:id", songController.updateSong);

router.get("", songController.getSong);

router.get("/:id", songController.getSongById);

router.delete("/:id", songController.deleteSong);

module.exports = router;