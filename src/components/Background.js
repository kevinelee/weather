import React from "react";
import CloudySkies from "../images/cloudy skies.jpg";
// import CloudySkies2 from "./cloudy";

export default function Background(){
  return(
    <div style={{"zIndex": -1}} className="top-0 absolute">
      <img src={CloudySkies}/>
    </div>
  )
}
