import { createSlice } from '@reduxjs/toolkit';
import { removeChannel } from './channelsSlice';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: { messages: [] },
  reducers: {
    getMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    extraReducers: (builder) => {
      builder
        .addCase(removeChannel, (state, { payload }) => {
          state.messages = state.messages.filter(
            (message) => message.channelId !== payload.id,
          );
        });
    },
  },
});

export const { getMessages, addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
