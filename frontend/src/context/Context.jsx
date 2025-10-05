import React, { useState } from 'react';
import {
  MarkersContext,
  MarkersContextUpdate,
  CollectionsContext,
  CollectionsContextUpdate
} from './ContextHook';

export function Context({ children }) {
  const [markers, setMarkers] = useState([]);
  const [collections, setCollections] = useState([]);

  return (
    <MarkersContext.Provider value={markers}>
      <MarkersContextUpdate.Provider value={setMarkers}>
        <CollectionsContext.Provider value={collections}>
          <CollectionsContextUpdate.Provider value={setCollections}>
            {children}
          </CollectionsContextUpdate.Provider>
        </CollectionsContext.Provider>
      </MarkersContextUpdate.Provider>
    </MarkersContext.Provider>
  );
}