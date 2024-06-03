// src/utils/saveVisitor.js
export const saveVisitor = async (location) => {
  try {
    const response = await fetch('http://localhost:5000/api/save-location', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(location),
    });

    if (!response.ok) {
      throw new Error('Failed to save visitor location');
    }

    return await response.json();
  } catch (error) {
    console.error('Error saving visitor location:', error);
    throw error;
  }
};
