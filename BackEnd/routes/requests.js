const express = require("express");
const router = express.Router();
const requestController = require("../controllers/request");

router.post("", requestController.createRequest);

router.put("/:id", requestController.updateRequest);

router.get("", requestController.getRequest);

router.get("/:id", requestController.getRequestById);

router.delete("/:id", requestController.deleteRequest);

module.exports = router;