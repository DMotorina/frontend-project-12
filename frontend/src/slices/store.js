import { configureStore } from '@reduxjs/toolkit';

import userReducer from './usersSlice.js';
import channelsReducer from './channelsSlice.js';
import messagesReducer from './messagesSlice.js';
import modalSlice from './modalSlice.js';

export default configureStore({
  reducer: {
    user: userReducer,
    channels: channelsReducer,
    messages: messagesReducer,
    modal: modalSlice,
  },
});
