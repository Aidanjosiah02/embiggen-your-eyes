import { useState, useEffect } from "react";
import './styles/SearchColumn.css';
import SearchEntry from './SearchEntry'

export default function SearchColumn() {

    // query state
    const [query, setQuery] = useState("")
    const [queryEmpty, setQueryEmpty] = useState(false)

    // local results state
    const [results, setResults] = useState([{lat: 39, lng: 40, name: "somename", description: "somedescription", zoom: 10, collection: "somecollection", map: "somemap"}])


    // handle form submit
    const handleSearch = (e) => {
        e.preventDefault();

        // Empty query
        if (query.trim() === "") {
            setQueryEmpty(true);
            setResults([]);
            return;
        }

        setQueryEmpty(false);
        console.log("Searching for: ", query)


        // Score the search relevanct
        const normQuery = query.toLowerCase();
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
        setQuery(""); // Clear input
    }

    // Dummy function
    function testFunc(entry) {
        console.log("Recieved from entry " + entry)
    }

    // Logs only when results change
    useEffect(() => {
        console.log("Results updated:", results);
    }, [results]);

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
                    value={query}
                    placeholder="Enter search..."
                    onChange={(e) => setQuery(e.target.value)}>
                </input>
                <button type="submit">Find</button>
            </form>
            <div className="search-results">
                {entries}
                {queryEmpty && <h2>Please enter in the search bar</h2>}
            </div>
        </div>
    )
}