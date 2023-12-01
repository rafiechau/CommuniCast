import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import CardDetail from '@components/CardDetail';
import { Box, CircularProgress, Fab } from '@mui/material';
import { useParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { selectLoading } from '@containers/App/selectors';
import { injectIntl } from 'react-intl';
import { Sidebar } from '@components/Sidebar';
import { CreatePostDialog } from '@components/CreatePostDialog';
import { BottomBar } from '@components/BottomNavigation';
import AddIcon from '@mui/icons-material/Add';
import { fetchCommentRequest, getPostById } from './actions';
import { selectComment, selectPost } from './selectors';

import classes from './style.module.scss';

const Detail = ({ post, loading, comment }) => {
  const dispatch = useDispatch();
  const [isCreatePostDialogOpen, setIsCreatePostDialogOpen] = useState(false);
  const { postId } = useParams();


  useEffect(() => {
    dispatch(getPostById(postId));
  }, [dispatch, postId]);

  useEffect(() => {
    dispatch(fetchCommentRequest(postId));
  }, [dispatch]);

  const refetchComments = () => {
    dispatch(fetchCommentRequest(postId));
  };

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
        {/* Bottom Navigation untuk Mobile */}

        <Sidebar onOpenTweetDialog={handleOpenCreatePostDialog} />
        <CreatePostDialog open={isCreatePostDialogOpen} onClose={handleCloseCreatePostDialog} />
        <div className={classes.appMain}>
          <div className={classes.feed}>
            <div className={classes.post}>
              {loading ? (
                <div className={classes.loading}>
                  <CircularProgress color="warning" />
                </div>
              ) : (
                <CardDetail comment={comment} post={post} postId={postId} refetchComments={refetchComments} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Detail.propTypes = {
  post: PropTypes.object,
  loading: PropTypes.bool,
  comment: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  post: selectPost,
  loading: selectLoading,
  comment: selectComment,
});

export default connect(mapStateToProps)(Detail);
