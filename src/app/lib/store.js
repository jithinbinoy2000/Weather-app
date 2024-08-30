import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./weatherSlice";
import userCitiesReducer from './citySlice'
// /app/lib/store.js
export const makeStore =()=>{
    return configureStore({
        reducer:{
weather:weatherReducer,
userCities:userCitiesReducer
        }
    })
}