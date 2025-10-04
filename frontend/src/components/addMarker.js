import { Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import { useState } from 'react';
import getMarkers from './getMarkers.js'
import { useMarkers, useMarkerUpdate } from '../context/ContextHook.js';


function AddMarker({ currentZoom }) {

  const map = useMap();

  useMapEvents({
    click(e) {
      setPositions([...positions, e.latlng]);
    },
  });

  return positions.map((position, idx) => (
    <Marker
      position={position}
      eventHandlers={{ click: () => map.flyTo(position, currentZoom + 1) }}
      key={idx}
    >
      <Popup>You are here</Popup>
    </Marker>
  ));
}

export default AddMarker;