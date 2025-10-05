import { useState } from "react";
import '../../css/app/SearchMarkers.css';
import SearchEntry from '../search/SearchEntry'
import { useSelectedCollection } from "../../context/ContextHook";
import getQuery from "../../js/getQuery.js";

export default function SearchMarker() {
    // Global collections state
    const selectedCollection = useSelectedCollection();

    // local states
    const [markerQuery, setMarkerQuery] = useState("")
    const [results, setResults] = useState([])
    const [searched, setSearched] = useState(false)

    // handle form submit
    const handleSearch = async (e) => {
        e.preventDefault();

        // Empty markerQuery
        if (!markerQuery.trim()) {
            setResults([]);
            setSearched(true);
            return;
        }

        console.log("Collection searching for: ", markerQuery)

        const normQuery = markerQuery;
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
                const name = marker.name;
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
            setSearched(true)
        }
        catch (error) {
            console.error("Error fetching markers:", error);
        }
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
                {searched && !markerQuery && <h2 className="please-enter">Please enter in the search bar</h2>}
                {searched && markerQuery && results.length === 0 && <h2 className="no-result">No results found</h2>}
            </div>
        </div>
    )
}




// import { useState } from "react";
// import '../../css/app/SearchMarkers.css';
// import SearchEntry from '../search/SearchEntry'
// import { useSelectedCollection } from "../../context/ContextHook";
// import getQuery from "../../js/getQuery.js";

// export default function SearchMarker() {
//     // Global collections state
//     const selectedCollection = useSelectedCollection();

//     // local states
//     const [markerQuery, setMarkerQuery] = useState("")
//     const [results, setResults] = useState([])
//     const [searched, setSearched] = useState(false)

//     // handle form submit
//     const handleSearch = async (e) => {
//         e.preventDefault();

//         // Empty markerQuery
//         if (!markerQuery.trim()) {
//             setResults([]);
//             setSearched(true);
//             return;
//         }

//         console.log("Collection searching for: ", markerQuery)

//         const normQuery = markerQuery;
//         try {
//             // Get markers from collections
//             const newObject = await getQuery({ collectionId: selectedCollection.id, name: normQuery });
//             const newMarkers = newObject.data
//             console.log(newMarkers)

//             // Ensure the response is an array
//             if (newMarkers.length === 0) {
//                 console.error("No markers found:", newMarkers);
//                 return;
//             }

//             // Score the search relevancy
//             const scored = newMarkers.map((marker) => {
//                 const name = marker.name;
//                 let score = 0;

//                 if (name === normQuery)
//                     score = 3;
//                 else if (name.startsWith(normQuery))
//                     score = 2;
//                 else if (name.includes(normQuery))
//                     score = 1;

//                 return { ...marker, score };
//             }
//             ).filter(marker => marker.score > 0).sort((a, b) => b.score - a.score);
//             console.log("Scored search from collection: " + scored)

//             setResults(scored);
//             setSearched(true)
//         }
//         catch (error) {
//             console.error("Error fetching markers:", error);
//         }
//     }

//     // Dummy function
//     function testFunc(entry) {
//         console.log("Recieved from entry " + entry)
//     }

//     // Convert all the markers into UI entries
//     const entries = results.map(marker => {
//         return <SearchEntry key={marker.id} marker={marker} onClick={testFunc} />
//     })

//     return (
//     <>
//       {/* ★ CHANGE: single compact row (no big sidebar card wrapper) */}
//       <form className="sidebar-row" onSubmit={handleSearch}>
//         <input
//           type="text"
//           value={markerQuery}
//           placeholder="Search Bar"
//           onChange={(e) => setMarkerQuery(e.target.value)}
//         />
//         <button type="submit">Find</button>
//       </form>

//       {/* ★ NEW: render results off-screen, then move them into the middle panel */}
//       <div style={{ display: 'none' }}>
//         <div id="__markers-results">
//           {entries}
//           {searched && !markerQuery && <h4 className="muted">Please enter in the search bar</h4>}
//           {searched && markerQuery && results.length === 0 && <h4 className="muted">No results found</h4>}
//         </div>
//       </div>
//     </>
//   );
// }

// /* ★ NEW: move rendered DOM into the middle panel mount point */
// if (typeof window !== 'undefined') {
//   queueMicrotask(() => {
//     const src = document.getElementById('__markers-results');
//     const dst = document.getElementById('markers-results-mount');
//     if (src && dst) {
//       while (dst.firstChild) dst.removeChild(dst.firstChild);
//       while (src.firstChild) dst.appendChild(src.firstChild);
//     }
//   });
// }