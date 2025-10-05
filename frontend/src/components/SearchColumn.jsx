import { useState, useEffect } from "react";
import './styles/SearchColumn.css';
import SearchEntry from './SearchEntry'

export default function SearchColumn() {

    // markerQuery state
    const [markerQuery, setMarkerQuery] = useState("")

    // local results state
    const [results, setResults] = useState([])


    // handle form submit
    const handleSearch = (e) => {
        e.preventDefault();

        // Empty markerQuery
        if (!markerQuery.trim()) {
            setResults([]);
            return;
        }

        console.log("Searching for: ", markerQuery)


        // Score the search relevanct
        const normQuery = markerQuery.toLowerCase();
        const scored = results.map((marker) => {
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
        setResults(scored);

        console.log("Search results: " + results)
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
                {/* <input
                    type="text"
                    value={collectionQuery}
                    placeholder="Enter collection name..."
                    onChange={(e) => setCollectionQuery(e.target.value)}>
                </input> */}
                <button type="submit">Find</button>
            </form>
            <div className="search-results">
                {entries}
                {!markerQuery && <h2>Please enter in the search bar</h2>}
            </div>
        </div>
    )
}