import { useCollections, useCollectionsUpdate, useMarkerUpdate, useSelectedCollectionUpdate, useSelectedCollection } from '../../context/ContextHook';
import '../../css/app/SearchMarkers.css';
import '../../css/search/SelectedCollection.css'

export default function SelectedCollections() {
    // Get global states and setters
    const collections = useCollections();
    const setCollections = useCollectionsUpdate();
    const setMarkers = useMarkerUpdate();
    const setSelectedCollection = useSelectedCollectionUpdate();
    const selectedCollection = useSelectedCollection();

    // remove a selected collection
    function handleRemove(idToRemove) {
        setCollections(prev => prev.filter(collection => collection.id !== idToRemove));
        setMarkers(prev => prev.filter(marker => marker.collection_id !== idToRemove));
    }

    // Enable a collection for edit
    function handleEdit(collection) {
        setSelectedCollection(collection)
    }

    // Empty all selected collection 
    function clearAll() {
        setCollections([]);
        setMarkers([]);
        setSelectedCollection({ "id": null, "name": null })
        console.log("Clear all is clicked!")
    }

    // When no collection is selected
    if (!collections.length) return null;

    // React component
    return (
        <div className="selected-collections results-scroll">
            <div className='select-collection-container'>
                <h4>Selected Collections</h4>
                <button onClick={clearAll}>Clear All</button>
            </div>
            <ul>
                {collections.map((collection) => (
                    <li key={collection.id} className="collection-item">
                        <span>{collection.name}</span>
                        <div className="row-actions">
                            <button className='button--ghost' onClick={() => handleRemove(collection.id)}>Remove</button>
                            <button className='button--danger' onClick={() => handleEdit(collection)}>Edit</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}