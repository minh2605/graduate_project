import React, { useEffect } from "react";
import { TileLayer, Marker, Popup, useMap } from "react-leaflet";

export const MapContent = (): JSX.Element => {
  const map = useMap();
  useEffect(() => {
    map.invalidateSize();
  }, [map]);

  return (
    <>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[16.054407, 108.202164]} key={2}>
        <Popup>Foogle Store</Popup>
      </Marker>
    </>
  );
};
