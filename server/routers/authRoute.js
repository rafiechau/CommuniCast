const { Router } = require("express");
const {
  login,
  register,
  verifyEmail,
  checkOtpVerifyEmail,
  forgotPassword,
  setResetPassword,
  getProfile,
  editProfile,
  editPhotoProfile,
  deleteUser,
  logout,
} = require("../controllers/authController");

const {
  verifyEmailMiddleware,
} = require("../middleware/verifyEmailMiddleware");
const {
  verifySendResetMiddleware,
} = require("../middleware/sendResetPassMiddleware");
const {
  authenticationMiddleware,
} = require("../middleware/AuthenticationMiddleware");

const { multerMiddleware } = require("../utils/multer");

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.post("/verifyEmail", verifyEmail);
router.post("/checkOtpVerifyEmail", verifyEmailMiddleware, checkOtpVerifyEmail);
router.post("/forgotPassword", forgotPassword);
router.put("/resetPassword", verifySendResetMiddleware, setResetPassword);

router.use(authenticationMiddleware);
router.get("/logout", logout);
router.get("/profile", getProfile);
router.put("/edit/photoProfile", multerMiddleware, editPhotoProfile);
router.put("/edit/profile", editProfile);
router.delete("/delete/profile", deleteUser);

module.exports = router;
