import { createContext, useContext } from 'react';

// Marker Contexts
export const MarkersContext = createContext();
export const MarkersContextUpdate = createContext();

// Collection Contexts
export const CollectionsContext = createContext();
export const CollectionsContextUpdate = createContext();

// Marker Hooks
export function useMarkers() {
    return useContext(MarkersContext);
}
export function useMarkerUpdate() {
    return useContext(MarkersContextUpdate);
}

// Collection Hooks
export function useCollections() {
    return useContext(CollectionsContext);
}
export function useCollectionsUpdate() {
    return useContext(CollectionsContextUpdate);
}