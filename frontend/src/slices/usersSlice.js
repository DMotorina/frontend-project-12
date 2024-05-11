import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: JSON.parse(localStorage.getItem('userId')) || {},
  reducers: {
    setCredentials: (state, action) => {
      localStorage.setItem('userId', JSON.stringify(action.payload));
      const newState = state;
      const { token, username } = action.payload;
      newState.token = token;
      newState.username = username;
    },
    removeCredentials: (state) => {
      const newState = state;
      localStorage.removeItem('userId');
      newState.token = null;
      newState.username = null;
    },
  },
});

export const { setCredentials, removeCredentials } = userSlice.actions;
export default userSlice.reducer;
