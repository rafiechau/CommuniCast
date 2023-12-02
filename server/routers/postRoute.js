const express = require('express');
const {
    getPosts, getPostById, createPost, deletePost, likePost, unlikePost, updatePost, checkUserVote, getAllPostsByUser
  } = require('../controllers/postController');
const {
    authenticationMiddleware,
} = require("../middleware/AuthenticationMiddleware");
const { multerMiddleware } = require('../utils/multer');
const { authorizationRolePro } = require('../middleware/authorizationRole');

const router = express.Router();

router.get('/my-post', authenticationMiddleware, getAllPostsByUser);
router.get('/:postId', authenticationMiddleware, getPostById);

router.use(authenticationMiddleware);

router.get('/', getPosts);
router.get('/check-vote/:postId', checkUserVote);
router.post('/create', multerMiddleware, createPost)
router.put('/update/:postId', authorizationRolePro,multerMiddleware, updatePost)
router.delete('/delete/:postId', authorizationRolePro, deletePost);
router.post('/like/:postId', likePost);
router.delete('/unlike/:postId/', unlikePost);


module.exports = router;
