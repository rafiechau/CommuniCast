import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import TwitterIcon from '@mui/icons-material/Twitter';
import MessageIcon from '@mui/icons-material/Message';
import HomeIcon from '@mui/icons-material/Home';
import PaymentIcon from '@mui/icons-material/Payment';
import CardItem from '@components/CardItem';
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';
import { selectToken } from '@containers/Client/selectors';
import { CloseIcon } from 'stream-chat-react';
import { createPost } from '@pages/CreatePost/action';
import classes from './style.module.scss';
import { selectAllPosts } from './selectors';
import { getAllPosts, paymentRequest } from './actions';

const Home = ({ allPosts, token }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [image, setImage] = useState(null);
  const [des, setDes] = useState('');
  const [preview, setPreview] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  useEffect(() => {
    if (token) {
      dispatch(getAllPosts({ token }));
    }
  }, [dispatch, token]);

  if (!allPosts || allPosts.loading) {
    return <div>Loading...</div>;
  }

  const onSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('shortDescription', shortDescription);
    formData.append('des', des);
    if (image) {
      formData.append('image', image);
    }
    dispatch(createPost(formData, token));
  };

  // Penanganan jika terjadi error
  if (allPosts.error) {
    return <div>Error: {allPosts.error.message}</div>;
  }
  const handlePayment = () => {
    dispatch(paymentRequest());
  };

  return (
    <div className={classes.app}>
      <Box
        sx={{
          width: '100%',
          display: { xs: 'block', sm: 'none' },
          position: 'fixed',
          bottom: 0,
          zIndex: 1000,
        }}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Home" icon={<HomeIcon />} />
          <BottomNavigationAction label="Message" icon={<MessageIcon />} />
          <BottomNavigationAction label="Payments" icon={<PaymentIcon />} />
        </BottomNavigation>
      </Box>
      <div className={classes.appMainContent}>
        {/* Bottom Navigation untuk Mobile */}

        <div className={classes.sidebar}>
          <TwitterIcon className={classes.sidebarTwitterIcon} />

          <div className={classes.sidebarOption}>
            <HomeIcon />
            <h2>Home</h2>
          </div>
          <div className={classes.sidebarOption}>
            <MessageIcon />
            <h2>Message</h2>
          </div>
          <div onClick={handlePayment} className={classes.sidebarOption}>
            <PaymentIcon />
            <span>Payments</span>
          </div>
          <button type="submit" className={classes.sidebarTweet} onClick={handleOpen}>
            <span>Tweet</span>
          </button>
        </div>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle>
            Add Tweet
            <IconButton onClick={handleClose} style={{ position: 'absolute', right: 8, top: 8 }}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 2 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Short Description"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
              />
              <label htmlFor="images" className={classes.dropContainer} onDrop={handleDrop} onDragOver={handleDragOver}>
                {preview ? (
                  <img src={preview} alt="Preview" className={classes.imagePreview} />
                ) : (
                  <span className={classes.dropTitle}>Taruh file di sini atau klik untuk memilih</span>
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
        <div className={classes.appMain}>
          <div className={classes.feed}>
            <div className={classes.feedHeader}>
              <h2>Home</h2>
            </div>
            {/* tweet box  */}

            {/* post tweet  */}
            <div className={classes.post}>
              {allPosts.data && allPosts.data.length > 0 ? (
                allPosts.data.map((post) => <CardItem key={post.id} post={post} />)
              ) : (
                <div>No posts available</div> // Tampilkan jika tidak ada post
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {
  allPosts: PropTypes.array,
  token: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  allPosts: selectAllPosts,
  token: selectToken,
});

export default injectIntl(connect(mapStateToProps)(Home));
