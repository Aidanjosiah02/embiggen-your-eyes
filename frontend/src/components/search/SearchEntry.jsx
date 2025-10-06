import "../../css/search/SearchEntry.css"
import { useMarkerUpdate } from '../../context/ContextHook'

export default function SearchEntry({ marker }) {

    const setGlobalMarkers = useMarkerUpdate()

    return (
        <div className="search-entry" onClick={() => setGlobalMarkers((prevMarkers) => [...prevMarkers, marker])}>
            <h3>{marker.name}</h3>
        </div>
    );
}