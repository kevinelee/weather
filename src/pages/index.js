/* eslint react/prop-types: 0 */

import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import Layout from "../components/layout";
import SEO from "../components/seo";
import ReactMap from "../components/ReactMap";
import fetchData from "../utils/fetchData";
import { ListItem, TemperatureListItem } from "../components/ListItem";
import loader from "../images/loader.png";

function IndexPage() {
  const [initialCity, setInitialCity] = useState(true);
  const [city, setCity] = useState(null);
  const [items, setItems] = useState({
    clouds: "",
    name: "",
    main: { humidity: "", temp: "", temp_max: "", temp_min: "" },
  });

  const { isLoading: isLoadingLocation, data: location } = useQuery({
    queryKey: ["geolocation"],
    queryFn: () =>
      fetchData({ endpoint: "https://extreme-ip-lookup.com/json/" }),
  });

  const {
    isLoading: isLoadingWeather,
    data: weatherData,
    error,
    refetch,
  } = useQuery({
    queryKey: [`weather-${city}`],
    queryFn: () =>
      fetchData({
        endpoint: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.GATSBY_WEATHER_API_KEY}`,
      }),
    enabled: !!(initialCity && city),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (location?.city) {
      setCity(encodeURI(location.city));
    }
  }, [location]);

  useEffect(() => {
    if (weatherData) {
      setItems(weatherData);
    }
  }, [weatherData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    refetch();
  };

  const handleChange = (e) => {
    setInitialCity(false);
    setCity(e.target.value);
  };

  const { clouds, name, main, coord, weather } = items || {};
  const { humidity, temp } = main || {};

  const composedCity = decodeURI(city);
  //clouds, clear, mist, snow, rain, drizzle, thunderstorm

  return (
    <Layout>
      <SEO
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
        title="WeatherYou"
      />

      <section className="text-center mx-auto max-w-7xl flex justify-center">
        {isLoadingLocation ? (
          <div className="flex justify-center items-center h-screen"><img className="spinner h-12 w-12" src={loader} /></div>
        ) : (
            <div className="flex flex-col lg:flex-row p-4 lg:py-12">
              <form className="flex flex-col justify-center items-center" onSubmit={handleSubmit}>
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
                />
                <button className="inline-flex items-center px-4 py-1.5 border border-black text-xs font-medium rounded-full shadow-sm text-black bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black mt-2" type="submit">Search</button>
                {isLoadingWeather ? (
                  <div className="flex justify-center items-center h-screen"><img className="spinner h-12 w-12" src={loader} /></div>
                ) : (
                    <ul className="flex justify-center items-center flex-col p-8 pt-2"
                    >
                      <img
                        style={{ background: "lightblue" }}
                        src={`http://openweathermap.org/img/wn/${weather && weather[0].icon
                          }@2x.png`}
                        title={weather && weather[0].description}
                      />
                      <ListItem name="Name" variable={name} />
                      <TemperatureListItem name="Temperature" kelvin={temp} />
                      {/* <TemperatureListItem name="Temp Max" kelvin={temp_max} />
                  <TemperatureListItem name="Temp Min" kelvin={temp_min} /> */}
                      <ListItem name="Humidity" variable={humidity} symbol={"%"} />
                      <ListItem
                        name="Clouds"
                        variable={clouds && clouds.all}
                        symbol={"%"}
                      />
                      <ListItem
                        name="Weather"
                        variable={weather && weather[0].description}
                        addClass={"capitalize"}
                      />
                    </ul>
                  )}
              </form>
              <div className="react-map " >
                {coord ? <ReactMap lat={coord.lat} lon={coord.lon} /> : null}
              </div>
            </div>
          )}
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
