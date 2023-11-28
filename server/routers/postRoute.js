const express = require('express');
const {
    getPosts, getPostById, createPost
  } = require('../controllers/postController');
const { multerMiddleware } = require('../utils/multer');

const router = express.Router();

router.get('/', getPosts);
router.get('/:postId', getPostById);
router.post('/create',multerMiddleware, createPost)
// router.put('/edit/:postId', multerMiddleware, updatePost)


module.exports = router;
