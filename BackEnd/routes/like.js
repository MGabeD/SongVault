const express = require("express");
const router = express.Router();
const likeController = require("../controllers/like");

router.put("/:id", likeController.addLike);

router.delete("/:id", likeController.deleteLike);

module.exports = router;