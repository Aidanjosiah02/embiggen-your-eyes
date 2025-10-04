import React, { useState } from 'react';
import { MarkersContext, MarkersContextUpdate } from './ContextHook';

export function Context({ children }) {

    const [markers, setMarkers] = useState([])

    function updateMarkers() {
        setMarkers(prevMarkers => prevMarkers) // DOES NOTHING YET
    }

    return (
        <MarkersContext.Provider value={markers}>
            <MarkersContextUpdate.Provider value={updateMarkers}>
                {children}
            </MarkersContextUpdate.Provider>
        </MarkersContext.Provider>
    )
}