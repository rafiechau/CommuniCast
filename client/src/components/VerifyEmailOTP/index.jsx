import PropTypes from 'prop-types';
import Countdown from 'react-countdown';
import { useForm } from 'react-hook-form';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage, injectIntl } from 'react-intl';

import InputRHF from '@components/InputRHF';

import { selectEmail, selectExpire, selectStep, selectTokenEmail } from '@pages/Register/selectors';
import { actionHandleSendEmailVerify, actionHandleSendOTP, actionSetStep } from '@pages/Register/actions';

import classes from '@components/VerifyEmailOTP/style.module.scss';

const VerifyEmailOTP = ({ tokenVerify, isExpire, email, step, intl: { formatMessage } }) => {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.token = tokenVerify;
    dispatch(actionHandleSendOTP(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <InputRHF
        input={{
          name: 'otp',
          required: formatMessage({ id: 'app_user_otp_require_message' }),
          type: 'number',
          label: formatMessage({ id: 'app_user_otp' }),
          minLength: 4,
          messageMin: formatMessage({ id: 'app_user_otp' }),
        }}
        register={register}
        errors={errors}
      />

      <div className={classes.timerComp}>
        <FormattedMessage id="app_resend" /> ?
        <Countdown date={isExpire}>
          <button
            type="button"
            onClick={() => {
              dispatch(actionHandleSendEmailVerify({ email }));
              dispatch(actionSetStep(1));
            }}
            className={classes.buttonResend}
          >
            <FormattedMessage id="app_resend" />
          </button>
        </Countdown>
      </div>
      <div className={classes.buttonWrap}>
        <button type="button" className={classes.buttonSubmit} onClick={() => dispatch(actionSetStep(step - 1))}>
          <FormattedMessage id="app_back" />
        </button>
        <button type="submit" className={classes.buttonSubmit}>
          <FormattedMessage id="app_next" />
        </button>
      </div>
    </form>
  );
};

VerifyEmailOTP.propTypes = {
  intl: PropTypes.object,
  step: PropTypes.number,
  tokenVerify: PropTypes.string,
  email: PropTypes.string,
  isExpire: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  tokenVerify: selectTokenEmail,
  step: selectStep,
  email: selectEmail,
  isExpire: selectExpire,
});

export default injectIntl(connect(mapStateToProps)(VerifyEmailOTP));
