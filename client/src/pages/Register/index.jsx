import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage, injectIntl } from 'react-intl';

import { Skeleton } from '@mui/material';

import VerifyEmailOTP from '@components/VerifyEmailOTP';
import RegisterForm from '@components/RegisterForm';
import VerifyEmail from '@components/VerifyEmail';

import { selectLogin, selectStep } from '@pages/Register/selectors';

import classes from '@pages/Register/style.module.scss';

const Register = ({ login, step, intl: { formatMessage } }) => {
  const navigate = useNavigate();
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    if (login) {
      toast.error(formatMessage({ id: 'app_already_login' }));
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }
  }, [formatMessage, login, navigate]);

  const renderStep = () => {
    switch (step) {
      case 0:
        return <VerifyEmail />;
      case 1:
        return <VerifyEmailOTP />;
      case 2:
        return <RegisterForm />;
    }
  };

  return (
    <main className={classes.mainWrap}>
      <div className={classes.registerCardWrap}>
        <h2 className={classes.registerHeader}>
          <FormattedMessage id="app_header_register" />
        </h2>
        {renderStep()}
      </div>
      <div className={classes.imgWrap}>
        {imageLoading && <Skeleton className={classes.skeleton} variant="rectangular" />}
        <img
          src="https://source.unsplash.com/random/?sosial-media"
          alt=""
          onLoad={() => setImageLoading(false)}
          loading="lazy"
        />
      </div>
    </main>
  );
};

Register.propTypes = {
  intl: PropTypes.object,
  login: PropTypes.bool,
  step: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  login: selectLogin,
  step: selectStep,
});

export default injectIntl(connect(mapStateToProps)(Register));
