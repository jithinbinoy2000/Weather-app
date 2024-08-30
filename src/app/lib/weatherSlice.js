import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

export const fetchWeatherByCity = createAsyncThunk(
  'weather/fetchWeatherByCity', 
  async (cityName) => {           
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("Failed To Fetch Data");
    }

    const data = await response.json();
    console.log(data);
    
    return { cityName, data };
  }
);
const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    data: {},
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {  
    builder
      .addCase(fetchWeatherByCity.fulfilled, (state, action) => {
        state.data[action.payload.cityName] = action.payload.data;
      })
      .addCase(fetchWeatherByCity.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default weatherSlice.reducer;
