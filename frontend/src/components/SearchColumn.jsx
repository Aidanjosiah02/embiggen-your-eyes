import { useState } from "react";
import './styles/SearchColumn.css';
import { useMarkers, useMarkerUpdate } from '../context/ContextHook'
import SearchEntry from './SearchEntry'

export default function SearchColumn() {
    // Pulling the global marker collection & its setter
    const markers = useMarkers()              // Currently doing nothing
    const setMarkers = useMarkerUpdate()

    // query state
    const [query, setQuery] = useState("")
    const [queryEmpty, setQueryEmpty] = useState(false)

    // handle form submit
    const handleSearch = (e) => {
        e.preventDefault();

        if (query === "") {
            setQueryEmpty(true);
            return;
        }

        setQueryEmpty(false);

        const testObject = {
            id: Date.now(),
            name: "Earth",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxn_lBa1HfLMPA8K6BPwsU8BSz2I7ozIF0xQ&s"
        };

        setMarkers(prev => [...prev, testObject]);
        setQuery(""); // Clear input
    }

    function testFunc() {
        console.log("Recieved from entry")
    }

    // Convert all the markers into UI entries
    const entries = markers.map(item => {
        return <SearchEntry key={item.id} entry={item} onClick={testFunc} /> // DOES NOTHING YET
    })

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
            <div className="search-results">
                {markers.length !== 0 && entries}
                {queryEmpty && <h2>Please enter in the search bar</h2>}
            </div>
        </div>
    )
}