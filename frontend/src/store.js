import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import channelsReducer from './slices/channelsSlice'
import messagesReducer from './slices/messagesSlice'


export const store = configureStore({
  reducer: {
    user: userReducer,
    channels: channelsReducer,
    messages: messagesReducer,
  },
})

export default store;
