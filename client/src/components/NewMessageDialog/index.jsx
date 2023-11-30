import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import config from '@config/index';

import { Avatar, Dialog } from '@mui/material';

import { actionAddChannel, actionGetUsersAvailable, actionResetUsersAvailable } from '@pages/Message/actions';
import { selectUsersAvailable } from '@pages/Message/selectors';

import classes from '@components/NewMessageDialog/style.module.scss';

const NewMessageDialog = ({ users, isOpen, handleDialogOpen }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!users) {
      dispatch(actionGetUsersAvailable());
    }
    return () => {
      if (users) {
        dispatch(actionResetUsersAvailable());
      }
    };
  }, [dispatch, users]);

  const handleAddChannel = (id) => {
    handleDialogOpen();
    dispatch(actionAddChannel(id));
    dispatch(actionResetUsersAvailable());
  };

  return (
    <Dialog open={isOpen} onClose={handleDialogOpen} PaperProps={{ className: classes.dialogWrapper }}>
      <div className={classes.title}>
        <FormattedMessage id="app_select_meesage_user" />
      </div>
      <div className={classes.listWrap}>
        {users?.map((val, key) => (
          <div className={classes.userListWrap} key={key} onClick={() => handleAddChannel(val.id)}>
            <div className={classes.userListHeader}>
              {val?.imagePath ? (
                <Avatar src={`${config.api.server}${val?.imagePath}`} />
              ) : (
                <Avatar className={classes.avatar}>
                  {val?.fullName?.split(' ')[0][0]} {val?.fullName?.split(' ')[1][0]}
                </Avatar>
              )}
              <div className={classes.userName}>{val.fullName}</div>
            </div>
          </div>
        ))}
        {users?.length === 0 && <div>No User Available</div>}
      </div>
      <button
        type="button"
        onClick={() => {
          handleDialogOpen();
          dispatch(actionResetUsersAvailable());
        }}
        className={classes.button}
      >
        <FormattedMessage id="app_popup_close_button_label" />
      </button>
    </Dialog>
  );
};

NewMessageDialog.propTypes = {
  isOpen: PropTypes.bool,
  handleDialogOpen: PropTypes.func,
  users: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  users: selectUsersAvailable,
});
export default connect(mapStateToProps)(NewMessageDialog);
