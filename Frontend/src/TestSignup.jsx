import React, { useState } from 'react';
import authService from './api/AuthService';

// added by miraj - Test component for signup functionality
const TestSignup = () => {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const testSignup = async () => {
    setLoading(true);
    setError('');
    setResult('');
    
    try {
      // Create a test user with a random username to avoid conflicts
      const randomNum = Math.floor(Math.random() * 10000);
      const userData = {
        user_name: `testuser${randomNum}`,
        email: `testuser${randomNum}@example.com`,
        password: 'password123',
        full_name: 'Test User',
        role: 'student'
      };
      
      console.log('Attempting signup with:', userData);
      const response = await authService.signup(userData);
      
      setResult(`Signup successful! You can use these credentials to log in:
        Username: ${userData.user_name}
        Email: ${userData.email}
        Password: password123
        Role: student
        
        Response from server: ${JSON.stringify(response)}
      `);
    } catch (error) {
      console.error('Signup error:', error);
      setError(`Signup failed: ${error.message || JSON.stringify(error)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Test Signup Functionality</h2>
      <button 
        onClick={testSignup} 
        disabled={loading}
        style={{
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Creating account...' : 'Create Test Account'}
      </button>
      
      {error && (
        <div style={{ 
          marginTop: '20px', 
          padding: '10px', 
          backgroundColor: '#ffebee', 
          border: '1px solid #f44336',
          borderRadius: '4px'
        }}>
          <h3>Error</h3>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{error}</pre>
        </div>
      )}
      
      {result && (
        <div style={{ 
          marginTop: '20px', 
          padding: '10px', 
          backgroundColor: '#e8f5e9', 
          border: '1px solid #4CAF50',
          borderRadius: '4px'
        }}>
          <h3>Success</h3>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{result}</pre>
        </div>
      )}
    </div>
  );
};

export default TestSignup;
