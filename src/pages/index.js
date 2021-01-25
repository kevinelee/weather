/* eslint react/prop-types: 0 */

import React, { useState, useEffect } from "react";
import {useQuery} from 'react-query'
import Layout from "../components/layout";
import SEO from "../components/seo";
import ReactMap from "../components/ReactMap";
import Background from "../components/Background";
import fetchData from '../utils/fetchData'
// import Cloudy from "../images/cloudy skies.jpg";
// import Snow from "../images/snow sky.jpg";
import Clear from "../images/clear skies.jpg";

function ListItem({ name, variable, symbol, addClass }) {
  return (
    <li className={`p-1 ${addClass}`}>
      <span className="font-bold text-blue-300 ">{name}:</span> {variable}
      {symbol}
    </li>
  );
}

function TemperatureListItem({ name, kelvin }) {
  function toCelsius(kelvin) {
    return `${(kelvin - 273.15).toFixed(2)}°C`;
  }

  function toFahrenheit(kelvin) {
    return `${((kelvin - 273.15) * 1.8 + 32).toFixed(2)}°F`;
  }

  return kelvin ? (
    <li className="p-1">
      <span className="font-bold text-blue-300">{name}:</span>
      {` ${toCelsius(kelvin)} / ${toFahrenheit(kelvin)}`}
    </li>
  ) : (
    <li className="p-1">
      <span className="font-bold text-blue-300">{name}:</span>
    </li>
  );
}

function IndexPage() {
  const [initialCity, setInitialCity] = useState(true);
  const [city, setCity] = useState(null);
  const [items, setItems] = useState({
    clouds: "",
    name: "",
    main: { humidity: "", temp: "", temp_max: "", temp_min: "" },
  });


  const {isLoading: isLoadingLocation, data: location} = useQuery({
    queryKey: ["geolocation"],
    queryFn: () => fetchData({endpoint: 'https://extreme-ip-lookup.com/json/'}),
  })

  const {isLoading: isLoadingWeather, data: weatherData, error, refetch} = useQuery({
    queryKey: [`weather-${city}`],
    queryFn: () => fetchData({endpoint: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.GATSBY_WEATHER_API_KEY}`}),
    enabled: !!(initialCity && city),
    refetchOnWindowFocus: false
  })

  useEffect(() => {
    if (location?.city) {
      setCity(encodeURI(location.city))
    }
  }, [location])

  useEffect(() => {
    if (weatherData) {
      setItems(weatherData)
    }
  }, [weatherData])

  const handleSubmit = (e) => {
    e.preventDefault();
    refetch()
  };

  const handleChange = (e) => {
    setInitialCity(false)
    setCity(e.target.value);
  }

  const { clouds, name, main, coord, weather } = items || {};
  const { humidity, temp, temp_max, temp_min } = main || {};

  const composedCity = decodeURI(city);
  //clouds, clear, mist, snow, rain, drizzle, thunderstorm

  return (
    <Layout>
      <SEO
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
        title="WeatherYou"
      />

      <section className="text-center py-16">
        <Background weather={Clear} />
        {
          isLoadingLocation 
            ? <div>...Loading Current Location</div>
            : (
              <div className="">
                  <form onSubmit={handleSubmit}>
                    <input
                      className={
                        error
                          ? "border-2 border-red-500 outline-none"
                          : "outline-none m-1"
                      }
                      type="text"
                      placeholder="Search for City"
                      value={composedCity}
                      name="cityname"
                      onChange={handleChange}
                      // onClick={() => setError(false)}
                    />
                  </form>
                  {
                      isLoadingWeather 
                        ? <div>...Loading</div>
                        : (
                          <ul style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: '2rem'}}>
                            <img style={{background: 'lightblue'}} src={`http://openweathermap.org/img/wn/${weather && weather[0].icon}@2x.png`} title={weather && weather[0].description} />
                            <ListItem name="Name" variable={name} />
                            <TemperatureListItem name="Temperature" kelvin={temp} />
                            <TemperatureListItem name="Temp Max" kelvin={temp_max} />
                            <TemperatureListItem name="Temp Min" kelvin={temp_min} />
                            <ListItem name="Humidity" variable={humidity} />
                            <ListItem
                              name="Clouds"
                              variable={clouds && clouds.all}
                              symbol={""}
                            />
                            <ListItem
                              name="Weather"
                              variable={weather && weather[0].description}
                              addClass={"capitalize"}
                            />
                          </ul>
                        )
                    }
                  <div className="">
                    {coord ? <ReactMap lat={coord.lat} lon={coord.lon} /> : null}
                  </div>
                </div>
            )
        }
      </section>
    </Layout>
  );
}

export default IndexPage;

// {
//   switch (weather[0].main) {
//     case "clouds":
//       return Cloudy;
//       break;
//   }
// }
