import { Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import { useMarkers, useMarkerUpdate } from '../context/ContextHook.js';
import { useState } from 'react';
import "./styles/AddMarker.css"

function AddMarker() {
  const markers = useMarkers();
  const setMarkers = useMarkerUpdate();
  const map = useMap();

  // State to track edit name & description
  const [editingMarker, setEditingMarker] = useState(null);
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');


  // Click -> Add new marker
  useMapEvents({
    click(event) {
      // If editing a marker, don't add new one
      if (editingMarker) 
        return;

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

  // Click marker -> Edit marker
  function handleMarkerClicked(marker) {
    setEditingMarker(marker);
    setNewName(marker.name);
    setNewDescription(marker.description);
    map.flyTo([marker.lat, marker.lng], map.getZoom());
  }

  // Save the edited marker
  function handleSave() {
    const updatedMarker = { ...editingMarker, name: newName, description: newDescription };
    setMarkers(
      (prevMarkers) =>
        prevMarkers.map((marker) =>
          marker.lat === editingMarker.lat && marker.lng === editingMarker.lng ? updatedMarker : marker
        )
    );
    handleClose();
  }

  // Close edit
  function handleClose() { // Without save if directly
    setEditingMarker(null);
  }

  // Return Marker component
  return (
    <>
      {markers.map((position, idx) => {
        console.log(markers)
        return(
        <Marker
          key={idx}
          position={[position.lat, position.lng]}
          eventHandlers={{
            click: () => handleMarkerClicked(position)
          }}
        >
          <Popup>
            {editingMarker === position ?
              // If marker editing -> show the form
              <div className='edit-popup'>
                <h3>Edit Marker</h3>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label htmlFor="name">Name: </label>
                    <input
                      id="name"
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="description">Description: </label>
                    <textarea
                      id="description"
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                    />
                  </div>
                  <button id="save-btn" type="button" onClick={handleSave}>Save</button>
                  <button id="cancel-btn" type="button" onClick={handleClose}>Cancel</button>
                </form>
              </div>
              :
              // OR Default popup
              <div>
                <h3>{position.name}</h3>
                <p>{position.description}</p>
              </div>
            }
          </Popup>
        </Marker>
      )})}
    </>
  );
}

export default AddMarker;