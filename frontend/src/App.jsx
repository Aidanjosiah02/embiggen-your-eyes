import { useState } from "react";
import Leaflet from "./components/app/Leaflet.jsx";
import LeafletGIBS from "./components/app/LeafletGIBS.jsx";
import SearchMarkers from "./components/app/SearchMarkers.jsx";
import { Context } from "./context/Context";
// import { useMarkers, useMarkerUpdate } from './context/ContextHook'
// import sendMarkers from './components/sendMarkers.js'
import Header from "./components/app/Header.jsx";
import SubmitMarkers from "./components/app/SubmitMarkers.jsx";
import SearchCollections from "./components/app/SearchCollections.jsx";

import "./App.css";

function App() {
  // const markerCollection = useMarkerCollection();

  return (
    <>
      <Context>
        <Header />
        <main className="main">
          <Leaflet />
          <SearchMarkers />
          <SubmitMarkers />
          <SearchCollections />
        </main>
      </Context>
    </>
  );
}

export default App;
