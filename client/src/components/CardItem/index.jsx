import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@mui/material';
import { connect, useDispatch } from 'react-redux';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import { createStructuredSelector } from 'reselect';
import { useEffect, useState } from 'react';
import config from '@config/index';
import { useNavigate } from 'react-router-dom';
import { selectToken } from '@containers/Client/selectors';
import { checkUserVote, deletePostById, likePost, unLikePost } from '@pages/Home/actions';
import { selectUserVotes } from '@pages/Home/selectors';

const CardItem = ({ post, token, userHasVoted, onEdit, isEditable = false }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [loadingImg, setLoadingImage] = useState(true);
  const open = Boolean(anchorEl);
  const [isLiked, setIsLiked] = useState(false);
  const [voteCount, setVoteCount] = useState(post?.voteCount || 0);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const navigateDetails = () => {
    navigate(`/post/${post?.id}`);
  };

  console.log(post);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  const handleOpenConfirmDialog = () => {
    setOpenConfirmDialog(true);
  };

  const handleDelete = () => {
    handleOpenConfirmDialog();
  };

  const handleConfirmDelete = () => {
    dispatch(deletePostById(post?.id, token));
    handleCloseConfirmDialog();
  };

  useEffect(() => {
    if (token && post?.id) {
      dispatch(checkUserVote(post.id, token));
    }
  }, [dispatch, token, post?.id]);

  useEffect(() => {
    setIsLiked(userHasVoted[post?.id]);
  }, [userHasVoted, post?.id]);

  const handleLikePost = (event) => {
    event.preventDefault();
    if (token && post) {
      if (!isLiked) {
        dispatch(likePost(post.id, token));
      } else {
        dispatch(unLikePost(post.id, token));
      }
      setIsLiked(!isLiked);
      setVoteCount(isLiked ? voteCount - 1 : voteCount + 1);
    }
  };

  // Cek jika image ada dan valid
  const imageUrl =
    post && post?.image
      ? `${config.api.server}${post?.image.replace('\\', '/')}`
      : 'https://source.unsplash.com/random';

  // const imageUser = `${config.api.server}${post?.user?.imagePath}`;

  return (
    <Card sx={{ width: '100%', marginTop: 3, position: 'relative' }}>
      {post?.image && (
        <CardMedia
          sx={{ height: 140 }}
          loading="lazy"
          image={imageUrl}
          title={post?.title || 'Image'}
          onLoad={() => setLoadingImage(false)}
        />
      )}
      <IconButton
        aria-label="settings"
        aria-controls="menu-post"
        aria-haspopup="true"
        onClick={handleClick}
        sx={{ position: 'absolute', top: 8, right: 8 }}
      >
        <MoreVertIcon />
      </IconButton>
      {isEditable && (
        <Menu id="menu-post" anchorEl={anchorEl} keepMounted open={open} onClose={handleClose}>
          <MenuItem onClick={() => onEdit()}>Update Post</MenuItem>
          <MenuItem onClick={handleDelete}>Delete Post</MenuItem>
        </Menu>
      )}
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}
        onClick={navigateDetails}
      >
        <CardContent sx={{ flex: '1 1 auto' }}>
          <Typography gutterBottom variant="h5" component="div">
            {post?.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {post?.shortDescription}
          </Typography>
        </CardContent>
      </Box>
      <Dialog
        open={openConfirmDialog}
        onClose={handleCloseConfirmDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Konfirmasi Hapus</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Apakah kamu yakin ingin menghapus post ini?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog}>Batal</Button>
          <Button onClick={handleConfirmDelete} autoFocus>
            Hapus
          </Button>
        </DialogActions>
      </Dialog>
      <CardActions>
        <IconButton onClick={handleLikePost}>
          {isLiked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
        </IconButton>
        <Typography variant="body2" sx={{ marginRight: 2 }}>
          {voteCount}
        </Typography>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

CardItem.propTypes = {
  post: PropTypes.object.isRequired,
  token: PropTypes.string,
  isEditable: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  token: selectToken,
  userHasVoted: selectUserVotes,
});

export default connect(mapStateToProps)(CardItem);
