/* eslint-disable react/prop-types */
import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

export default function MapContainer({lat, lon}) {
    const mapStyles = {
        height: "50vh",
    };

    const defaultCenter = {
        // lat: 34.0522,
        // lng: -118.2437,
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
                <Marker position={defaultCenter}/>
                </GoogleMap>
            </LoadScript>
        </div>
    );
}