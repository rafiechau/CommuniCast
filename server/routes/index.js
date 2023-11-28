const express = require('express');

const postRoute = require("./postRoute");

const router = express.Router();

router.use('/posts', postRoute);


module.exports = router;
