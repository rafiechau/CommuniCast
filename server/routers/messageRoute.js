const { Router } = require("express");
const {
  authenticationMiddleware,
} = require("../middleware/AuthenticationMiddleware");

const {
  token,
  createChannels,
  getUsersAvailableMessage,
} = require("../controllers/messageController");

const router = Router();

router.use(authenticationMiddleware);
router.post("/token", token);
router.post("/createChannel", createChannels);
router.get("/userAvailable", getUsersAvailableMessage);

module.exports = router;
