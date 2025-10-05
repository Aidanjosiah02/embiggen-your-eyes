import { useState } from "react";
import './styles/SearchColumn.css';
import SearchEntry from './SearchEntry';
import sendCollection from "./sendCollection";

export default function SearchCollection() {
  const [collectionName, setCollectionName] = useState('');
  const [entries, setEntries] = useState([]);

  async function handleSearch(e) {
    e.preventDefault();

    if (!collectionName.trim()) {
      setEntries([]);
      return;
    }

    const result = await sendCollection(collectionName.trim());
    setEntries(result || []);
  }

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
      </form>

      <div className="search-results">
        {entries.length > 0 ? entries.map((entry, index) => (<SearchEntry key={index} data={entry} />)) : <p>No results.</p>}
      </div>
    </div>
  );
}