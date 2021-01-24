import React from "react";
import CloudySkies from "../images/cloudy skies.jpg";

export default function Background({weather = CloudySkies}) {
  return (
    <>
      <img
        style={{ zIndex: -1, top: "60px", opacity : "50%" }}
        className="top-0 absolute w-screen object-cover bg-opacity-50"
        src={weather}
      />
    </>
  );
}
