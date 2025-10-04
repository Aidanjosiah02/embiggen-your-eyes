import React, { useState, createContext, useContext } from 'react'

const MarkerContext = createContext();
const MarkerContextUpdate = createContext();

export function ContextProvider({ children }) {
    const [markerCollection, setMarkerCollection] = useState([])

    function updateMarkerCollection() {
        setMarkerCollection(prevCollection => prevCollection)
    }

    return (
        <>
            <MarkerContext.Provider value={markerCollection}>
                <MarkerContextUpdate value={updateMarkerCollection}>
                    {children}
                </ MarkerContextUpdate>
            </ MarkerContext.Provider>
        </>
    )
}

export function useMarkerCollection() {
    return useContext(MarkerContext)
}

export function useMarkerCollectionUpdate() {
    return useContext(MarkerContextUpdate)
}