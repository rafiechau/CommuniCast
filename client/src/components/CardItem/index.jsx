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
import { connect, useDispatch } from 'react-redux';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { createStructuredSelector } from 'reselect';
import { useState } from 'react';

const CardItem = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

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
  return (
    <Card sx={{ width: '100%', marginTop: 3, position: 'relative' }}>
      <CardMedia sx={{ height: 140 }} image="/static/images/cards/contemplative-reptile.jpg" title="green iguana" />
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
        <CardContent sx={{ flex: '1 1 auto' }}>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents
            except Antarctica
          </Typography>
        </CardContent>
      </Box>

      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

CardItem.propTypes = {};

const mapStateToProps = createStructuredSelector({});

export default connect(mapStateToProps)(CardItem);
