async function getMarkers(collection, name) {
    
    try {
        const queryParams = new URLSearchParams();

        if (collection) queryParams.append('collection', collection);
        if (name) queryParams.append('name', name);

        const response = await fetch(`http://localhost:3000/api/markers/getMarkers?${queryParams.toString()}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
        }

        const markers = await response.json(); // Should be an array
        return markers;
    } 
    
    catch (error) {
        console.error('Failed to fetch markers:', error);
        return [];
    }
}

export default getMarkers