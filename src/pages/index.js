/* eslint react/prop-types: 0 */

import React, { useState } from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";

function ListItem({ name, variable }) {
  return (
    <li><span className="font-bold text-blue-300 ">{name}:</span> {variable}</li>
  )
}

<<<<<<< HEAD
console.log(process.env.GATSBY_WEATHER_API_KEY)
=======

>>>>>>> aed1f3b13816f5db90b601e183a98e77991b63d7

function IndexPage() {
  const [items, setItems] = useState({ clouds: "", name: "", main: { humidity: "", temp: "", temp_max: "", temp_min: "" } });
  const [city, setCity] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(city);
    console.log(city);

<<<<<<< HEAD
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.GATSBY_WEATHER_API_KEY}`)
=======
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=043a310b4251d24aae44b03d572cdbb1`)
>>>>>>> aed1f3b13816f5db90b601e183a98e77991b63d7
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

  const { clouds, name, main } = items;
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
      </section>
    </Layout>
  );
}



export default IndexPage;
