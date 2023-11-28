const express = require("express");
const router = express.Router();
const comment = require("./commentRouter");

router.use("/users", comment);
module.exports = router;