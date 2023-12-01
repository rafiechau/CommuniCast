import { Dialog, DialogTitle, DialogContent, TextField, Button, IconButton, Box } from '@mui/material';
import { useState } from 'react';

import { useDispatch } from 'react-redux';
import { CloseIcon } from 'stream-chat-react';
import ReactQuill from 'react-quill';

import config from '@config/index';

import { updatePostById } from '@pages/EditPost/action';
import 'react-quill/dist/quill.snow.css';
import classes from './style.module.scss';
import { FormattedMessage } from 'react-intl';

const EditPostDialog = ({ open, onClose, post, token }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(post.title);
  const [shortDescription, setShortDescription] = useState(post.shortDescription);
  const [des, setDes] = useState(post.des);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(post.image ? `${config.api.server}${post.image.replace('\\', '/')}` : '');

  const handleFiles = (files) => {
    if (files.length > 0) {
      const file = files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('shortDescription', shortDescription);
    formData.append('des', des);
    if (image) {
      formData.append('image', image);
    }
    // Dispatch update action
    dispatch(updatePostById(post.id, formData, token));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <FormattedMessage id="app_header_edit_post" />
        <IconButton onClick={onClose} style={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 2 }}>
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
          <label htmlFor="images" className={classes.dropContainer}>
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
          <ReactQuill className={classes.quill} theme="snow" value={des} onChange={setDes} />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            <FormattedMessage id="app_edit_post" />
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default EditPostDialog;
