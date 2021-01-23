/* eslint react/prop-types: 0 */

import React, { useState } from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import ReactMap from "../components/ReactMap"

function ListItem({ name, variable }) {
  return (
    <li><span className="font-bold text-blue-300 ">{name}:</span> {variable}</li>
  )
}

function IndexPage() {
  const [items, setItems] = useState({ clouds: "", name: "", main: { humidity: "", temp: "", temp_max: "", temp_min: "" } });
  const [city, setCity] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(city);
    console.log(city);

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.GATSBY_WEATHER_API_KEY}`)
      .then(res => res.json())
      .then(
        (result) => {

          if (result.cod !== "404") {
            console.log("results", result);
            setItems(result);
          } else {
            setError(true);
          }

        },
        (error) => {
          console.error(error)
        }
      )
  }

  const { clouds, name, main, coord } = items;
  
  const { humidity, temp, temp_max, temp_min } = main;

  return (
    <Layout>
      <SEO
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
        title="Home"
      />

      <section className="text-center">
        <form onSubmit={handleSubmit}>
          <input
            className={error ? "border-2 border-red-500 outline-none" : "outline-none"}
            type="text"
            placeholder="Search for City"
            value={city}
            name="cityname"
            onChange={e => {
              setCity(e.target.value)
            }}
            onClick={() => setError(false)}
          />
        </form>
        <ul>
          <p className="font-bold p-4">Scientifically speaking</p>


          <ListItem name="Name" variable={name} />
          <ListItem name="Temperature" variable={temp} />
          <ListItem name="Maximum" variable={temp_max} />
          <ListItem name="Minimum" variable={temp_min} />
          <ListItem name="Humidity" variable={humidity} />
          <ListItem name="Clouds" variable={clouds && clouds.all} />
        </ul>
        {coord ? <ReactMap lat={coord.lat} lon={coord.lon} /> : null}
      </section>
    </Layout>
  );
}

// latitude={} longitude={}


export default IndexPage;
