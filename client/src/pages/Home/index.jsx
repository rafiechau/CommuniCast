import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import TwitterIcon from '@mui/icons-material/Twitter';
import MessageIcon from '@mui/icons-material/Message';
import HomeIcon from '@mui/icons-material/Home';
import PaymentIcon from '@mui/icons-material/Payment';
import CardItem from '@components/CardItem';
import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';
// import { useNavigate } from 'react-router-dom';
import classes from './style.module.scss';
import { selectAllPosts } from './selectors';
import { getAllPosts } from './actions';

const Home = ({ allPosts }) => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [value, setValue] = useState(0);

  console.log(allPosts);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  // Penanganan jika allPosts belum tersedia atau dalam keadaan loading
  if (!allPosts || allPosts.loading) {
    return <div>Loading...</div>; // Atau komponen loading lainnya
  }

  // Penanganan jika terjadi error
  if (allPosts.error) {
    return <div>Error: {allPosts.error.message}</div>;
  }

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
            <h2>Payments</h2>
          </div>
          <button type="submit" className={classes.sidebarTweet}>
            <span>Tweet</span>
          </button>
        </div>
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
  allPosts: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  allPosts: selectAllPosts,
});

export default injectIntl(connect(mapStateToProps)(Home));
