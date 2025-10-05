import { Marker, useMapEvents, useMap } from 'react-leaflet';
import { useMarkers, useMarkerUpdate, useSelectedCollection } from '../context/ContextHook.js';
import "./styles/AddMarker.css"

function AddMarker({ selectedMarker, setSelectedMarker }) {
  const markers = useMarkers();
  const setMarkers = useMarkerUpdate();
  const map = useMap();
  const collection = useSelectedCollection();

  useMapEvents({
    click(event) {
      // 💡 Don't add marker if editing
      if (selectedMarker) return;

      const newMarker = {
        lat: event.latlng.lat,
        lng: event.latlng.lng,
        name: "somename",
        description: "somedescription",
        zoom: map.getZoom(),
        collection: collection.id
      };

      setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
    },
  });

  function handleMarkerClicked(marker) {
    setSelectedMarker(marker);
    map.flyTo([marker.lat, marker.lng], map.getZoom());
  }

  return (
    <>
      {markers.map((marker, idx) => (
        <Marker
          key={idx}
          position={[marker.lat, marker.lng]}
          eventHandlers={{
            click: () => handleMarkerClicked(marker),
          }}
        />
      ))}
    </>
  );
}

export default AddMarker;