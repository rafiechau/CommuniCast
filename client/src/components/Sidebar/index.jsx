import TwitterIcon from '@mui/icons-material/Twitter';
import MessageIcon from '@mui/icons-material/Message';
import HomeIcon from '@mui/icons-material/Home';
import PaymentIcon from '@mui/icons-material/Payment';
import AssistWalkerTwoToneIcon from '@mui/icons-material/AssistWalkerTwoTone';

import { useDispatch } from 'react-redux';
import { paymentRequest } from '@pages/Home/actions';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import classes from './style.module.scss';

export const Sidebar = ({ onOpenTweetDialog }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handlePayment = () => {
    dispatch(paymentRequest());
  };

  const navigateToHome = () => {
    navigate('/');
  };

  const navigateToMyPost = () => {
    navigate('/myPost');
  };
  return (
    <div className={classes.sidebar}>
      <TwitterIcon className={classes.sidebarTwitterIcon} />

      <div className={`${classes.sidebarOption} ${isActive('/') ? classes.active : ''}`} onClick={navigateToHome}>
        <HomeIcon color={isActive('/') ? 'primary' : 'inherit'} />
        <span>Home</span>
      </div>
      <div className={classes.sidebarOption}>
        <MessageIcon color="inherit" />
        <span>Message</span>
      </div>
      <div onClick={handlePayment} className={classes.sidebarOption}>
        <PaymentIcon color="inherit" />
        <span>Payments</span>
      </div>
      <div
        className={`${classes.sidebarOption} ${isActive('/myPost') ? classes.active : ''}`}
        onClick={navigateToMyPost}
      >
        <AssistWalkerTwoToneIcon color={isActive('/myPost') ? 'primary' : 'inherit'} />
        <span>My Tweet</span>
      </div>
      <button type="submit" className={classes.sidebarTweet} onClick={onOpenTweetDialog}>
        <span>Tweet</span>
      </button>
    </div>
  );
};
