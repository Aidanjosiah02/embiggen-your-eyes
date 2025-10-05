async function sendCollection(collection) {
    try {
        console.log('Sending collection to server:', collection);
        const response = await fetch('http://localhost:3000/api/markers/saveCollection', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(collection),
        });
        console.log('Server response:', response);
        if (!response.ok) {
            throw new Error(`Server error: ${response.statusText}`);
        }

        const result = await response.json();
        console.log('Collection sent successfully:', result);
    } 
    catch (error) {
        console.error('Failed to send collection:', error);
    }
}

export default sendCollection