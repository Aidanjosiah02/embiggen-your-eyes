import { useState, useEffect } from "react";
import './styles/SearchColumn.css';
import SearchEntry from './SearchEntry'
import { useSelectedCollection } from "../context/ContextHook";
import getQuery from "./getQuery";

export default function SearchColumn() {
    // Global collections state
    const selectedCollection = useSelectedCollection();

    // markerQuery state
    const [markerQuery, setMarkerQuery] = useState("")

    // local results state
    const [results, setResults] = useState([])

    // handle form submit
    const handleSearch = async (e) => {
        e.preventDefault();

        // Empty markerQuery
        if (!markerQuery.trim()) {
            setResults([]);
            return;
        }

        console.log("Collection searching for: ", markerQuery)

        // If error
        if (!selectedCollection || !selectedCollection.id) {
            console.error("No selected collection or collection ID missing");
            return;
        }

        const normQuery = markerQuery.toLowerCase();
        try {
            // Get markers from collections
            const newObject = await getQuery({ collectionId: selectedCollection.id, name: normQuery });
            const newMarkers = newObject.data
            console.log(newMarkers)

            // Ensure the response is an array
            if (newMarkers.length === 0) {
                console.error("No markers found:", newMarkers);
                return;
            }

            // Score the search relevancy
            const scored = newMarkers.map((marker) => {
                const name = marker.name.toLowerCase();
                let score = 0;

                if (name === normQuery)
                    score = 3;
                else if (name.startsWith(normQuery))
                    score = 2;
                else if (name.includes(normQuery))
                    score = 1;

                return { ...marker, score };
            }
            ).filter(marker => marker.score > 0).sort((a, b) => b.score - a.score);
            console.log("Scored search from collection: " + scored)

            setResults(scored);
        }
        catch (error) {
            console.error("Error fetching markers:", error);
        }
        setMarkerQuery(""); // Clear input
    }

    // Dummy function
    function testFunc(entry) {
        console.log("Recieved from entry " + entry)
    }

    // Convert all the markers into UI entries
    const entries = results.map(marker => {
        return <SearchEntry key={marker.id} marker={marker} onClick={testFunc} />
    })

    return (
        <div className="search-bar">
            {/* Search input */}
            <form className="search-controls" onSubmit={handleSearch}>
                <input
                    type="text"
                    value={markerQuery}
                    placeholder="Enter marker name..."
                    onChange={(e) => setMarkerQuery(e.target.value)}>
                </input>
                <button type="submit">Find</button>
            </form>
            <div className="search-results">
                {entries}
                {!markerQuery && <h2>Please enter in the search bar</h2>}
                {results.length === 0 && <h2>No results found</h2>}
            </div>
        </div>
    )
}