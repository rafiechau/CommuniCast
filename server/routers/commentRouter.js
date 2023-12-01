const express = require("express");
const router = express.Router();
const { authenticationMiddleware } = require("../middleware/AuthenticationMiddleware")
const { authorizationRolePro } = require('../middleware/authorizationRole');
const {
  getCommentById,
  postComment,
  deleteComment,
  editComment,
  midtrans,
  updateRoleStatus
} = require("../controllers/commentControllers")

// router.post("/comment/:id", postComment);
router.get("/comment/:id", authenticationMiddleware, getCommentById)
router.post("/comment/:id", authenticationMiddleware, postComment);
router.put("/comment/:id",authenticationMiddleware, authorizationRolePro, editComment)
router.delete("/comment/:id", deleteComment)
router.post("/midtras", authenticationMiddleware, midtrans)
router.put("/payment", authenticationMiddleware, updateRoleStatus)

module.exports = router;