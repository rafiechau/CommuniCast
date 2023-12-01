import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import CardItem from '@components/CardItem';
import { Box, Fab } from '@mui/material';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage, injectIntl } from 'react-intl';
import { selectToken } from '@containers/Client/selectors';
import EditPostDialog from '@components/EditPostDialog';
import { CreatePostDialog } from '@components/CreatePostDialog';
import { Sidebar } from '@components/Sidebar';
import { BottomBar } from '@components/BottomNavigation';
import { selectAllMyPosts } from './selectors';
import { getMyPost } from './actions';
import 'react-quill/dist/quill.snow.css';
import classes from './style.module.scss';

const MyPostPage = ({ myPosts, token }) => {
  const dispatch = useDispatch();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [isCreatePostDialogOpen, setIsCreatePostDialogOpen] = useState(false);

  const handleOpenCreatePostDialog = () => {
    setIsCreatePostDialogOpen(true);
  };

  const handleCloseCreatePostDialog = () => {
    setIsCreatePostDialogOpen(false);
  };

  useEffect(() => {
    if (token) {
      dispatch(getMyPost({ token }));
    }
  }, [dispatch, token]);

  const handleEditPost = (post) => {
    setEditingPost(post);
    setEditDialogOpen(true);
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
        {/* Bottom Navigation untuk Mobile */}

        <Sidebar onOpenTweetDialog={handleOpenCreatePostDialog} />
        <CreatePostDialog open={isCreatePostDialogOpen} onClose={handleCloseCreatePostDialog} />
        <div className={classes.appMain}>
          <div className={classes.feed}>
            <div className={classes.feedHeader}>
              <h2>
                <FormattedMessage id="app_navigation_mypost" />
              </h2>
            </div>
            <div className={classes.post}>
              {myPosts.userPosts && myPosts.userPosts.length > 0 ? (
                myPosts.userPosts.map((post) => (
                  <CardItem key={post.id} post={post} onEdit={() => handleEditPost(post)} isEditable />
                ))
              ) : (
                <div>
                  <FormattedMessage id="app_no_post_available" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {editDialogOpen && (
        <EditPostDialog
          open={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          post={editingPost}
          token={token}
        />
      )}
    </div>
  );
};

MyPostPage.propTypes = {
  myPosts: PropTypes.object,
  token: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  myPosts: selectAllMyPosts,
  token: selectToken,
});

export default injectIntl(connect(mapStateToProps)(MyPostPage));
