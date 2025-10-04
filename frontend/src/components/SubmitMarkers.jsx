import { useMarkers, useMarkerUpdate } from '../context/ContextHook.js';
import sendMarkers from './sendMarkers.js';

export default function SubmitMarkers() {
    const markers = useMarkers()
    return (
        <div className="submit-markers">
            <button onClick={() => sendMarkers(markers)}>Submit Markers</button>
        </div>
    )
}