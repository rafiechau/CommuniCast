import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage, injectIntl } from 'react-intl';

import InputRHF from '@components/InputRHF';

import { selectEmail, selectIsVerify, selectStep } from '@pages/Register/selectors';
import { actionHandleSendEmailVerify, actionSetStep } from '@pages/Register/actions';

import classes from '@components/VerifyEmail/style.module.scss';

const VerifyEmail = ({ email, step, isVerify, intl: { formatMessage } }) => {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (!email || data.email !== email) dispatch(actionHandleSendEmailVerify(data));
    else if (isVerify) dispatch(actionSetStep(step + 2));
    else dispatch(actionSetStep(step + 1));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <InputRHF
        input={{
          name: 'email',
          required: formatMessage({ id: 'app_user_email_require_message' }),
          type: 'text',
          label: formatMessage({ id: 'app_user_email' }),
          pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i,
          messagePatern: formatMessage({ id: 'app_user_email_pattern_message' }),
          value: email,
        }}
        register={register}
        errors={errors}
      />
      <button type="submit" className={classes.buttonSubmit}>
        <FormattedMessage id="app_next" />
      </button>
      <div className={classes.formNav}>
        <p className={classes.nav}>
          <FormattedMessage id="app_have_account" />
          <Link to="/login">
            <FormattedMessage id="app_header_login" />
          </Link>
        </p>
      </div>
    </form>
  );
};

VerifyEmail.propTypes = {
  intl: PropTypes.object,
  step: PropTypes.number,
  email: PropTypes.string,
  isVerify: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  step: selectStep,
  email: selectEmail,
  isVerify: selectIsVerify,
});

export default injectIntl(connect(mapStateToProps)(VerifyEmail));
