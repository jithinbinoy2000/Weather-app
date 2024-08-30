import { createSlice } from "@reduxjs/toolkit";

const userCitiesSlice = createSlice({
  name: 'userCities',
  initialState: {
    cities: ["New York", "London", "Tokyo"],
  },
  reducers: {
    addCity: (state, action) => {
      if (!state.cities.includes(action.payload)) {
        state.cities.push(action.payload);
      }
    },
    removeCity: (state, action) => {
      state.cities = state.cities.filter((city) => city !== action.payload);
    },
  },
});

export const { addCity, removeCity } = userCitiesSlice.actions;
export default userCitiesSlice.reducer;
