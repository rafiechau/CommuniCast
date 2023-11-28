/* eslint-disable react/button-has-type */
import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import TwitterIcon from '@mui/icons-material/Twitter';
import { ping } from '@containers/App/actions';
import MessageIcon from '@mui/icons-material/Message';
import HomeIcon from '@mui/icons-material/Home';
import PaymentIcon from '@mui/icons-material/Payment';
import CardItem from '@components/CardItem';
import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import { createStructuredSelector } from 'reselect';
import { injectIntl } from 'react-intl';
import classes from './style.module.scss';

const Home = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  useEffect(() => {
    dispatch(ping());
  }, [dispatch]);

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
          <div className={classes.sidebarOption}>
            <PaymentIcon />
            <h2>Payments</h2>
          </div>
          <button className={classes.sidebarTweet}>
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
              <CardItem />
              <CardItem />
              <CardItem />
              <CardItem />
              <CardItem />
              <CardItem />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {};

const mapStateToProps = createStructuredSelector({});

export default injectIntl(connect(mapStateToProps)(Home));
