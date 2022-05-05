import React from "react";
import { MapContainer } from "react-leaflet";
import { MapContent } from "common/components/MapContent";
import "leaflet/dist/leaflet.css";

export const MapWrapper = (): JSX.Element => {
  return (
    <MapContainer
      center={[16.054407, 108.202164]}
      zoom={13}
      scrollWheelZoom={true}
    >
      <MapContent />
    </MapContainer>
  );
};
