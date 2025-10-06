import { useState } from 'react'
import Leaflet from './components/app/Leaflet.jsx'
import SearchMarkers from './components/app/SearchMarkers.jsx'
import SearchCollections from './components/app/SearchCollections.jsx'
import { Context } from './context/Context'
// import { useMarkers, useMarkerUpdate } from './context/ContextHook'
// import sendMarkers from './components/sendMarkers.js'
import Header from './components/app/Header.jsx'
import SubmitMarkers from './components/app/SubmitMarkers.jsx'
import './App.css'

function App() {

  // const markerCollection = useMarkerCollection();

  return (
    <Context>
      <Header />
      <main className='main'>
        <aside className='sidebar'>
          <div className="results-panel results-panel--markers">
            <SearchMarkers />
          </div>
        </aside>
        <section className="map-wrap">
          <Leaflet />
          <SubmitMarkers />
        </section>
        <aside className='sidebar'>
          <div className="results-panel results-panel--collections">
            <SearchCollections />
          </div>
        </aside>
      </main>
    </Context>
  )
}

export default App
