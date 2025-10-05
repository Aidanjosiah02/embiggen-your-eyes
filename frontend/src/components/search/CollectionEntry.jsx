import "../../css/search/SearchEntry.css"
import { useCollections, useCollectionsUpdate } from '../../context/ContextHook'
import { useMarkers, useMarkerUpdate } from '../../context/ContextHook';
import getQuery from '../../js/getQuery.js'; 

export default function CollectionEntry({ collection }) {

    const setGlobalCollections = useCollectionsUpdate();
    const setGlobalMarkers = useMarkerUpdate();

    const handleClick = async () => {
        setGlobalCollections(prev => [...prev, collection]);
        try {
            const newMarkers = await getQuery({ collectionId: collection.id, name: null });
            const markers = Array.isArray(newMarkers?.data) ? newMarkers.data : [];

            // Only update markers if there are any
            if (markers.length > 0) {
                setGlobalMarkers(prev => [...prev, ...markers]);
            } else {
                console.warn(`No markers found in collection: ${collection.name}`);
            }

        } catch (error) {
            console.error("Failed to fetch markers:", error);
        }
    };

    return (
        <div className="search-entry" onClick={handleClick}>
            <img className="search-image" src={collection.id} alt="Search Image" />
            <h3>{collection.name}</h3>
        </div>
    );
}