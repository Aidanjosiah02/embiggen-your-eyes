import { createContext, useContext } from 'react';

// Marker Contexts
export const MarkersContext = createContext();
export const MarkersContextUpdate = createContext();

// Collection Contexts
export const CollectionsContext = createContext();
export const CollectionsContextUpdate = createContext();

// Selected Collection Contexts
export const SelectedCollectionContext = createContext(null);
export const SelectedCollectionContextUpdate = createContext(null);

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

// Selected Collection Hooks
export function useSelectedCollection() {
  return useContext(SelectedCollectionContext);
}
export function useSelectedCollectionUpdate() {
  return useContext(SelectedCollectionContextUpdate);
}