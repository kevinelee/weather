import React from "react";
import CloudySkies from "../images/cloudy skies.jpg";
// import CloudySkies2 from "./cloudy";

export default function Background() {
  return (
    <div>
      <img
        style={{ zIndex: -1, top: "60px" }}
        className="top-0 absolute w-screen object-cover"
        src={CloudySkies}
      />
    </div>
  );
}
