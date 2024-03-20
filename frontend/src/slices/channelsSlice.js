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
        },
        updateChannel: (state, action) => {
            const { id, changes } = action.payload;
            const channel = state.channels.find((chann) => chann.id === id);
            channel.name = changes.name;
        }
    }
})

export const { getChannels, addChannel, removeChannel, updateChannel } = channelsSlice.actions;
export default channelsSlice.reducer;