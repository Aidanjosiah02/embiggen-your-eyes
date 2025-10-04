import { useState } from "react";
import './component_styles/SearchColumn.css';
import { useMarkerCollection, useMarkerCollectionUpdate } from "../context/Context.js";

export default function SearchColumn() {
    // Pulling the global marker collection & its setter
    const markerCollection = useMarkerCollection()              // Currently doing nothing
    const setMarkerCollection = useMarkerCollectionUpdate()

    // query state
    const [query, setQuery] = useState("")

    // handle form submit
    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for:', query);
        // Contact the back end here..................................
    }

    return (
        <div className="search-bar">
            {/* Search input */}
            <form className="search-controls" onSubmit={handleSearch}>
                <input
                    type="text"
                    value={query}
                    placeholder="Enter search..."
                    onChange={(e) => setQuery(e.target.value)}>
                </input>
                <button type="submit">Find</button>
            </form>
            <div className="search-results">{/* Nothing here yet */}</div>
        </div>
    )
}