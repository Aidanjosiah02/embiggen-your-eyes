import { Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import { useMarkers, useMarkerUpdate } from '../context/ContextHook.js';

function AddMarker() {
  const markers = useMarkers();
  const setMarkers = useMarkerUpdate();
  const map = useMap();

  useMapEvents({
    click(event) {
      console.log(event)
      const newMarker = {lat: event.latlng.lat, lng: event.latlng.lng, name: "somename", description: "somedescription", zoom: map.getZoom(), collection: "99b3c955-1f43-444f-9e8f-67d1d48ad47f"};
      setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
    },
  });

  // const

  return markers.map((position, idx) => (
    <Marker
      position={[position.lat, position.lng]}
      eventHandlers={{ click: () => map.flyTo([position.lat, position.lng], map.getZoom() + 1) }}
      key={idx}
    >
      <Popup>You are here</Popup>
    </Marker>
  ));
}

export default AddMarker;