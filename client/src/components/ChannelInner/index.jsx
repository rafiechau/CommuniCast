import PropTypes from 'prop-types';
import CryptoJS from 'crypto-js';
import toast from 'react-hot-toast';
import { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  ChannelHeader,
  ChatContext,
  MessageInput,
  Thread,
  VirtualizedMessageList,
  Window,
  useChannelActionContext,
  useChannelStateContext,
} from 'stream-chat-react';

import { ArrowBackIosNew, Delete } from '@mui/icons-material';
import { IconButton } from '@mui/material';

import { actionResetUsersAvailable } from '@pages/Message/actions';

import classes from '@pages/Message/style.module.scss';

const ChannelInner = ({ isMenuOpen, setIsMenuOpen, userId }) => {
  const dispatch = useDispatch();
  const { sendMessage } = useChannelActionContext();
  const { messages } = useChannelStateContext();
  const { channel } = useContext(ChatContext);
  const [encryptMessages, setEncryptMessage] = useState();

  useEffect(() => {
    if (messages.length > 0) {
      const n = messages.length - 1;
      const temp = messages[n].text;
      messages[n].text = CryptoJS.AES.decrypt(temp, import.meta.env.VITE_CRYPTOJS_SECRET).toString(CryptoJS.enc.Utf8);
      if (messages[n].text === '') {
        messages[n].text = temp;
      }
      messages[n].html = messages[n].html.replace(temp, messages[n].text);
      setEncryptMessage(messages);
    } else {
      setEncryptMessage(messages);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  const overrideSubmitHandler = (message) => {
    message.text = CryptoJS.AES.encrypt(message.text, import.meta.env.VITE_CRYPTOJS_SECRET).toString();
    sendMessage(message);
  };

  const onDelete = async () => {
    try {
      await channel.delete();
      setIsMenuOpen(true);
      dispatch(actionResetUsersAvailable());
    } catch (error) {
      toast.error('Failed to Delete');
    }
  };

  return (
    <div className={classes.windowWrap}>
      <Window>
        <div className={`${classes.headerChannelWrap} str-chat__channel-header`}>
          {!isMenuOpen && (
            <IconButton className={classes.hamburgerButton} onClick={() => setIsMenuOpen(true)}>
              <ArrowBackIosNew />
            </IconButton>
          )}
          <ChannelHeader />
          {channel.data.created_by.id === userId && (
            <IconButton onClick={() => onDelete()} sx={{ marginLeft: 'auto' }}>
              <Delete />
            </IconButton>
          )}
        </div>
        <VirtualizedMessageList messages={encryptMessages} />
        <MessageInput overrideSubmitHandler={overrideSubmitHandler} />
      </Window>
      <div className={classes.thread}>
        <Thread />
      </div>
    </div>
  );
};

ChannelInner.propTypes = {
  isMenuOpen: PropTypes.bool,
  setIsMenuOpen: PropTypes.func,
  userId: PropTypes.string,
};

export default ChannelInner;
