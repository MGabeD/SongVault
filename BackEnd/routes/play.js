const express = require("express");
const router = express.Router();
const playController = require("../controllers/play");

router.put("/:id", playController.playSong);

module.exports = router;