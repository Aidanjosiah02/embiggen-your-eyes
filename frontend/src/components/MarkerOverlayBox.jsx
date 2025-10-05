import { useMarkerUpdate } from '../context/ContextHook';
import { useEffect, useState } from 'react';
import './styles/MarkerOverlayBox.css';

function MarkerOverlayBox({ selectedMarker, setSelectedMarker }) {
  const setMarkers = useMarkerUpdate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (selectedMarker) {
      setName(selectedMarker.name);
      setDescription(selectedMarker.description);
    }
  }, [selectedMarker]);

  if (!selectedMarker) return null;

  function handleSave() {
    const updated = { ...selectedMarker, name, description };
    setMarkers((prev) => prev.map(
        (marker) => marker.lat === selectedMarker.lat && marker.lng === selectedMarker.lng ? updated : marker
    ));
    setSelectedMarker(null);
  }

  return (
    <div className="marker-overlay-box" onClick={(e) => e.stopPropagation()}>
      <h3>Edit Marker</h3>
      <label>Name:</label>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <label>Description:</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      <div className="buttons">
        <button
            onClick={(e) => {
                e.stopPropagation();
                handleSave();
            }}
            >
            Save
        </button>
        <button
            onClick={(e) => {
                e.stopPropagation();
                setSelectedMarker(null);
            }}
            >
            Cancel
        </button>
      </div>
    </div>
  );
}

export default MarkerOverlayBox;