import { useState } from "react";
import '../../css/app/SearchMarkers.css';
import SearchEntry from '../search/SearchEntry';
import sendCollection from "../../js/sendCollection.js";
import CollectionEntry from '../search/CollectionEntry.jsx'
import getCollection from '../../js/getCollection.js'
import SelectedCollections from "../search/SelectedCollections.jsx";

export default function SearchCollections() {
  const [collectionName, setCollectionName] = useState('');

  async function createCollection(e) {
    e.preventDefault();                   /* ★ CHANGE */
    if (!collectionName.trim()) return;
    await sendCollection(collectionName.trim());
    setCollectionName('');                /* ★ NEW: clear field on create */
  }

  async function handleSearch(e) {
    e.preventDefault();                   /* ★ CHANGE */
    const normQuery = collectionName.trim() || "*";
    try { await getCollection({ collection: null, name: normQuery }); }
    catch (e) { console.error(e); }
  }

  return (
  <form className="sidebar-row" onSubmit={handleSearch}>
    <input
      type="text"
      value={collectionName}
      onChange={(e) => setCollectionName(e.target.value)}
      placeholder="Search Bar"
    />
    {/* ★ NEW wrapper to keep buttons on same line */}
    <div className="collection-buttons">
      <button type="submit">Fetch Collection</button>
      <button onClick={createCollection}>Create Collection</button>
    </div>
  </form>
);
}