import { createSlice } from "@reduxjs/toolkit";
const initialState = {
   expOpen: false, 
  };
  const xpSlice = createSlice({
            name:'exp',
            initialState:{
                expOpen:false,
            },
            reducers:{
                closeExp:(state) =>{
                   state.expOpen = false;
                },
                openExp:(state) => {
                    state.expOpen = true;
                },
            },
  });
 export const {closeExp,openExp}= xpSlice.actions;

 export default xpSlice.reducer;