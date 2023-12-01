import PropTypes from 'prop-types';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import InputRHF from '@components/InputRHF';

import { actionHandleRegister, actionHandleResetRegister, actionSetStep } from '@pages/Register/actions';
import { selectEmail, selectIsVerify, selectStep } from '@pages/Register/selectors';

import classes from '@components/RegisterForm/style.module.scss';

const RegisterForm = ({ email, isVerify, step, intl: { formatMessage } }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.email = email;
    dispatch(
      actionHandleRegister(data, () => {
        setTimeout(() => {
          dispatch(actionHandleResetRegister());
          navigate('/login');
        }, 1500);
      })
    );
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <InputRHF
        input={{
          name: 'fullName',
          required: formatMessage({ id: 'app_user_fullName_require_message' }),
          type: 'text',
          label: formatMessage({ id: 'app_user_fullName' }),
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

      <div className={classes.buttonWrap}>
        <button
          type="button"
          className={classes.buttonSubmit}
          onClick={() => (isVerify ? dispatch(actionSetStep(step - 2)) : dispatch(actionSetStep(step - 1)))}
        >
          <FormattedMessage id="app_back" />
        </button>
        <button type="submit" className={classes.buttonSubmit}>
          <FormattedMessage id="app_header_register" />
        </button>
      </div>
    </form>
  );
};

RegisterForm.propTypes = {
  intl: PropTypes.object,
  email: PropTypes.string,
  step: PropTypes.number,
  isVerify: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  email: selectEmail,
  step: selectStep,
  isVerify: selectIsVerify,
});

export default injectIntl(connect(mapStateToProps)(RegisterForm));
