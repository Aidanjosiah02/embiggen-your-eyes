import { useState } from "react";
import '../../css/app/SearchBox.css';
import SearchEntry from '../search/SearchEntry'
import { useSelectedCollection } from "../../context/ContextHook";
import getQuery from "../../js/getQuery.js";
import sendCollection from "../../js/sendCollection.js";
import CollectionEntry from '../search/CollectionEntry.jsx'
import getCollection from '../../js/getCollection.js'
import SelectedCollections from "../search/SelectedCollections.jsx";

export default function SearchBox() {
    // Global collections state
    const selectedCollection = useSelectedCollection();

    // local states
    const [collectionQuery, setCollectionQuery] = useState('');
    const [collections, setCollections] = useState([]);

    const [markerQuery, setMarkerQuery] = useState("")
    const [markers, setMarkers] = useState([])

    async function createCollection(e) {
        e.preventDefault();

        if (!collectionQuery.trim()) {
            setCollections([]);
        return;
        }
        const result = await sendCollection(collectionQuery.trim());
        if (!result) {
            return;
        }
        setCollections((prev) => [...prev, result]);
    }

    async function handleSearch(e, { search, collectionId, getFunction, setFunction }) {
        e.preventDefault();
        const query = !search.trim() ? "*" : search;
        console.log("Searching for: ", query);
        try {
            const result = await getFunction({ "collectionId": collectionId, "name": query });
            if (result.length === 0) {
                console.error("Nothing found:", result);
                return;
            }
            setFunction(result); // Update state to trigger re-render through entries
        } 
        catch (error) {
            console.error("Error fetching:", error);
        }
    }
    

    // Dummy function
    function testFunc(entry) {
        console.log("Recieved from entry " + entry)
    }

    // Convert all the markers into UI entries
    const markerEntries = markers.map(marker => {
        return <SearchEntry key={marker.id} marker={marker} onClick={testFunc} />
    })

    const collectionEntries = collections.map((collection, index) => {
        return <CollectionEntry key={index} collection={collection} onClick={testFunc} />
    })

    return (
        <div className="search-bar">
            <form className="search-controls" onSubmit={(e) => handleSearch(e, {search: markerQuery, collectionId: selectedCollection?.id, getFunction: getQuery, setFunction: setMarkers})}>
                <input
                    type="text"
                    value={markerQuery}
                    placeholder="Enter marker name..."
                    onChange={(e) => setMarkerQuery(e.target.value)}
                />
                <button type="submit">Find</button>
            </form>
            <form className="search-controls" onSubmit={(e) => handleSearch(e, {search: collectionQuery, collectionId: null, getFunction: getCollection, setFunction: setCollections})}>
                <input
                    type="text"
                    value={collectionQuery}
                    onChange={(e) => setCollectionQuery(e.target.value)}
                    placeholder="Enter collection name..."
                />
                <button type="submit" style={{ margin: "0.5rem" }}>Fetch Collection</button>
                <button onClick={createCollection}>Create Collection</button>
            </form>
            <div className="search-results">
                <div className="entries marker-entries">
                    {markerEntries}
                </div>
                <div className="entries collection-entries">
                    {collectionEntries}
                </div>
            </div>            
        </div>
    )
}