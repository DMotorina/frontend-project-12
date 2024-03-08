import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
    name: 'channels',
    initialState: { channels: [] },
    reducers: {
        getChannels: (state, action) => {
            state.channels = action.payload;
        },
    }
})

export const { getChannels } = channelsSlice.actions;
export default channelsSlice.reducer;