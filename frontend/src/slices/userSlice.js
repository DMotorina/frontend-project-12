import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: null, 
    username: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token, username } = action.payload;
      state.token = token;
      state.username = username;
    },
  },
});

export const { setCredentials } = userSlice.actions;
export default userSlice.reducer;