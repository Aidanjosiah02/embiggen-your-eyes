import { useState } from "react";
import './styles/SearchColumn.css';
import {useMarkers, useMarkerUpdate} from '../context/ContextHook'
import SearchEntry from './SearchEntry'

export default function SearchColumn() {
    // Pulling the global marker collection & its setter
    const markers = useMarkers()              // Currently doing nothing
    const setMarkers = useMarkerUpdate()

    // Convert all the markers into UI entries
    const entries = (markers || []).map(each => {
        return <SearchEntry entry="" onClick={testFunc}/> // DOES NOTHING YET
    })

    // query state
    const [query, setQuery] = useState("")

    // handle form submit
    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for:', query);
        // Contact the back end here..................................
    }

    // Testing a search entry
    const testObject = {
        name: "Earth",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxn_lBa1HfLMPA8K6BPwsU8BSz2I7ozIF0xQ&s"
    }
    function testFunc() {
        console.log("Recieved from entry")
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
            <div className="search-results">
                {markers.length !== 0 && entries}
                
                {/* Testing searchEntry */}
                <SearchEntry entry={testObject} onClick={testFunc} />
            </div>
        </div>
    )
}