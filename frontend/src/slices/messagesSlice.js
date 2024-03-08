import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
    name: 'messages',
    initialState: { messages: [] },
    reducers: {
        getMessages: (state, action) => {
            state.messages = action.payload;
        },
    }
})

export const { getMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
