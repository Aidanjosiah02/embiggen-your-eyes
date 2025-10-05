import { useMarkerUpdate } from '../../context/ContextHook';
import { useEffect, useState } from 'react';
import '../../css/leaflet/MarkerOverlayBox.css';

function MarkerOverlayBox({ selectedMarker, setSelectedMarker, isEditing, setIsEditing }) {
  const setMarkers = useMarkerUpdate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (selectedMarker) {
      setName(selectedMarker.name);
      setDescription(selectedMarker.description);
      setIsEditing(true);
    }
  }, [selectedMarker, setIsEditing]);

  if (!selectedMarker) return null;

  function handleSave() {
    const updated = { ...selectedMarker, name, description };
    setMarkers((prev) =>
      prev.map((marker) =>
        marker.id === selectedMarker.id ? updated : marker
      )
    );
    setSelectedMarker(null);
    setIsEditing(false);
  }

  function handleCancel() {
    setSelectedMarker(null);
    setIsEditing(false);
  }

  function handleDelete() {
    setMarkers((prev) =>
      prev.filter(
        (marker) =>
          marker.id !== selectedMarker.id
      )
    );
    setSelectedMarker(null);
    setIsEditing(false);
  //   try {
  //     // Also delete from backend if it has an ID
  //     if (selectedMarker.id) {
  //       fetch(`/api/markers/deleteMarkers`, {
  //         method: 'POST',
  //         body
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Failed to delete marker from backend:", error);
  //   }
  }

  return (
    <div className="marker-overlay-box" onClick={(e) => e.stopPropagation()}>
      <h3>Edit Marker</h3>
      <label>Name:</label>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <label>Description:</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      <div className="buttons">
        <button onClick={handleSave}>Save</button>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    </div>
  );
}

export default MarkerOverlayBox;
