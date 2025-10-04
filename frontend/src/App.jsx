import { useState } from 'react'
import Leaflet from './components/Leaflet'
import SearchColumn from './components/SearchColumn'
import { Context } from './context/Context'
import { useMarkers, useMarkerUpdate } from './context/ContextHook'
import sendMarkers from './components/SendMarkers.js'
import Header from './components/Header.jsx'

import './App.css'

function App() {

  // const markerCollection = useMarkerCollection();
  const markerCollection = [
    { lat: 60.87, lng: 52, name: "somename", description: "some description", map: "some map", collection: "somecollection", zoom: 2 },
    { lat: 52, lng: 21.76, name: "somename2", description: "description2", map: "map", collection: "somecollection", zoom: 2 }
  ]
  sendMarkers(markerCollection);

  return (
    <>
      <Context>
        <Header/>
        <main className='main'>
          <Leaflet />
          <SearchColumn />
        </main>
      </Context>
    </>
  )
}

export default App
