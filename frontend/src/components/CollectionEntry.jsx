import "./styles/SearchEntry.css"
import { useCollections, useCollectionsUpdate } from '../context/ContextHook'

export default function CollectionEntry({collection}) {

    const setGlobalCollections = useCollectionsUpdate()

    return (
        <div className="search-entry" onClick={() => setGlobalCollections((prev) => [...prev, collection])}>
            <img className="search-image" src={collection.id} alt="Search Image" />
            <h3>{collection.name}</h3>
        </div>
    );
}