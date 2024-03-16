import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './slices/usersSlice'
import channelsReducer from './slices/channelsSlice'
import messagesReducer from './slices/messagesSlice'


export const store = configureStore({
  reducer: {
    users: usersReducer,
    channels: channelsReducer,
    messages: messagesReducer,
  },
})

export default store;
