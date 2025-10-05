import { useMarkers, useMarkerUpdate } from '../../context/ContextHook.js';
import sendMarkers from '../../js/SendMarkers.js';

export default function SubmitMarkers() {
  const markers = useMarkers();
  return (
    <div className="submit-marker">{/* ★ NEW */}
      <button onClick={() => sendMarkers(markers)}>Submit Marker</button>
    </div>
  );
}