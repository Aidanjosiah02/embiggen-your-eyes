import { useCollections, useCollectionsUpdate, useMarkerUpdate, useSelectedCollectionUpdate, useSelectedCollection } from '../context/ContextHook';
import './styles/SearchColumn.css';

export default function SelectedCollections() {
    const collections = useCollections();
    const setCollections = useCollectionsUpdate();
    const setMarkers = useMarkerUpdate();
    const setSelectedCollection = useSelectedCollectionUpdate();
    const selectedCollection = useSelectedCollection();

    function handleRemove(idToRemove) {
        setCollections(prev => prev.filter(collection => collection.id !== idToRemove));
        setMarkers(prev => prev.filter(marker => marker.collection_id !== idToRemove));
    }

    function handleEdit(collection) {
        setSelectedCollection(collection)
    }

    if (!collections.length) return null;

    return (
        <div className="selected-collections">
            <h4>Selected Collections</h4>
            <ul>
                {collections.map((collection) => (
                <li key={collection.id} className="collection-item">
                    <span>{collection.name}</span>
                    <button onClick={() => handleRemove(collection.id)}>Remove</button>
                    <button onClick={() => handleEdit(collection)}>Edit</button>
                </li>
                ))}
            </ul>
        </div>
    );
}