const express = require('express');

const postRoute = require('./post.route');
const router = express.Router();

router.use('/post', postRoute);

module.exports = router;
