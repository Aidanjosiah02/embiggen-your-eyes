import { createContext, useContext } from 'react';

// For providers
export const MarkerContext = createContext();
export const MarkerContextUpdate = createContext();

// For consumers
export function useMarkerCollection() {
    return useContext(MarkerContext)
}
export function useMarkerCollectionUpdate() {
    return useContext(MarkerContextUpdate)
}