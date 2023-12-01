import TwitterIcon from '@mui/icons-material/Twitter';
import MessageIcon from '@mui/icons-material/Message';
import HomeIcon from '@mui/icons-material/Home';
import PaymentIcon from '@mui/icons-material/Payment';
import AssistWalkerTwoToneIcon from '@mui/icons-material/AssistWalkerTwoTone';

import { useDispatch } from 'react-redux';
import { paymentRequest, updateRole } from '@pages/Home/actions';
import { useLocation, useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import classes from './style.module.scss';

export const Sidebar = ({ onOpenTweetDialog }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handlePayment = () => {
    dispatch(paymentRequest(() => {
        dispatch(updateRole());
    }));
  };

  const navigateToHome = () => {
    navigate('/');
  };

  const navigateToMyPost = () => {
    navigate('/myPost');
  };
  
  const navigateToMsg = () => {
    navigate('/message');
  }

  return (
    <div className={classes.sidebar}>
      <TwitterIcon className={classes.sidebarTwitterIcon} />

      <div className={`${classes.sidebarOption} ${isActive('/') ? classes.active : ''}`} onClick={navigateToHome}>
        <HomeIcon color={isActive('/') ? 'primary' : 'inherit'} />
        <span>
          <FormattedMessage id="app_navigation_home" />
        </span>
      </div>
      <div onClick={navigateToMsg} className={classes.sidebarOption}>
        <MessageIcon color="inherit" />
        <span>
          <FormattedMessage id="app_navigation_message" />
        </span>
      </div>
      <div onClick={handlePayment} className={classes.sidebarOption}>
        <PaymentIcon color="inherit" />
        <span>
          <FormattedMessage id="app_navigation_payment" />
        </span>
      </div>
      <div
        className={`${classes.sidebarOption} ${isActive('/myPost') ? classes.active : ''}`}
        onClick={navigateToMyPost}
      >
        <AssistWalkerTwoToneIcon color={isActive('/myPost') ? 'primary' : 'inherit'} />
        <span>
          <FormattedMessage id="app_navigation_mypost" />
        </span>
      </div>
      <button type="submit" className={classes.sidebarTweet} onClick={onOpenTweetDialog}>
        <span>
          <FormattedMessage id="app_navigagtion_post" />
        </span>
      </button>
    </div>
  );
};
