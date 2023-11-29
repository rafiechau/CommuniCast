const express = require("express");
const router = express.Router();
const { authenticationMiddleware } = require("../middleware/AuthenticationMiddleware")
const {
  postComment,
  deleteComment,
  editComment,
  midtrans,
  updateRoleStatus
} = require("../controllers/commentControllers")

// router.post("/comment/:id", postComment);
router.post("/comment", postComment);
router.put("/comment/:id", editComment)
router.delete("/comment/:id", deleteComment)
router.post("/midtras", authenticationMiddleware, midtrans)
router.put("/payment", authenticationMiddleware, updateRoleStatus)

module.exports = router;