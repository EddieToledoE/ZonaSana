
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  isBarOpen: true, // Inicialmente, el componente "Bar" está abierto
};
const barSlice = createSlice({
    name: 'bar',
    initialState: {
      isBarOpen: false, // estado inicial
    },
    reducers: {
      closeBar: (state) => {
        state.isBarOpen = false; 
      },
      openBar: (state) => {
        state.isBarOpen = true; 
      },
    },
  });
export const { openBar, closeBar } = barSlice.actions;

export default barSlice.reducer;

