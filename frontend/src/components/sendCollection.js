async function sendCollection(name) {
  try {
    console.log('Sending collection to server:', name);
    const response = await fetch('http://localhost:3000/api/collection', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      // Log the issue and return null to indicate failure
      console.warn(`Failed to send collection. Status: ${response.status}`);
      return null;
    }

    const result = await response.json();
    return result; // Only return valid parsed collection data
  } 
  catch (error) {
    console.error('Request failed:', error);
    return null;
  }
}

export default sendCollection