import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage, injectIntl } from 'react-intl';

import InputRHF from '@components/InputRHF';

import { selectUser } from '@containers/Client/selectors';
import { selectProfile } from '@pages/EditProfile/selectors';
import { actionDeleteSer, actionEditProfile, actionGetProfile, actionResetProfile } from '@pages/EditProfile/actions';

import classes from '@pages/EditProfile/style.module.scss';
import DeleteDialog from '@components/DeleteDialog';
import { Button } from '@mui/material';
import { ArrowBackIosNew } from '@mui/icons-material';

const EditProfile = ({ profile, user, intl: { formatMessage } }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (data.new_password === '') {
      delete data.new_password;
    }
    dispatch(
      actionEditProfile(data, () => {
        setTimeout(() => {
          navigate(-1);
        }, 1500);
      })
    );
  };

  const handleDelete = () => {
    dispatch(
      actionDeleteSer(() => {
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      })
    );
  };

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

  return (
    <main className={classes.mainWrap}>
      <h2>
        <FormattedMessage id="app_profile_edit" />
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <InputRHF
          input={{
            name: 'fullName',
            required: formatMessage({ id: 'app_user_fullName_require_message' }),
            type: 'text',
            label: formatMessage({ id: 'app_user_fullName' }),
            value: profile?.fullName,
          }}
          register={register}
          errors={errors}
        />

        <InputRHF
          input={{
            name: 'new_password',
            type: showPass ? 'text' : 'password',
            label: `${formatMessage({ id: 'app_user_new_password' })} (Optional)`,
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
          <button type="button" className={classes.deleteButton} onClick={() => setOpenDialog(true)}>
            <FormattedMessage id="app_delete_dialog_delete" />
          </button>
          <button type="submit" className={classes.buttonSubmit}>
            <FormattedMessage id="app_profile_edit" />
          </button>
        </div>
      </form>
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
      <DeleteDialog
        open={openDialog}
        handleDialog={() => setOpenDialog(!openDialog)}
        handleDelete={() => handleDelete()}
      />
    </main>
  );
};

EditProfile.propTypes = {
  intl: PropTypes.object,
  user: PropTypes.object,
  profile: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  profile: selectProfile,
  user: selectUser,
});
export default injectIntl(connect(mapStateToProps)(EditProfile));
