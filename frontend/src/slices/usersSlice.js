import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
  name: 'users',
  initialState: { token: null, username: null },
  reducers: {
    setCredentials: (state, action) => {
      const { token, username } = action.payload;
      state.token = token;
      state.username = username;
    },
    removeCredentials: (state) => {
      state.token = null;
      state.username = null;
    },
  },
});

export const { setCredentials, removeCredentials } = usersSlice.actions;
export default usersSlice.reducer;