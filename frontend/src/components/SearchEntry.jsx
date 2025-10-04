import "./styles/SearchEntry.css"
import { useMarkers, useMarkerUpdate } from '../context/ContextHook'

export default function SearchEntry({marker}) {

    const setGlobalMarkers = useMarkerUpdate()

    // function toggleMarker() {
    //     setGlobalMarkers(prevMarkers => {
    //         const exists = prevMarkers.some( =>
    //             m.lat === marker.lat &&
    //             m.lng === marker.lng &&
    //             m.name === marker.name // optional: adjust based on uniqueness
    //         );

    //     if (exists) {
    //         // Remove marker
    //         return prevMarkers.filter(m =>
    //             !(m.lat === marker.lat &&
    //                 m.lng === marker.lng &&
    //                 m.name === marker.name)
    //         );
    //     } else {
    //         // Add marker
    //         return [...prevMarkers, marker];
    //     }
    // });
    // }

    return (
        <div className="search-entry" onClick={() => setGlobalMarkers((prevMarkers) => [...prevMarkers, marker])}>
            <img className="search-image" src={marker.image} alt="Search Image" />
            <h3>{marker.name}</h3>           {/* Title */}
        </div>
    );
}