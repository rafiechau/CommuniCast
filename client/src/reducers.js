import { combineReducers } from 'redux';

import appReducer, { storedKey as storedAppState } from '@containers/App/reducer';
import clientReducer, { storedKey as storedClientState } from '@containers/Client/reducer';
import registerReducer, { storedKey as storedRegisterState } from '@pages/Register/reducer';
import languageReducer from '@containers/Language/reducer';

import editProfileReducer from '@pages/EditProfile/reducer';
import profileReducer from '@pages/Profile/reducer';
import homeReducer from '@pages/Home/reducer';
import postDetailReducer from '@pages/Detail/reducer';

import myPostReducer from '@pages/MyPost/reducer';
import { mapWithPersistor } from './persistence';

const storedReducers = {
  app: { reducer: appReducer, whitelist: storedAppState },
  client: { reducer: clientReducer, whitelist: storedClientState },
  register: { reducer: registerReducer, whitelist: storedRegisterState },
};

const temporaryReducers = {
  language: languageReducer,
  home: homeReducer,
  postDetail: postDetailReducer,
  profile: profileReducer,
  editProfile: editProfileReducer,
  myPost: myPostReducer,
};

const createReducer = () => {
  const coreReducer = combineReducers({
    ...mapWithPersistor(storedReducers),
    ...temporaryReducers,
  });
  const rootReducer = (state, action) => coreReducer(state, action);
  return rootReducer;
};

export default createReducer;
