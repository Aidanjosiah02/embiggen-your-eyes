import { useState } from "react";
import '../../css/app/SearchMarkers.css';
import SearchEntry from '../search/SearchEntry';
import sendCollection from "../../js/sendCollection.js";
import CollectionEntry from '../search/CollectionEntry.jsx'
import getCollection from '../../js/getCollection.js'
import SelectedCollections from "../search/SelectedCollections.jsx";

export default function SearchCollections() {
  // Global state
  const [collectionName, setCollectionName] = useState('');
  const [collections, setCollections] = useState([]);

  // handle create collection
  async function createCollection(e) {
    e.preventDefault();

    if (!collectionName.trim()) {
      setCollections([]);
      return;
    }
    const result = await sendCollection(collectionName.trim());
    if (!result) {
      return;
    }
    setCollections((prev) => [...prev, result]);
  }

  // handle form submit
  async function handleSearch(e) {
    e.preventDefault();

    let normQuery = "*";
    if (!collectionName.trim()) {
      normQuery = "*";
      console.log("Searching for: ", normQuery);
    }
    else {
      normQuery = collectionName;
    }

    console.log("Searching for: ", normQuery);
    
    try {
      const result = await getCollection({ collection: null, name: normQuery });

      // // Optional: Score and sort (if needed)
      // const scored = result.map((collection) => {
      //   const name = collection.name?.toLowerCase() ?? '';
      //   let score = 0;

      //   if (name === normQuery) score = 3;
      //   else if (name.startsWith(normQuery)) score = 2;
      //   else if (name.includes(normQuery)) score = 1;

      //   return { ...collection, score };
      // })
      // .filter((collection) => collection.score > 0)
      // .sort((a, b) => b.score - a.score);

      setCollections(result); // Update state to trigger re-render through entries
    } catch (error) {
      console.error("Error fetching collection:", error);
    }
  }

  // Dummy function
  function testFunc(entry) {
    console.log("Recieved from entry " + entry)
  }

  // Convert all the markers into UI entries
  const entries = collections.map((collection, index) => {
    return <CollectionEntry key={index} collection={collection} onClick={testFunc} />
  })

  return (
    <div className="search-bar">
      <form className="search-controls" onSubmit={handleSearch}>
        <input
          type="text"
          value={collectionName}
          onChange={(e) => setCollectionName(e.target.value)}
          placeholder="Enter collection name..."
        />
        <button type="submit">Fetch Collection</button>
        <button onClick={createCollection}>Create Collection</button>
      </form>

      <div className="search-results">
        {entries}
        {/* {searched && !collectionName && <h2 className="please-enter">Please enter in the search bar</h2>} */}
      </div>
      <SelectedCollections />
    </div>
  ); 
}