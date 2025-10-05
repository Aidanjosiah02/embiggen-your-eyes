import "./styles/SearchEntry.css"
import { useCollections, useCollectionsUpdate } from '../context/ContextHook'
import { useMarkers, useMarkerUpdate } from '../context/ContextHook';
import getQuery from "./getQuery";

export default function CollectionEntry({ collection }) {

    const setGlobalCollections = useCollectionsUpdate();
    const setGlobalMarkers = useMarkerUpdate();

    const handleClick = async () => {
        // Add collection to global state
        setGlobalCollections(prev => [...prev, collection]);

        try {
            // Await the async query
            const newMarkers = await getQuery({ collectionId: collection.id, name: null });

            // Update markers only after data is resolved
            setGlobalMarkers(prev => [...prev, ...newMarkers.data]);
        } catch (error) {
            console.error("Failed to fetch markers:", error);
            // Optional: handle error in UI or with a toast
        }
    };

    return (
        <div className="search-entry" onClick={handleClick}>
            <img className="search-image" src={collection.id} alt="Search Image" />
            <h3>{collection.name}</h3>
        </div>
    );
}