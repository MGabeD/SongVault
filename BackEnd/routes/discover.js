const express = require("express");
const router = express.Router();
const discController = require("../controllers/discover");

router.get("", discController.getDisc);

module.exports = router;