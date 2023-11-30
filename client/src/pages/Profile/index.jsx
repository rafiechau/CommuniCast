import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import config from '@config/index';

import { ArrowBackIosNew, Edit } from '@mui/icons-material';
import { Avatar, Button, Skeleton } from '@mui/material';

import { actionEditPhotoProfile, actionGetProfile, actionResetProfile } from '@pages/Profile/actions';
import { selectUser } from '@containers/Client/selectors';
import { selectProfile } from '@pages/Profile/selectors';

import classes from '@pages/Profile/style.module.scss';

const Profile = ({ user, profile }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInput = useRef(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!profile && user?.id) {
      dispatch(actionGetProfile(user?.id));
    }
    return () => {
      if (profile) {
        dispatch(actionResetProfile());
      }
    };
  }, [dispatch, profile, user?.id]);
  const handleImageChange = (e) => {
    dispatch(actionEditPhotoProfile(e.target.files[0]));
  };
  return (
    <main className={classes.mainWrap}>
      <div className={classes.Wrap}>
        <h2>
          <FormattedMessage id="app_profile" />
        </h2>
        <input type="file" ref={fileInput} style={{ display: 'none' }} onChange={handleImageChange} accept="image/*" />
        <div className={classes.imgWrap} onClick={() => fileInput.current.click()}>
          <Edit className={classes.buttonEdit} />
          {profile?.imagePath ? (
            <>
              {loading && <Skeleton variant="circle" className={classes.skeleton} />}
              <img
                src={`${config.api.server}${profile?.imagePath}`}
                alt={profile?.fullName}
                loading="lazy"
                onLoad={() => setLoading(false)}
              />
            </>
          ) : (
            <Avatar className={classes.avatar}>
              {profile?.fullName?.split(' ')[0][0]}{' '}
              {profile?.fullName?.split(' ') > 1 && profile?.fullName?.split(' ')[1][0]}
            </Avatar>
          )}
        </div>
        <p>
          <FormattedMessage id="app_user_fullName" /> : {profile?.fullName}
        </p>
        <p>
          <FormattedMessage id="app_user_email" /> : {profile?.email}
        </p>
        <p>
          <FormattedMessage id="app_account_type" /> : {profile?.role}
        </p>

        <button type="button" onClick={() => navigate('/profile/edit')} className={classes.buttonSubmit}>
          <FormattedMessage id="app_profile_edit" />
        </button>

        <Button
          type="button"
          startIcon={<ArrowBackIosNew />}
          size="small"
          className={classes.backButton}
          onClick={() => {
            navigate(-1);
          }}
        >
          <FormattedMessage id="app_back" />
        </Button>
      </div>
    </main>
  );
};

Profile.propTypes = {
  user: PropTypes.object,
  profile: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  user: selectUser,
  profile: selectProfile,
});

export default connect(mapStateToProps)(Profile);
