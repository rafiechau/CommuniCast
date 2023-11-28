const { Router } = require("express");
const {
  login,
  register,
  verifyEmail,
  checkOtpVerifyEmail,
  forgotPassword,
  setResetPassword,
} = require("../controllers/authController");

const {
  verifyEmailMiddleware,
} = require("../middleware/verifyEmailMiddleware");
const {
  verifySendResetMiddleware,
} = require("../middleware/sendResetPassMiddleware");

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.post("/verifyEmail", verifyEmail);
router.post("/checkOtpVerifyEmail", verifyEmailMiddleware, checkOtpVerifyEmail);
router.post("/forgotPassword", forgotPassword);
router.put("/resetPassword", verifySendResetMiddleware, setResetPassword);

module.exports = router;
