import React, { useState } from 'react';
import { MarkersContext, MarkersContextUpdate } from './ContextHook';



export function Context({ children }) {
    const [markers, setMarkers] = useState([
        { lat: 60.87, lng: 52, name: "somename", description: "some description", map: "some map", collection: "somecollection", zoom: 2 },
        { lat: 52, lng: 21.76, name: "somename2", description: "description2", map: "map", collection: "somecollection", zoom: 2 }
    ])
    return (
        <MarkersContext.Provider value={markers}>
            <MarkersContextUpdate.Provider value={setMarkers}>
                {children}
            </MarkersContextUpdate.Provider>
        </MarkersContext.Provider>
    )
}