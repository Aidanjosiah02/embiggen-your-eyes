import "./styles/SearchEntry.css"
import { useCollections, useCollectionsUpdate } from '../context/ContextHook'
import getQuery from "./getQuery";

export default function CollectionEntry({collection}) {

    const setGlobalCollections = useCollectionsUpdate()

    return (
        <div className="search-entry" onClick={() => {
                setGlobalCollections((prev) => [...prev, collection]);
                getQuery({"collectionId": collection.id, "name": null})
            }
        }>
            <img className="search-image" src={collection.id} alt="Search Image" />
            <h3>{collection.name}</h3>
        </div>
    );
}