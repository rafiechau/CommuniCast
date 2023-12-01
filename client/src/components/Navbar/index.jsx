import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import { Twitter } from '@mui/icons-material';

import { setLocale, setTheme } from '@containers/App/actions';
import { actionHandleLogout } from '@pages/Login/actions';

import classes from './style.module.scss';

const Navbar = ({ login, title, locale, theme }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuPosition, setMenuPosition] = useState(null);
  const [profilePosition, setProfilePosition] = useState(null);
  const open = Boolean(menuPosition);
  const isPofileOpen = Boolean(profilePosition);

  const handleClick = (event) => {
    setMenuPosition(event.currentTarget);
  };

  const handleClose = () => {
    setMenuPosition(null);
  };

  const handleClickProfile = (event) => {
    setProfilePosition(event.currentTarget);
  };

  const handleCloseProfile = () => {
    setProfilePosition(null);
  };

  const handleTheme = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
  };

  const onSelectLang = (lang) => {
    if (lang !== locale) {
      dispatch(setLocale(lang));
    }
    handleClose();
  };

  const goHome = () => {
    navigate('/');
  };

  return (
    <div className={classes.headerWrapper} data-testid="navbar">
      <div className={classes.contentWrapper}>
        <div className={classes.logoImage} onClick={goHome}>
          <Twitter />
          <div className={classes.title}>{title}</div>
        </div>
        <div className={classes.toolbar}>
          <div className={classes.theme} onClick={handleTheme} data-testid="toggleTheme">
            {theme === 'light' ? <NightsStayIcon /> : <LightModeIcon />}
          </div>
          <div className={classes.toggle} onClick={handleClick}>
            <Avatar className={classes.avatar} src={locale === 'id' ? '/id.png' : '/en.png'} />
            <div className={classes.lang}>{locale}</div>
            <ExpandMoreIcon />
          </div>
          <Menu open={open} anchorEl={menuPosition} onClose={handleClose}>
            <MenuItem onClick={() => onSelectLang('id')} selected={locale === 'id'}>
              <div className={classes.menu}>
                <Avatar className={classes.menuAvatar} src="/id.png" />
                <div className={classes.menuLang}>
                  <FormattedMessage id="app_lang_id" />
                </div>
              </div>
            </MenuItem>
            <MenuItem onClick={() => onSelectLang('en')} selected={locale === 'en'}>
              <div className={classes.menu}>
                <Avatar className={classes.menuAvatar} src="/en.png" />
                <div className={classes.menuLang}>
                  <FormattedMessage id="app_lang_en" />
                </div>
              </div>
            </MenuItem>
          </Menu>
          <div className={classes.toggle} onClick={handleClickProfile}>
            <Avatar className={classes.avatar} />
            <div className={`${classes.lang} ${classes.profile}`}>
              <FormattedMessage id="app_user" />
            </div>
            <ExpandMoreIcon />
          </div>
          {login ? (
            <Menu open={isPofileOpen} anchorEl={profilePosition} onClose={handleCloseProfile}>
              <MenuItem
                onClick={() => {
                  navigate('/profile');
                  handleCloseProfile();
                }}
              >
                <div className={classes.menu}>
                  <div className={classes.menuLang}>
                    <FormattedMessage id="app_profile" />
                  </div>
                </div>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  dispatch(actionHandleLogout(() => navigate('/login')));
                }}
              >
                <div className={classes.menu}>
                  <div className={classes.menuLang}>
                    <FormattedMessage id="app_header_logout" />
                  </div>
                </div>
              </MenuItem>
            </Menu>
          ) : (
            <Menu open={isPofileOpen} anchorEl={profilePosition} onClose={handleCloseProfile}>
              <MenuItem onClick={() => navigate('/login')}>
                <div className={classes.menu}>
                  <div className={classes.menuLang}>
                    <FormattedMessage id="app_header_login" />
                  </div>
                </div>
              </MenuItem>
              <MenuItem onClick={() => navigate('/register')}>
                <div className={classes.menu}>
                  <div className={classes.menuLang}>
                    <FormattedMessage id="app_header_register" />
                  </div>
                </div>
              </MenuItem>
            </Menu>
          )}
        </div>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string,
  locale: PropTypes.string.isRequired,
  theme: PropTypes.string,
  login: PropTypes.bool,
};

export default Navbar;
