const express = require("express");
const router = express.Router();
const comment = require("./commentRouter");
const authRoute = require("./authRoute");

router.use("/users", comment);
router.use("/user", authRoute);

module.exports = router;
