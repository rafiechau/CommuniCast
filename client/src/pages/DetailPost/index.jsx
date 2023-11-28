import BottomNavigation from '@components/BottomNavigation';
import { Avatar, BottomNavigationAction, Box, Card, CardContent, IconButton, Typography } from '@mui/material';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import MessageIcon from '@mui/icons-material/Message';
import HomeIcon from '@mui/icons-material/Home';
import PaymentIcon from '@mui/icons-material/Payment';
import TwitterIcon from '@mui/icons-material/Twitter';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import { useState } from 'react';
import classes from './style.module.scss';

const DetailPost = () => {
  const [value, setValue] = useState(0);
  return (
    <div className={classes.app}>
      <Box
        sx={{
          width: '100%',
          display: { xs: 'block', sm: 'none' },
          position: 'fixed',
          bottom: 0,
          zIndex: 99999,
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
            <div className={classes.feedHeader}>
              <div className={classes.arrowBackFeedHeader}>
                <ArrowBackIcon />
              </div>
              <h2>Post</h2>
            </div>
            {/* tweet box  */}

            {/* post tweet  */}
            <Card className={classes.detailTweet}>
              <CardContent>
                <div className={classes.tweetHeader}>
                  <Avatar alt="User Name" src="/user-image.jpg" />
                  <div className={classes.tweetInfo}>
                    <Typography variant="h6">User Name</Typography>
                    <Typography variant="body2">5h ago</Typography>
                  </div>
                </div>
                <Typography variant="body1">
                  Ini adalah isi dari sebuah tweet yang cukup panjang untuk menjadi contoh.
                </Typography>
                <div className={classes.tweetActions}>
                  <IconButton aria-label="comment">
                    <ModeCommentIcon />
                  </IconButton>
                  <IconButton aria-label="like">
                    <FavoriteBorderIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                </div>
              </CardContent>
            </Card>
            {[1, 2, 3, 4, 5, 6].map((comment, index) => (
              <Card key={index} className={classes.comment}>
                <CardContent>
                  <Typography variant="body2">User Comment</Typography>
                  <Typography variant="body1">Ini adalah komentar.</Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

DetailPost.propTypes = {};

const mapStateToProps = createStructuredSelector({});

export default injectIntl(connect(mapStateToProps)(DetailPost));
