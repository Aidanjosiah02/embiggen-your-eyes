import { useState } from 'react'
import Leaflet from './components/Leaflet'
import SearchColumn from './components/SearchColumn'
import { Context } from './context/Context'
// import { useMarkers, useMarkerUpdate } from './context/ContextHook'
// import sendMarkers from './components/sendMarkers.js'
import Header from './components/Header.jsx'
import SubmitMarkers from './components/SubmitMarkers.jsx'

import './App.css'

function App() {

  // const markerCollection = useMarkerCollection();

  return (
    <>
      <Context>
        <Header />
        <main className='main'>
          <Leaflet />
          <SearchColumn />
          <SubmitMarkers />
        </main>
      </Context>
    </>
  )
}

export default App
