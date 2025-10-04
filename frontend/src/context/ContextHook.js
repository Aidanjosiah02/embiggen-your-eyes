import { createContext, useContext } from 'react';

// For providers
export const MarkersContext = createContext();
export const MarkersContextUpdate = createContext();

// For consumers
export function useMarkers() {
    return useContext(MarkersContext)
}
export function useMarkerUpdate() {
    return useContext(MarkersContextUpdate)
}