async function sendMarkers(useMarkers) {
    const markerCollection = useMarkers
    try {
      const response = await fetch('http://localhost:3000/api/markers/saveMarkers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(markerCollection),
      });
      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Markers sent successfully:', result);
    } catch (error) {
      console.error('Failed to send markers:', error);
    }
}

export default sendMarkers