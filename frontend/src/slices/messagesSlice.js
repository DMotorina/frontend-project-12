import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

import routes from '../utilities/routes';
import getAuthHeader from '../utilities/getAuthHeader';

import { removeChannel } from './channelsSlice';

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async () => {
    const response = await axios.get(routes.messagesPath(), { headers: getAuthHeader() });
    return response.data;
  },
);

const messagesAdapter = createEntityAdapter();

const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState({ status: 'idle', error: null }),
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeChannel, (state, action) => {
        const channelId = action.payload;

        const allMessages = Object.values(state.entities);
        const restMessages = allMessages.filter((m) => m.channelId !== channelId);

        messagesAdapter.setAll(state, restMessages);
      })
      .addCase(fetchMessages.pending, (state) => {
        const newState = state;
        newState.status = 'pending';
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        const newState = state;
        messagesAdapter.setAll(state, action.payload);
        newState.status = 'loaded';
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        const newState = state;
        newState.status = 'error';
        newState.error = action.error;
      });
  },
});

export const { addMessage } = messagesSlice.actions;
export const messagesSelectors = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;
