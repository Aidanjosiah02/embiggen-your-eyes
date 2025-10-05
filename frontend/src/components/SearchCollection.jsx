import { useState } from "react";
import './styles/SearchColumn.css';
import SearchEntry from './SearchEntry';
import sendCollection from "./sendCollection";
import CollectionEntry from './CollectionEntry'
import getQuery from './getQuery.js'

export default function SearchCollection() {
  const [collectionName, setCollectionName] = useState('');
  const [collections, setCollections] = useState([]);

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
  function handleSearch(e) {
    e.preventDefault();

    if (!collectionName.trim()) {
      // Clear collections (optional – you could choose not to reset here)
      return;
    }

    console.log("Searching for: ", collectionName);

    const normQuery = collectionName.toLowerCase();

    getQuery({"collection": normQuery, "name": null})

    const scored = collections.map((collection) => {
      const name = collection.name.toLowerCase();
      let score = 0;

      if (name === normQuery) score = 3;
      else if (name.startsWith(normQuery)) score = 2;
      else if (name.includes(normQuery)) score = 1;

      return { ...collection, score };
    })
    .filter((collection) => collection.score > 0)
    .sort((a, b) => b.score - a.score);

    setCollections(scored);  // Update the collections list with sorted results
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
        {!collectionName && <h2>Please enter in the search bar</h2>}
      </div>
    </div>
  );
}