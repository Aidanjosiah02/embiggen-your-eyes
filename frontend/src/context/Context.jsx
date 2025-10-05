import React, { useState } from 'react';
import {
  MarkersContext,
  MarkersContextUpdate,
  CollectionsContext,
  CollectionsContextUpdate,
  SelectedCollectionContext,
  SelectedCollectionContextUpdate
} from './ContextHook';

export function Context({ children }) {
  const [markers, setMarkers] = useState([]);
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState({"id": null, "name": null});

  return (
    <MarkersContext.Provider value={markers}>
      <MarkersContextUpdate.Provider value={setMarkers}>
        <CollectionsContext.Provider value={collections}>
          <CollectionsContextUpdate.Provider value={setCollections}>
            <SelectedCollectionContext.Provider value={selectedCollection}>
              <SelectedCollectionContextUpdate.Provider value={setSelectedCollection}>
                {children}
              </SelectedCollectionContextUpdate.Provider>
            </SelectedCollectionContext.Provider>
          </CollectionsContextUpdate.Provider>
        </CollectionsContext.Provider>
      </MarkersContextUpdate.Provider>
    </MarkersContext.Provider>
  );
}