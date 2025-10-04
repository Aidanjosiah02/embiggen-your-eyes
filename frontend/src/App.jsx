import { useState } from 'react'
import Leaflet from './components/Leaflet'
import SearchColumn from './components/SearchColumn'
// import { Context } from './context/Context.jsx'
// import { useMarkerCollection, useMarkerCollectionUpdate } from './context/Context';

import './App.css'

function App() {
  
  // const markerCollection = useMarkerCollection();
  const markerCollection = [
    { lat: 60.87, lng: 52, name: "somename", description: "some description", map: "some map", collection: "somecollection", zoom: 2 },
    { lat: 52, lng: 21.76, name: "somename2", description: "description2", map: "map", collection: "somecollection", zoom: 2 }
  ]
  async function sendMarkers() {
    try {
      const response = await fetch('http://localhost:5173/api/markers/savemarkers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(markerCollection),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Markers sent successfully:', result);
    } catch (error) {
      console.error('Failed to send markers:', error);
    }
  }

  return (
    <>
      {/* <Context> */}
      {/* <AppHeader/> */}
      <main className='main'>
        <Leaflet />
        
        {/* <SearchColumn /> */}
      </main>
      {/* </Context> */}
    </>
  )
}

export default App
