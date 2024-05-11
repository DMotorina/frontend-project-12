import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

import routes from '../utilities/routes';
import getAuthHeader from '../utilities/getAuthHeader';

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async () => {
    const response = await axios.get(routes.channelsPath(), { headers: getAuthHeader() });
    return response.data;
  },
);

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({
  activeChannelId: '1',
  status: 'idle',
  error: null,
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    removeChannel: channelsAdapter.removeOne,
    updateChannel: channelsAdapter.updateOne,
    changeChannel: (state, action) => {
      const newState = state;
      const { id } = action.payload;

      newState.activeChannelId = id;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.pending, (state) => {
        const newState = state;
        newState.status = 'pending';
      })
      .addCase(fetchChannels.fulfilled, (state, action) => {
        const newState = state;
        channelsAdapter.setAll(state, action.payload);
        newState.status = 'loaded';
      })
      .addCase(fetchChannels.rejected, (state, action) => {
        const newState = state;
        newState.status = 'error';
        newState.error = action.error;
      });
  },
});

export const {
  addChannel, removeChannel, updateChannel, changeChannel,
} = channelsSlice.actions;
export const channelsSelectors = channelsAdapter.getSelectors((state) => state.channels);
export default channelsSlice.reducer;
