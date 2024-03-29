import { createSlice } from '@reduxjs/toolkit';

const defaultCurrentChannelId = 1;

const channelsSlice = createSlice({
    name: 'channels',
    initialState: { channels: [], currentChannelId: defaultCurrentChannelId },
    reducers: {
        getChannels: (state, {payload}) => {
            state.channels = payload;
        },
        addChannel: (state, {payload}) => {
            state.newChannelId = payload.id;
            state.channels.push(payload);
        },
        removeChannel: (state, {payload}) => {
            state.channels = state.channels.filter(
                (channel) => channel.id !== payload.id,
            );

            if (state.currentChannelId === payload.id) {
                state.currentChannelId = defaultCurrentChannelId;
            }
        },
        updateChannel: (state, {payload}) => {
            const { id, changes } = payload;
            const channel = state.channels.find((chann) => chann.id === id);
            channel.name = changes.name;
        }
    }
})

export const { getChannels, addChannel, removeChannel, updateChannel } = channelsSlice.actions;
export default channelsSlice.reducer;