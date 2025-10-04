export default function SearchEntry({ entry, onClick }) {


    return (
        <div className="search-entry" onClick={() => onClick(entry)}>
            <img className="search-image" alt="Search Image" />
            <div className="search-details">
                <h3>{/* {entry.name} */}Earth</h3>           {/* Title */}
                <p>{/* {entry.description} */}Earth, our home, is the third planet from the sun and the only astronomical object known to harbor life</p>      {/* Short Description */}
            </div>
        </div>
    );
}