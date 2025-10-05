import { useState } from 'react';
import { Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import { useMarkers, useMarkerUpdate } from '../context/ContextHook.js';
/* import EditPopup from './EditPopup.jsx'; */

function AddMarker() {
  const markers = useMarkers();
  const setMarkers = useMarkerUpdate();
  const map = useMap();
  /* const [editingMarker, setEditingMarker] = useState(null) */

  // Click -> Add new marker
  useMapEvents({
    click(event) {
      console.log(event);
      const newMarker = {
        lat: event.latlng.lat,
        lng: event.latlng.lng,
        name: "somename",
        description: "somedescription",
        zoom: map.getZoom(),
        collection: "99b3c955-1f43-444f-9e8f-67d1d48ad47f"
      };
      handleMarkerClicked(newMarker);
      setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
    },
  });

  // Saving edit function
  /* function handleSave(updatedMarker) {
    setMarkers((prevMarkers) =>
      prevMarkers.map((marker) =>
        (marker.lat === updatedMarker.lat && marker.lng === updatedMarker.lng) ? updatedMarker : marker
      )
    )
    handleClose();
  } */

  // Closing edit function
  /* function handleClose() {
    setEditingMarker(null);
  } */

  function handleMarkerClicked(position) { // HOW TO MAKE THIS FUNCTION GENERATE A POPUP?
    map.flyTo([position.lat, position.lng], map.getZoom() + 1);
    console.log("Marker Clicked!");
  }

  // Return Marker component
  return (
    <>
      {markers.map((position, idx) => (
        <Marker
          key={idx}
          position={[position.lat, position.lng]}
          eventHandlers={{
            click: () => handleMarkerClicked(position)
          }}
        >
          <Popup>
            <h3>{position.name}</h3>
            <p>{position.description}</p>
          </Popup>
        </Marker>
      ))}
      {/* {
        editingMarker &&
        <EditPopup
          marker={editingMarker}
          onSave={handleSave}
          onClose={handleClose} />
      } */}
    </>
  );
}

export default AddMarker;