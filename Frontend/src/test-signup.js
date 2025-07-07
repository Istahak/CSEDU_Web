// Test script to create a user account
const fetch = require('node-fetch');

async function createTestUser() {
  try {
    const userData = {
      user_name: "testuser123",
      email: "testuser123@gmail.com",
      password: "password123",
      full_name: "Test User",
      role: "student"
    };

    console.log('Attempting to create user with data:', userData);

    const response = await fetch('http://localhost:8000/api/v1/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    console.log('Response status:', response.status);
    console.log('Response data:', data);

    return {
      status: response.status,
      data: data,
      credentials: {
        email: userData.email,
        password: userData.password,
        user_name: userData.user_name,
        full_name: userData.full_name,
        role: userData.role
      }
    };
  } catch (error) {
    console.error('Error creating test user:', error);
    return { error: error.message };
  }
}

createTestUser().then(result => {
  console.log('Test completed');
  console.log('Credentials for login:');
  if (result.credentials) {
    console.log(`Email: ${result.credentials.email}`);
    console.log(`Password: ${result.credentials.password}`);
    console.log(`Role: ${result.credentials.role}`);
  }
});
