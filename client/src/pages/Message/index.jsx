import PropTypes from 'prop-types';
import { StreamChat } from 'stream-chat';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Chat, Channel, ChannelList } from 'stream-chat-react';
import { selectProfile, selectTokenStream } from '@pages/Message/selectors';
import { selectTheme } from '@containers/App/selectors';

import { actionGetProfile, actionGetTokenMessage, actionResetProfile } from '@pages/Message/actions';

import config from '@config/index';

import ChannelInner from '@components/ChannelInner';
import NewMessageDialog from '@components/NewMessageDialog';
import CustomChannelPreview from '@components/CustomChannelPreview';

import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';

import { showPopup } from '@containers/App/actions';

import classes from '@pages/Message/style.module.scss';
import 'stream-chat-react/dist/css/v2/index.css';

const Message = ({ theme, profile, tokenChat }) => {
  const dispatch = useDispatch();
  const [isConnect, setIsConnect] = useState(false);
  const [isMenuopen, setIsMenuOpen] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const client = StreamChat.getInstance(import.meta.env.VITE_STREAM_KEY);

  useEffect(() => {
    if (!profile) {
      dispatch(actionGetProfile());
    }
    if (!tokenChat) {
      dispatch(actionGetTokenMessage());
    }
    if (profile && tokenChat) {
      try {
        client.connectUser(
          {
            id: JSON.stringify(profile?.id),
            name: profile?.fullName,
            image: `${config.api.server}${profile?.imagePath}`,
          },
          tokenChat
        );
        setIsConnect(true);
      } catch (error) {
        dispatch(showPopup());
      }
    }
    return () => {
      if (profile && tokenChat) {
        client.disconnectUser(JSON.stringify(profile?.id));
        dispatch(actionResetProfile());
      }
    };
  }, [client, dispatch, profile, tokenChat]);

  return (
    <main className={classes.mainWrap}>
      {isConnect && (
        <div className={classes.chatWrap}>
          <Chat client={client} theme={`str-chat__theme-${theme}`}>
            <div className={`${classes.channelListWrap} ${isMenuopen && classes.open}`}>
              <Button startIcon={<Add />} className={classes.buttonNew} fullWidth onClick={() => setIsDialogOpen(true)}>
                <FormattedMessage id="app_add_new_message" />
              </Button>
              <div className={`${classes.channelList} str-chat str-chat__channel-list str-chat__theme-${theme}`}>
                <div onClick={() => setIsMenuOpen(false)}>
                  <ChannelList
                    filters={{ members: { $in: [JSON.stringify(profile?.id)] } }}
                    sort={{ last_message_at: -1 }}
                    Preview={CustomChannelPreview}
                  />
                </div>
              </div>
            </div>
            <div className={`${classes.chatBox} ${!isMenuopen && classes.open}`}>
              <Channel>
                <ChannelInner
                  isMenuOpen={isMenuopen}
                  setIsMenuOpen={setIsMenuOpen}
                  userId={JSON.stringify(profile?.id)}
                />
              </Channel>
            </div>
          </Chat>
        </div>
      )}
      <NewMessageDialog isOpen={isDialogOpen} handleDialogOpen={() => setIsDialogOpen(!isDialogOpen)} />
    </main>
  );
};

Message.propTypes = {
  tokenChat: PropTypes.string,
  profile: PropTypes.object,
  theme: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  profile: selectProfile,
  tokenChat: selectTokenStream,
  theme: selectTheme,
});

export default connect(mapStateToProps)(Message);
