const express = require("express");
const router = express.Router();
const comment = require("./commentRouter");
const authRoute = require("./authRoute");
const postsRoute = require("./postRoute");

router.use("/users", comment);
router.use("/posts", postsRoute);
router.use("/user", authRoute);

module.exports = router;
