const express = require("express");
const router = express.Router();
const comment = require("./commentRouter");
const authRoute = require("./authRoute");
const postsRoute = require("./postRoute");
const messageRoute = require("./messageRoute");

router.use("/users", comment);
router.use("/posts", postsRoute);
router.use("/user", authRoute);
router.use("/chat", messageRoute);

module.exports = router;
