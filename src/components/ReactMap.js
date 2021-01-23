/* eslint-disable react/prop-types */
import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

export default function MapContainer({latitude = 34.0522, longitude =-118.2437}) {
    const mapStyles = {
        height: "50vh",
    };

    const defaultCenter = {
        lat: {latitude},
        lng: {longitude},
    };

    return (
        <div className="" style={{ top: "0px" }}>
            <LoadScript googleMapsApiKey={process.env.GATSBY_GOOGLE_MAP_API_KEY}>
                <GoogleMap
                    mapContainerStyle={mapStyles}
                    zoom={13}
                    center={defaultCenter}
                >

                </GoogleMap>
            </LoadScript>
        </div>
    );
}