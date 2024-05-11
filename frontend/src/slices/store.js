import { configureStore } from '@reduxjs/toolkit';

import userReducer from './usersSlice';
import channelsReducer from './channelsSlice';
import messagesReducer from './messagesSlice';
import modalSlice from './modalSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    channels: channelsReducer,
    messages: messagesReducer,
    modal: modalSlice,
  },
});
