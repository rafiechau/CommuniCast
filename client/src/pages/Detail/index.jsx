import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import TwitterIcon from '@mui/icons-material/Twitter';
import { ping } from '@containers/App/actions';
import MessageIcon from '@mui/icons-material/Message';
import HomeIcon from '@mui/icons-material/Home';
import PaymentIcon from '@mui/icons-material/Payment';
import CardItem from '@components/CardItem';
import CardDetail from '@components/CardDetail';
import { BottomNavigation, BottomNavigationAction, Box, CircularProgress } from '@mui/material';
import classes from './style.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { getPostById } from './actions';
import { createStructuredSelector } from 'reselect';
import { selectPost } from './selectors';
import { selectLoading } from '@containers/App/selectors';
import { injectIntl } from 'react-intl';

const Detail = ({ post, loading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postId } = useParams();
  const [value, setValue] = useState(0);

  useEffect(() => {
    dispatch(getPostById(postId));
  }, [dispatch, postId]);

  console.log(post)

  return (
    <div className={classes.app}>
      <Box
        sx={{
          width: '100%',
          display: { xs: 'block', sm: 'none', position: 'fixed', bottom: 0, width: '100%', zIndex: 1000 },
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
          <div className={classes.sidebarOption}>
            <PaymentIcon />
            <h2>Payments</h2>
          </div>
          <button type="submit" className={classes.sidebarTweet}>
            <span>Tweet</span>
          </button>
        </div>
        <div className={classes.appMain}>
          <div className={classes.feed}>
            <div className={classes.post}>
              {loading ? (
                <div className={classes.loading}>
                  <CircularProgress color="warning" />
                </div>
              ) : (
                <CardDetail key={post.id} post={post} />
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
};

const mapStateToProps = createStructuredSelector({
  post: selectPost,
  loading: selectLoading,
});

export default injectIntl(connect(mapStateToProps)(Detail));
