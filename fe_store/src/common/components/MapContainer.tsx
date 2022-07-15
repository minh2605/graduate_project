import React from "react";
import { MapContainer } from "react-leaflet";
import { MapContent } from "common/components/MapContent";

export const MapWrapper = (): JSX.Element => {
  return (
    <MapContainer center={[52.36777, 4.89412]} zoom={13} scrollWheelZoom={true}>
      <MapContent />
    </MapContainer>
  );
};
