const express = require("express");
const router = express.Router();
const trenController = require("../controllers/trending");

router.get("", trenController.getTrending);

module.exports = router;