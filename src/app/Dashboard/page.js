"use client";
import { useEffect, useState } from "react";
import "./style.css";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeatherByCity } from "../lib/weatherSlice";
import { addCity, removeCity } from "../lib/citySlice";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("Kochi");
  const [theme, setTheme] = useState("true");
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
  const dispatch = useDispatch();

  // Fetching weather
  const weatherData = useSelector((state) => state.weather.data);

  // second container (table)
  const defaultCities = useSelector((state) => state.userCities.cities);

  // Handle search input
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // adding city to favorites
  const handleAddToFav = (city) => {
    let isPresent = defaultCities.includes(city);
    isPresent ? dispatch(removeCity(city)) : dispatch(addCity(city));
  };
  //theme dark & light
  const handleTheme = () => {
    setTheme(!theme);
  };

  // Fetch default/search city
  useEffect(() => {
    dispatch(fetchWeatherByCity(searchQuery));
  }, [dispatch, searchQuery]);

  // Fetch Second container
  useEffect(() => {
    defaultCities.forEach((city) => {
      if (!weatherData[city]) {
        dispatch(fetchWeatherByCity(city));
      }
    });
  }, [dispatch, defaultCities, weatherData]);

  const cityData = weatherData[searchQuery]; // search city data
//time update
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, []);
  //style
  const getStyle = () => {
    if (!cityData) return "";

    const weatherCode = cityData.weather[0].id;

    if (weatherCode >= 200 && weatherCode < 300) return "weather-thunderstorm";
    if (weatherCode >= 300 && weatherCode < 400) return "weather-drizzle";
    if (weatherCode >= 500 && weatherCode < 600) return "weather-rain";
    if (weatherCode >= 600 && weatherCode < 700) return "weather-snow";
    if (weatherCode >= 700 && weatherCode < 800) return "weather-atmosphere";
    if (weatherCode === 800) return "weather-clear";
    if (weatherCode > 800) return "weather-clouds";

    return "";
  };
  //responsive image
  const getImage = () => {
    const weatherCode = cityData.weather[0].id;

    if (weatherCode >= 200 && weatherCode < 300) return "/images/drizzle.png";
    if (weatherCode >= 300 && weatherCode < 400) return "/images/drizzle.png";
    if (weatherCode >= 500 && weatherCode < 600) return "/images/rain.png";
    if (weatherCode >= 600 && weatherCode < 700) return "/images/snow.png";
    if (weatherCode >= 700 && weatherCode < 800) return "/images/clear.png";
    if (weatherCode === 800) return "/images/clear.png";
    if (weatherCode > 800) return "/images/clouds.png";

    return "";
  };
  return (
    <div className={` flex flex-col items-center border rounded-md ${theme? "dark-theme" : "light-theme"} `}>
      <div className="header h-[30px]">
        <button onClick={handleTheme} className={`${theme?"border border-white rounded-md px-2  ":'border border-black rounded-md px-2'}`}>{theme ? "light" : "dark"}</button>
      </div>
    {/* row container*/}
      <div className=" w-[100vw] flex  items-center justify-center row-container">
      {/* First Container */}
     
      <div className="page-container">
        <div className={`weather-container ${getStyle()}`}>
          <div>
            <input
              type="text"
              placeholder="Search"
              className="search"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>

          {cityData ? (
            <>
              <div className="flex w-[100%]  justify-around items-center">
                <Image
                  src={getImage()}
                  alt={cityData.weather[0].description}
                  width={100}
                  height={100}
                  className="icon1"
                />
                <div className="temp">{Math.round(cityData.main.temp)}°C</div>
              </div>
              <div className=" flex  justify-around text-lg font-semibold">
                <div>{cityData.weather[0].description}</div>
                <div className="flex justify-around flex-wrap">
                  <Image
                    src="/images/wind.png"
                    width={25}
                    height={100}
                    className="mx-2"
                    alt="icon"
                  ></Image>{" "}
                  {cityData.wind.speed} km/h
                </div>
              </div>

              <hr className="my-1" />
              <div className="flex p-3">
                <Image
                  src="/images/location.png"
                  width={25}
                  height={20}
                  alt="icon"
                  style={{ backgroundColor: "transparent", color: "white" }}
                />
                {cityData.name}, {cityData.sys.country}
              </div>
              <div className="mx-4">
                {new Date(cityData.dt * 1000).toLocaleString()}
              </div>
              <div className="w-[100] flex justify-end">
                <button
                  onClick={() => handleAddToFav(cityData.name)}
                  className="border  border-white rounded-md p-[0.1rem]"
                >
                  {defaultCities.includes(cityData.name)
                    ? "Remove"
                    : "Favorite"}
                </button>
              </div>
            </>
          ) : (
            <div className="w-[100%] h-[80%] flex justify-center items-center">
              <div className=" ">{"No Location Matches"}</div>
            </div>
          )}
        </div>
      </div>
      {/* addtional container */}
      <div className="page-container mx-2 additional-container">
        <div className={`weather-container2 ${getStyle()}`}>
          {cityData ? (
            <>
            <div className="flex justify-around items-center">
            <div className="flex p-3 flex-row">
                <Image
                  src="/images/location.png"
                  alt="icon"
                  width={25}
                  height={20}
                  alt="icon"
                  style={{ backgroundColor: "transparent", color: "white" }}
                  className="icons"
                />
                {cityData.name}, {cityData.sys.country}
              </div>
              <div className="mx-4">
              {currentTime.toLocaleString()}
              </div>  
            </div>
              
              <div className="flex w-[100%]  justify-around items-center">
                <div className="flex flex-col justify-center items-center">
                <div className="temp">{Math.round(cityData.main.temp)}°C</div>
                <span className="font-thin">feels {cityData.main.feels_like}°C</span>
                </div>
             
              <div className="flex justify-around flex-wrap">
                  <Image
                    src="/images/wind.png"
                    width={25}
                    alt="icon"
                    height={100}
                    alt="icon"
                    className="mx-2 icons"
                  ></Image>{" "}
                  {cityData.wind.speed} km/h
                </div>
                <Image
                  src={getImage()}
                  alt={cityData.weather[0].description}
                  width={100}
                  height={100}
                  className="icons"
                />
                
              </div>
            <div className="container flex flex-col  flex-wrap">
              <div>
              <div className="flex justify-evenly my-2">
              <span>temp_min {cityData.main.temp_min}°C</span>
              <span>tem_max {cityData.main.temp_max}°C</span>
              </div>
              
              <div className="flex justify-evenly p-2">
              <span className="flex font-light"> <Image src='/images/thermometer.png' width={25} height={100} className="icons"
              alt="icon"></Image> {cityData.main.pressure}Pa</span>
              <span className="flex font-light"> <Image src='/images/isobars.png' width={25} height={100}  className="icons"alt="icon"></Image> {cityData.main.grnd_level}ms</span>
              <span className="flex font-light"> <Image src='/images/eye.png' width={25} height={100}  className="icons"alt="icon"></Image>{cityData.visibility}ms</span>
              </div>
              <div className="flex items-center mx-[50px] p-2 ">
              <span className="flex font-light"> <Image src='/images/sunrise.png' width={25} height={100}  className="icons"alt="icon"></Image>{new Date(cityData.sys.sunrise*1000).toLocaleString().split(",")[1]}</span>
              <span className="flex font-light"> <Image src='/images/sunset.png' width={25} height={100}  className="icons"alt="icon"></Image> {new Date(cityData.sys.sunset*1000).toLocaleString().split(",")[1]}</span>
              </div>
              </div>
            </div>

            </>
          ) : (
            <div className="w-[100%] h-[80%] flex justify-center items-center">
              <div className=" ">{"No Location Matches"}</div>
            </div>
          )}
        </div>
      </div>
      </div>

      {/* Second Container */}
      <div className="dafault-container my-2">
        <table className="weather-table">
          <thead>
            <tr>
              <th>City</th>
              <th>Temperature</th>
              <th>Feels Like</th>
              <th>Weather</th>
              <th>Wind Speed</th>
              <th>Wind Direction</th>
            </tr>
          </thead>
          <tbody>
  {defaultCities.map((city) => {
    const cityData = weatherData[city];
    return cityData ? (
      <tr key={city}>
        <td data-label="City">
          {cityData.name}, {cityData.sys.country}
        </td>
        <td data-label="Temperature">{Math.round(cityData.main.temp)}°C</td>
        <td data-label="Feels Like">{Math.round(cityData.main.feels_like)}°C</td>
        <td data-label="Weather">{cityData.weather[0].description}</td>
        <td data-label="Wind Speed">{cityData.wind.speed} m/s</td>
        <td data-label="Wind Direction">{cityData.wind.deg}°</td>
      </tr>
    ) : null;
  })}
</tbody>
        </table>
      </div>
    </div>
  );
}
