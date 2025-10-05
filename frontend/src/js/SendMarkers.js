async function sendMarkers(markers) {

    // try {
    //     console.log('Deleting markers from server:', markers);
    //     const response = await fetch('http://localhost:3000/api/markers/deleteMarkers', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(markers),
    //     });
    //     console.log('Server response:', response);
    //     if (!response.ok) {
    //         throw new Error(`Server error: ${response.statusText}`);
    //     }

    //     const result = await response.json();
    //     console.log('Markers sent successfully:', result);
    // } 
    // catch (error) {
    //     console.error('Failed to send markers:', error);
    // }

    try {
        console.log('Sending markers to server:', markers);
        const response = await fetch('http://localhost:3000/api/markers/saveMarkers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(markers),
        });
        console.log('Server response:', response);
        if (!response.ok) {
            throw new Error(`Server error: ${response.statusText}`);
        }

        const result = await response.json();
        console.log('Markers sent successfully:', result);
    } 
    catch (error) {
        console.error('Failed to send markers:', error);
    }
}

export default sendMarkers