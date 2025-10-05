import { useState } from "react";
import Leaflet from "./components/app/Leaflet.jsx";
import LeafletGIBS from "./components/app/LeafletGIBS.jsx";
import SearchMarkers from "./components/app/SearchMarkers.jsx";
import { Context } from "./context/Context";
// import { useMarkers, useMarkerUpdate } from './context/ContextHook'
// import sendMarkers from './components/sendMarkers.js'
import Header from './components/app/Header.jsx'
import SubmitMarkers from './components/app/SubmitMarkers.jsx'
import SearchCollections from './components/app/SearchCollections.jsx'
import SelectedCollections from './components/search/SelectedCollections.jsx';

import "./App.css";

function App() {
  // const markerCollection = useMarkerCollection();

  return (
    <Context>
      <Header />
      <main className='main'>{/* grid lives in App.css */}
        {/* ★ CHANGE: Wrap map & floating button */}
        <section className="map-wrap">
          <Leaflet />
          <SubmitMarkers /> {/* ★ CHANGE: now sits on top of the map */}
        </section>

        {/* ★ CHANGE: Right sidebar matches your mock */}
        <aside className="sidebar">
          <SearchMarkers />      {/* top row: input + Find */}
          <SearchCollections />  {/* second row: input + Fetch + Create */}

          {/* middle panel: “Entries for Makers” */}
          <div className="results-panel results-panel--markers">
            <h3>Entries for Makers</h3>
            <div id="markers-results-mount" className="results-scroll"></div> {/* ★ NEW */}
          </div>

          {/* bottom panel: “Entries for Collection” */}
          <div className="results-panel results-panel--collections">
            <h3>Entries for Collection</h3>
            <SelectedCollections /> {/* renders list inside this panel */}
          </div>
        </aside>
      </main>
    </Context>
  )
}

export default App;
