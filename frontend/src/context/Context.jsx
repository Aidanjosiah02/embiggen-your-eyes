import React, { useState } from 'react';
import { MarkerContext, MarkerContextUpdate } from './ContextHook';

export function Context({ children }) {

    const [markerCollection, setMarkerCollection] = useState([])

    function updateMarkerCollection() {
        setMarkerCollection(prevCollection => prevCollection) // DOES NOTHING YET
    }

    return (
        <MarkerContext.Provider value={markerCollection}>
            <MarkerContextUpdate.Provider value={updateMarkerCollection}>
                {children}
            </MarkerContextUpdate.Provider>
        </MarkerContext.Provider>
    )
}