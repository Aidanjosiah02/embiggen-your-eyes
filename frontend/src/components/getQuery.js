export default async function getQuery(query) {
    
    try {
        const queryParams = new URLSearchParams();
        console.log(query)
        if (query) {
            const collectionId = query.collectionId
            const name = query.name

            console.log(queryParams.toString())

            const response = await fetch(`http://localhost:3000/api/markers/getMarkers?collectionId=${collectionId}&name=${name}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
            });

            console.log(response)

            if (!response.ok) {
                throw new Error(`Server error: ${response.statusText}`);
            }

            const markers = await response.json(); // Should be an array
            return markers;
        } 
    }
    
    catch (error) {
        console.error('Failed to fetch markers:', error);
        return [];
    }
}