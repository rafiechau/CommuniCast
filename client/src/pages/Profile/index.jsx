import PropTypes from 'prop-types';

import classes from '@pages/Profile/style.module.scss';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUser } from '@containers/Client/selectors';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Skeleton } from '@mui/material';
import { ArrowBackIosNew } from '@mui/icons-material';
import { actionGetProfile, actionResetProfile } from './actions';
import { selectProfile } from './selectors';

const Profile = ({ user, profile }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!profile) {
      dispatch(actionGetProfile(user.id));
    }
    return () => {
      if (profile) {
        dispatch(actionResetProfile());
      }
    };
  }, [dispatch, profile, user.id]);

  return (
    <main className={classes.mainWrap}>
      <div className={classes.Wrap}>
        <h2>
          <FormattedMessage id="app_profile" />
        </h2>
        <div className={classes.imgWrap}>
          {loading && <Skeleton variant="circle" className={classes.skeleton} />}
          <img
            src="https://source.unsplash.com/random/?sosial-media"
            alt={profile?.fullName}
            loading="lazy"
            onLoad={() => setLoading(false)}
          />
        </div>
        <p>FullName : {profile?.fullName}</p>
        <p>E-mail : {profile?.email}</p>
        <p>Account Type : {profile?.role}</p>

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
