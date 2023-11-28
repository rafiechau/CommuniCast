const express = require("express");
const router = express.Router();
// const authentication = require("../middlewares/authentication");
const {
  postComment,
  deleteComment,
  editComment,
  midtrans
} = require("../controllers/commentControllers")

// router.post("/comment/:id", postComment);
router.post("/comment", postComment);
router.put("/comment/:id", editComment)
router.delete("/comment/:id", deleteComment)
router.post("/midtras", midtrans)

module.exports = router;