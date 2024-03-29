import { createSlice } from '@reduxjs/toolkit';

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
    }
})

export const { getMessages, addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;

