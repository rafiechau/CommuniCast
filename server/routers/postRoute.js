const express = require('express');
const {
    getPosts, getPostById, createPost, deletePost, likePost, unlikePost, updatePost, checkUserVote
  } = require('../controllers/postController');
const {
    authenticationMiddleware,
} = require("../middleware/AuthenticationMiddleware");
const { multerMiddleware } = require('../utils/multer');

const router = express.Router();


router.get('/:postId', getPostById);

router.use(authenticationMiddleware);
router.get('/', getPosts);
router.get('/check-vote/:postId', checkUserVote);
router.post('/create',multerMiddleware, createPost)
router.put('/update/:postId',multerMiddleware, updatePost)
router.delete('/delete/:postId', deletePost);
router.post('/like/:postId', likePost);
router.delete('/unlike/:postId/', unlikePost);


module.exports = router;
