// Test backend connection
export const testBackendConnection = async () => {
  try {
    const response = await fetch('http://localhost:3000');
    const data = await response.json();
    console.log('Backend connection test:', data);
    return data;
  } catch (error) {
    console.error('Backend connection failed:', error);
    return null;
  }
};

// Test API endpoints
export const testAPIEndpoints = async () => {
  const endpoints = [
    'http://localhost:3000/api/menu',
    'http://localhost:3000/api/orders',
    'http://localhost:3000/api/offers'
  ];

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      console.log(${endpoint}:, data);
    } catch (error) {
      console.error(${endpoint} failed:, error);
    }
  }
};
