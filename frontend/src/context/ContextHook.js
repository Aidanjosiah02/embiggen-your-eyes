import { createContext, useContext } from 'react';

// For providers
export const MarkerContext = createContext();
export const MarkerContextUpdate = createContext();

// For consumers
export function useMarkers() {
    return useContext(MarkerContext)
}
export function useMarkerUpdate() {
    return useContext(MarkerContextUpdate)
}