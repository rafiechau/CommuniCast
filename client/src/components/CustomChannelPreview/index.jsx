import PropTypes from 'prop-types';
import CryptoJS from 'crypto-js';

import { Avatar } from '@mui/material';

import classes from '@components/CustomChannelPreview/style.module.scss';

const CustomChannelPreview = ({
  displayImage,
  displayTitle,
  lastMessage,
  latestMessage,
  channel,
  setActiveChannel,
}) => {
  const handleDecrypt = () => {
    const plainText = CryptoJS.AES.decrypt(lastMessage?.text, import.meta.env.VITE_CRYPTOJS_SECRET).toString(
      CryptoJS.enc.Utf8
    );
    if (plainText === '') {
      return lastMessage.text;
    }
    return plainText;
  };
  return (
    <div className={classes.userListWrap} onClick={() => setActiveChannel(channel)}>
      <div className={classes.userListHeader}>
        <Avatar src={displayImage} />
        <div className={classes.wrapText}>
          <div className={classes.userName}>{displayTitle}</div>
          <div className={classes.lastMessage}>
            {lastMessage &&
            lastMessage.type !== 'deleted' &&
            (lastMessage?.text !== '' || lastMessage?.text !== 'This message was deleted...')
              ? handleDecrypt()
              : lastMessage?.text}
            {typeof latestMessage === 'string' && latestMessage}
          </div>
        </div>
      </div>
    </div>
  );
};

CustomChannelPreview.propTypes = {
  displayTitle: PropTypes.string,
  displayImage: PropTypes.string,
  lastMessage: PropTypes.object,
  latestMessage: PropTypes.any,
  channel: PropTypes.object,
  setActiveChannel: PropTypes.func,
};
export default CustomChannelPreview;
