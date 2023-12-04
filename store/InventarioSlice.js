import { createSlice } from "@reduxjs/toolkit";
const initialState = {
   isInventarioOpen: false, 
  };
  const inventarioSlice = createSlice({
            name:'Inv',
            initialState:{
                isInventarioOpen:false,
            },
            reducers:{
                closeInv:(state) =>{
                   state.isInventarioOpen = false;
                },
                openInv:(state) => {
                    state.isInventarioOpen = true;
                },
            },
  });
 export const {closeInv,openInv}= inventarioSlice.actions;

 export default inventarioSlice.reducer;