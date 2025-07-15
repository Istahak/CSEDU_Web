const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

/**
 * Login API: Sends credentials to backend and returns the full response object
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Object>} The backend response (user_id, role, token, profile_id)
 */
export async function loginUser(email, password) {
  try {
    const response = await fetch(`${VITE_BACKEND_URL}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Login API error:', error);
    throw error;
  }
}
