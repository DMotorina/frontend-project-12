import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: { isOpen: false, type: '' },
  reducers: {
    setModalShow: (state, action) => {
      const newState = state;
      const { type } = action.payload;
      newState.isOpen = true;
      newState.type = type;
    },
    removeModal: (state) => {
      const newState = state;
      newState.isOpen = false;
      newState.type = '';
    },
  },
});

export const { setModalShow, removeModal } = modalSlice.actions;
export default modalSlice.reducer;
