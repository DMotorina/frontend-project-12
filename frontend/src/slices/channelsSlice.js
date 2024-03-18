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
        removeChannel: (state, action) => {
            state.channels = state.channels.filter(
                (channel) => channel.id !== action.payload.id,
            );
        }
    }
})

export const { getChannels, addChannel, removeChannel } = channelsSlice.actions;
export default channelsSlice.reducer;