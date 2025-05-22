import { PUBLIC_API_CHI_URL } from '$env/static/public';
import { ApiMessage } from './message';

async function Login(username: string, password: string): Promise<boolean> {
  try {
    const response = await fetch(`${PUBLIC_API_CHI_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password }),
      credentials: 'include'
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || ApiMessage.LOGIN_FAILED);
    }

    const data = await response.json();
    if (data.message === ApiMessage.LOGIN_SUCCESS) {
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error during login:', error);
    return false;
  }
}

async function Verify(): Promise<boolean> {
  try {
    const response = await fetch(`${PUBLIC_API_CHI_URL}/api/auth/verify`, {
      credentials: 'include'
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    const data = await response.json();
    if (data.message === ApiMessage.AUTH_SUCCESS) {
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error during verify:', error);
    return false;
  }
}

export default { Login, Verify };
