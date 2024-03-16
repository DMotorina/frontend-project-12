import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
    name: 'channels',
    initialState: { channels: [] },
    reducers: {
        getChannels: (state, action) => {
            state.channels = action.payload;
        },
        addChannel: (state, action) => {
            state.channels.push(action.payload);
        },
    }
})

export const { getChannels, addChannel } = channelsSlice.actions;
export default channelsSlice.reducer;