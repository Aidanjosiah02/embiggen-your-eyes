import React, { useState } from 'react';
import { MarkersContext, MarkersContextUpdate } from './ContextHook';



export function Context({ children }) {
    const [markers, setMarkers] = useState([])
    return (
        <MarkersContext.Provider value={markers}>
            <MarkersContextUpdate.Provider value={setMarkers}>
                {children}
            </MarkersContextUpdate.Provider>
        </MarkersContext.Provider>
    )
}