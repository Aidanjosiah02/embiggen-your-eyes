import { useState } from 'react'
import Leaflet from './components/Leaflet'
import { ContextProvider } from './Context/ContextProvider'

import './App.css'

function App() {

  return (
    <>
      <ContextProvider>
        <Leaflet />
      </ContextProvider>
    </>
  )
}

export default App
