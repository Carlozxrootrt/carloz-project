// src/services/LocationService.js
export const getLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    } else {
      reject(new Error('Geolocation is not supported by this browser.'));
    }
  });
};

export const saveLocation = async (latitude, longitude) => {
  try {
    const response = await fetch('http://localhost:5000/api/save-location', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ latitude, longitude }),
    });

    if (!response.ok) {
      throw new Error('Failed to save location');
    }

    return await response.json();
  } catch (error) {
    console.error('Error saving location:', error);
    throw error;
  }
};
