import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import CardItem from '@components/CardItem';
import { Box, Fab, InputAdornment, TextField } from '@mui/material';
import 'react-quill/dist/quill.snow.css';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';
import { selectToken, selectUser } from '@containers/Client/selectors';
import { CreatePostDialog } from '@components/CreatePostDialog';
import { Sidebar } from '@components/Sidebar';
import { BottomBar } from '@components/BottomNavigation';
import SearchIcon from '@mui/icons-material/Search';
import classes from './style.module.scss';
import { selectAllPosts } from './selectors';
import { getAllPosts } from './actions';

const Home = ({ allPosts, token }) => {
  const dispatch = useDispatch();
  const [isCreatePostDialogOpen, setIsCreatePostDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredPosts = searchTerm
    ? allPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm) || post.shortDescription.toLowerCase().includes(searchTerm)
      )
    : allPosts;

  useEffect(() => {
    if (token) {
      dispatch(getAllPosts({ token }));
    }
  }, [dispatch, token]);

  if (!allPosts || allPosts.loading) {
    return <div>Loading...</div>;
  }

  if (allPosts.error) {
    return <div>Error: {allPosts.error.message}</div>;
  }

  const handleOpenCreatePostDialog = () => {
    setIsCreatePostDialogOpen(true);
  };

  const handleCloseCreatePostDialog = () => {
    setIsCreatePostDialogOpen(false);
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
        <BottomBar />
        <Fab
          color="primary"
          aria-label="add"
          className={classes.fab}
          onClick={handleOpenCreatePostDialog}
          sx={{ position: 'fixed', bottom: 60, right: 16 }}
        >
          <AddIcon />
        </Fab>
      </Box>

      <div className={classes.appMainContent}>
        <Sidebar onOpenTweetDialog={handleOpenCreatePostDialog} />
        <CreatePostDialog open={isCreatePostDialogOpen} onClose={handleCloseCreatePostDialog} />

        <div className={classes.appMain}>
          <div className={classes.feed}>
            <div className={classes.feedHeader}>
              <TextField
                variant="outlined"
                placeholder="Search posts..."
                onChange={handleSearchChange}
                sx={{ margin: '10px 0', width: '100%' }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div className={classes.post}>
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => <CardItem key={post.id} post={post} />)
              ) : (
                <div>{searchTerm ? 'No posts found matching your search' : 'No posts available'}</div>
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
  token: PropTypes.string
};

const mapStateToProps = createStructuredSelector({
  allPosts: selectAllPosts,
  token: selectToken,
});

export default injectIntl(connect(mapStateToProps)(Home));
