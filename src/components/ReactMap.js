/* eslint-disable react/prop-types */
import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

export default function MapContainer({ lat, lon }) {
  const mapStyles = {
    height: "80vh"
  };

  const defaultCenter = {
    lat: lat,
    lng: lon,
  };

  return (
    <div className="" style={{ top: "0px" }}>
      <LoadScript googleMapsApiKey={process.env.GATSBY_GOOGLE_MAP_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={12}
          center={defaultCenter}
        >
          <Marker position={defaultCenter} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
