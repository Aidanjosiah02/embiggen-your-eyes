import { useState } from "react";
import Leaflet from "./components/app/Leaflet.jsx";
import LeafletGIBS from "./components/app/LeafletGIBS.jsx";
// import SearchMarkers from "./components/app/SearchMarkers.jsx";
import { Context } from "./context/Context";
// import { useMarkers, useMarkerUpdate } from './context/ContextHook'
// import sendMarkers from './components/sendMarkers.js'
import Header from './components/app/Header.jsx'
import SubmitMarkers from './components/app/SubmitMarkers.jsx'
// import SearchCollections from './components/app/SearchCollections.jsx'
import SearchBox from './components/app/SearchBox.jsx'
import SelectedCollections from './components/search/SelectedCollections.jsx';

import "./App.css";

function App() {
  // const markerCollection = useMarkerCollection();

  return (
    <Context>
      <Header />
      <main className='main'>
        <section className="map-wrap">
          <Leaflet />
          <SubmitMarkers />
        </section>
        <aside className="sidebar">
          <SearchBox />
          {/* <SelectedCollections /> */}
          {/* <SearchMarkers />
          <SearchCollections />
          <div className="results-panel results-panel--markers">
            <h3>Entries for Makers</h3>
            <div id="markers-results-mount" className="results-scroll">
            </div>
          </div> */}
          <div className="results-panel results-panel--collections">
            <h3>Selected Collections</h3>
            <SelectedCollections />
          </div>
        </aside>
      </main>
      {/* <LeafletGIBS /> */}
    </Context>
  )
}

export default App;
