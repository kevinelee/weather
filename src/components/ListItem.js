/* eslint-disable react/prop-types */
import React from "react";

function ListItem({ name, variable, symbol, addClass }) {
  return (
    <li className={`p-1 ${addClass}`}>
      <span className="font-bold text-gray-600 ">{name}:</span> {variable}
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
      <span className="font-bold text-gray-600">{name}:</span>
      {` ${toCelsius(kelvin)} / ${toFahrenheit(kelvin)}`}
    </li>
  ) : (
    <li className="p-1">
      <span className="font-bold text-gray-600">{name}:</span>
    </li>
  );
}

export { ListItem, TemperatureListItem };
