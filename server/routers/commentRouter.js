const express = require("express");
const router = express.Router();
// const authentication = require("../middlewares/authentication");
const {
  postComment,
  deleteComment
} = require("../controllers/commentControllers")

// router.post("/comment/:id", postComment);
router.post("/comment", postComment);
router.delete("/comment/:id", deleteComment)

module.exports = router;