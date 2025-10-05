async function sendCollection(name) {
    try {
        console.log('Sending collection to server:', name);
        const response = await fetch('http://localhost:3000/api/collection', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name}),
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