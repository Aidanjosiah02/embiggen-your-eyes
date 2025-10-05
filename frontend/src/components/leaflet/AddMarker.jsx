import { Marker, useMapEvents, useMap } from 'react-leaflet';
import { useMarkers, useMarkerUpdate, useSelectedCollection } from '../../context/ContextHook.js';
import { useEffect } from 'react';
import "../../css/leaflet/AddMarker.css";

function AddMarker({ selectedMarker, setSelectedMarker, isEditing }) {
  const markers = useMarkers();
  const setMarkers = useMarkerUpdate();
  const map = useMap();
  const collection = useSelectedCollection();

  // Enable/disable map interactions
  useEffect(() => {
    if (isEditing) {
      map.dragging.disable();
      map.scrollWheelZoom.disable();
      map.doubleClickZoom.disable();
      map.boxZoom.disable();
      map.keyboard.disable();

      if (map.tap) map.tap.disable(); // mobile tap zoom

      map.touchZoom.disable();
    } else {
      map.dragging.enable();
      map.scrollWheelZoom.enable();
      map.doubleClickZoom.enable();
      map.boxZoom.enable();
      map.keyboard.enable();

      if (map.tap) map.tap.enable();

      map.touchZoom.enable();
    }
  }, [isEditing, map]);

  // 📍 Only allow placing markers when not editing
  useMapEvents({
    click(event) {
      if (isEditing || selectedMarker) return;

      const newMarker = {
        lat: event.latlng.lat,
        lng: event.latlng.lng,
        name: "somename",
        description: "somedescription",
        zoom: map.getZoom(),
        collection: collection.id
      };

      console.log(newMarker)

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