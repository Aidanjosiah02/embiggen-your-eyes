import { Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import { useMarkers, useMarkerUpdate } from '../context/ContextHook.js';

function AddMarker() {
  const markers = useMarkers();
  const setMarkers = useMarkerUpdate();
  const map = useMap();

  // State to track edited values (name, description)
  /* const [editingMarker, setEditingMarker] = useState(null);
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState(''); */


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
      setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
    },
  });


  /* function handleMarkerClicked(marker) {
    setEditingMarker(marker);
    setNewName(marker.name);
    setNewDescription(marker.description);
    map.flyTo([marker.lat, marker.lng], map.getZoom() + 1);
  } */

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
            {/* edit form go here */}
          </Popup>
        </Marker>
      ))}
    </>
  );
}

export default AddMarker;