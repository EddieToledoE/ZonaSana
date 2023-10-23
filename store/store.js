/* import { configureStore } from "@reduxjs/toolkit"
import { Slice } from "./slice"
export default configureStore({
    reducer:{
        valores:Slice.reducer
 
    }
}) */
import { configureStore } from '@reduxjs/toolkit';
import barReducer from './barSlice'; // Importa el slice de "bar"

const store = configureStore({
  reducer: {
    bar: barReducer, // Agrega el slice de "bar" al store
  },
});

export default store;