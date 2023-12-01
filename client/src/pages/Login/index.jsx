import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link, useNavigate } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';

import InputRHF from '@components/InputRHF';

import { Button, Skeleton } from '@mui/material';
import { ArrowBackIosNew } from '@mui/icons-material';

import { selectLogin } from '@pages/Login/selectors';
import { actionHandleLogin } from '@pages/Login/actions';

import classes from '@pages/Login/style.module.scss';

const Login = ({ login, intl: { formatMessage } }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [isAfterLogin, setIsAfterLogin] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (login && !isAfterLogin) {
      toast.error(formatMessage({ id: 'app_already_login' }));
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }
  }, [formatMessage, isAfterLogin, login, navigate]);

  const onSubmit = (data) => {
    setIsAfterLogin(true);
    dispatch(
      actionHandleLogin(data, () => {
        setTimeout(() => {
          navigate('/');
        }, 1500);
      })
    );
  };

  return (
    <main className={classes.mainWrap}>
      <div className={classes.imgWrap}>
        {imageLoading && <Skeleton className={classes.skeleton} variant="rectangular" />}
        <img
          src="https://source.unsplash.com/random/?sosial-media"
          alt=""
          onLoad={() => setImageLoading(false)}
          loading="lazy"
        />
      </div>
      <div className={classes.loginCardWrap}>
        <h2 className={classes.loginHeader}>
          <FormattedMessage id="app_header_login" />
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
          <InputRHF
            input={{
              name: 'email',
              required: formatMessage({ id: 'app_user_email_require_message' }),
              type: 'text',
              label: formatMessage({ id: 'app_user_email' }),
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i,
              messagePatern: formatMessage({ id: 'app_user_email_pattern_message' }),
            }}
            register={register}
            errors={errors}
          />
          <InputRHF
            input={{
              name: 'password',
              required: formatMessage({ id: 'app_user_password_require_message' }),
              type: showPass ? 'text' : 'password',
              label: formatMessage({ id: 'app_user_password' }),
              minLength: 8,
              messageMin: formatMessage({ id: 'app_user_password_min_length' }),
            }}
            register={register}
            errors={errors}
          >
            <label htmlFor="show" className={classes.showPassword}>
              <input type="checkbox" name="show" id="show" onChange={(e) => setShowPass(e.target.checked)} />
              <FormattedMessage id="app_user_password_show" />
            </label>
          </InputRHF>
          <button type="submit" className={classes.buttonSubmit}>
            <FormattedMessage id="app_header_login" />
          </button>
          <div className={classes.formNav}>
            <p className={classes.nav}>
              <FormattedMessage id="app_no_account" />
              <Link to="/register">
                <FormattedMessage id="app_header_register" />
              </Link>
            </p>
            <p className={classes.nav}>
              <FormattedMessage id="app_forgot_password" />?{' '}
              <Link to="/forgotPassword">
                <FormattedMessage id="app_forgot_password" />
              </Link>
            </p>
          </div>
        </form>
        <Button
          type="button"
          startIcon={<ArrowBackIosNew />}
          size="small"
          className={classes.backButton}
          onClick={() => {
            navigate('/');
          }}
        >
          <FormattedMessage id="app_back" />
        </Button>
      </div>
    </main>
  );
};

Login.propTypes = {
  intl: PropTypes.object,
  login: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  login: selectLogin,
});

export default injectIntl(connect(mapStateToProps)(Login));
