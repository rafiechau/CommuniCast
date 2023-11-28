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
} from '@mui/material';
import { connect } from 'react-redux';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import { createStructuredSelector } from 'reselect';
import { useState } from 'react';
import config from '@config/index';
import { useNavigate } from 'react-router-dom';

const CardItem = ({ post }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [loadingImg, setLoadingImage] = useState(true);
  const open = Boolean(anchorEl);

  const navigateDetails = () => {
    navigate(`/post/${post?.id}`);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    // Fungsi untuk menghapus post
    handleClose();
  };

  const handleUpdate = () => {
    // Fungsi untuk memperbarui post
    handleClose();
  };

  // Cek jika image ada dan valid
  const imageUrl =
    post && post?.image
      ? `${config.api.server}${post?.image.replace('\\', '/')}`
      : 'https://source.unsplash.com/random';

  return (
    <Card sx={{ width: '100%', marginTop: 3, position: 'relative' }}>
      <CardMedia
        sx={{ height: 140 }}
        loading="lazy"
        image={imageUrl}
        title={post?.title || 'Image'}
        onLoad={() => setLoadingImage(false)}
      />
      <IconButton
        aria-label="settings"
        aria-controls="menu-post"
        aria-haspopup="true"
        onClick={handleClick}
        sx={{ position: 'absolute', top: 8, right: 8 }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu id="menu-post" anchorEl={anchorEl} keepMounted open={open} onClose={handleClose}>
        <MenuItem onClick={handleUpdate}>Update Post</MenuItem>
        <MenuItem onClick={handleDelete}>Delete Post</MenuItem>
      </Menu>
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

      <CardActions>
        <IconButton>
          <FavoriteBorderIcon />
        </IconButton>
        <Typography variant="body2" sx={{ marginRight: 2 }}>
          10 Likes
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
};

const mapStateToProps = createStructuredSelector({});

export default connect(mapStateToProps)(CardItem);
