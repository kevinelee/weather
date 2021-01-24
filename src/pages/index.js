/* eslint react/prop-types: 0 */

import React, { useState } from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import ReactMap from "../components/ReactMap";
import Background from "../components/Background";
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
  const [items, setItems] = useState({
    clouds: "",
    name: "",
    main: { humidity: "", temp: "", temp_max: "", temp_min: "" },
  });
  const [city, setCity] = useState("");
  // const [weather, setWeather] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(city);

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.GATSBY_WEATHER_API_KEY}`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.cod !== "404") {
            console.log("City: ", result);
            setItems(result);
          } else {
            setError(true);
          }
        },
        (error) => {
          console.error(error);
        }
      );
  };

  const { clouds, name, main, coord, weather } = items;
  const { humidity, temp, temp_max, temp_min } = main;

  //clouds, clear, mist, snow, rain, drizzle, thunderstorm

  return (
    <Layout>
      <SEO
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
        title="Home"
      />

      <section className="text-center py-16">
        <Background weather={Clear} />
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
              value={city}
              name="cityname"
              onChange={(e) => {
                setCity(e.target.value);
              }}
              onClick={() => setError(false)}
            />
            <ul>
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
          </form>
          <div className="">
            {coord ? <ReactMap lat={coord.lat} lon={coord.lon} /> : null}
          </div>
        </div>
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
