import "./styles/SearchEntry.css"
export default function SearchEntry({ entry, onClick }) {
    return (
        <div className="search-entry" onClick={() => onClick(entry)}>
            <img className="search-image" src={entry.image} alt="Search Image" />
            <h3>{entry.name}</h3>           {/* Title */}
        </div>
    );
}