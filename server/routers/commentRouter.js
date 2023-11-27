const express = require("express");
const router = express.Router();
// const authentication = require("../middlewares/authentication");
const {
  postComment
} = require("../controllers/commentControllers")

// data user ditaro di middlewares = req.fullName
router.post("/comment", postComment);
// router.post("/comment/:id", postComment);
// router.delete("/comment/:id", dpostC)

module.exports = router;