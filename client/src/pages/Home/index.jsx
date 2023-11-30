import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import CardItem from '@components/CardItem';
import { Box, Fab } from '@mui/material';
import 'react-quill/dist/quill.snow.css';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';
import { selectToken } from '@containers/Client/selectors';
import { CreatePostDialog } from '@components/CreatePostDialog';
import { Sidebar } from '@components/Sidebar';
import { BottomBar } from '@components/BottomNavigation';
import classes from './style.module.scss';
import { selectAllPosts } from './selectors';
import { getAllPosts } from './actions';

const Home = ({ allPosts, token }) => {
  const dispatch = useDispatch();
  const [isCreatePostDialogOpen, setIsCreatePostDialogOpen] = useState(false);

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
              <h2>Home</h2>
            </div>
            <div className={classes.post}>
              {allPosts && allPosts.length > 0 ? (
                allPosts.map((post) => <CardItem key={post.id} post={post} />)
              ) : (
                <div>No posts available</div>
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
