const express = require("express");
const router = express.Router();
const comment = require("./commentRouter");
const posts = require("./postRoute");

router.use("/users", comment);
router.use("/posts", posts);
module.exports = router;