const { Router } = require("express");
const {
  login,
  register,
  verifyEmail,
  checkOtpVerifyEmail,
} = require("../controllers/authController");

const {
  verifyEmailMiddleware,
} = require("../middleware/verifyEmailMiddleware");

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.post("/verifyEmail", verifyEmail);
router.post("/checkOtpVerifyEmail", verifyEmailMiddleware, checkOtpVerifyEmail);

module.exports = router;
