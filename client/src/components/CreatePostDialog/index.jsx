import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import { CloseIcon } from 'stream-chat-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from '@pages/CreatePost/action';
import { FormattedMessage } from 'react-intl';

import classes from './style.module.scss';
import 'react-quill/dist/quill.snow.css';

export const CreatePostDialog = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [image, setImage] = useState(null);
  const [des, setDes] = useState('');
  const [preview, setPreview] = useState('');

  const resetForm = () => {
    setTitle('');
    setShortDescription('');
    setDes('');
    setImage(null);
    setPreview('');
  };

  const handleFiles = (files) => {
    if (files.length > 0) {
      const file = files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const { files } = event.dataTransfer;
    handleFiles(files);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('shortDescription', shortDescription);
    formData.append('des', des);
    if (image) {
      formData.append('image', image);
    }
    dispatch(createPost(formData));
    resetForm();
    onClose();
  };
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <FormattedMessage id="app_header_add_tweet" />
        <IconButton onClick={onClose} style={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label={<FormattedMessage id="app_form_title" />}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label={<FormattedMessage id="app_form_short_des" />}
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
          />
          <label htmlFor="images" className={classes.dropContainer} onDrop={handleDrop} onDragOver={handleDragOver}>
            {preview ? (
              <img src={preview} alt="Preview" className={classes.imagePreview} />
            ) : (
              <span className={classes.dropTitle}>
                <FormattedMessage id="app_form_image" />
              </span>
            )}
            <input
              type="file"
              id="images"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(event) => handleFiles(event.target.files)}
            />
          </label>
          {/* Add ReactQuill for content and image upload input */}
          <ReactQuill className={classes.quill} theme="snow" value={des} onChange={setDes} />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Submit Tweet
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

CreatePostDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
