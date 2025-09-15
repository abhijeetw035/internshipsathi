import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class AuthService {
  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('authToken');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  setAuthToken(token) {
    if (token) {
      this.api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete this.api.defaults.headers.common['Authorization'];
    }
  }

  removeAuthToken() {
    delete this.api.defaults.headers.common['Authorization'];
  }

  async login(email, password) {
    try {
      if (process.env.NODE_ENV === 'development') {
        return this.mockLogin(email, password);
      }
      
      const response = await this.api.post('/auth/login', { email, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async register(userData) {
    try {
      if (process.env.NODE_ENV === 'development') {
        return this.mockRegister(userData);
      }
      
      const response = await this.api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async refreshToken() {
    try {
      const response = await this.api.post('/auth/refresh');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    try {
      await this.api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  mockLogin(email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const validCredentials = [
          { email: 'admin@ministry.gov.in', password: 'admin123', role: 'admin' },
          { email: 'user@ministry.gov.in', password: 'user123', role: 'user' },
          { email: 'coordinator@ministry.gov.in', password: 'coord123', role: 'coordinator' }
        ];

        const user = validCredentials.find(
          cred => cred.email === email && cred.password === password
        );

        if (user) {
          const token = this.generateMockToken(user);
          resolve({ token, user: { email: user.email, role: user.role } });
        } else {
          reject({
            response: {
              data: { message: 'Invalid email or password' }
            }
          });
        }
      }, 1000);
    });
  }

  mockRegister(userData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!userData.email || !userData.password || !userData.fullName) {
          reject({
            response: {
              data: { message: 'All fields are required' }
            }
          });
          return;
        }

        if (userData.email === 'admin@ministry.gov.in') {
          reject({
            response: {
              data: { message: 'Email already exists' }
            }
          });
          return;
        }

        const user = {
          email: userData.email,
          role: userData.role || 'user',
          fullName: userData.fullName
        };

        const token = this.generateMockToken(user);
        resolve({ token, user });
      }, 1000);
    });
  }

  generateMockToken(user) {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({
      id: Math.random().toString(36).substr(2, 9),
      email: user.email,
      role: user.role,
      fullName: user.fullName,
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24 hours
      iat: Math.floor(Date.now() / 1000)
    }));
    const signature = btoa('mock-signature');
    
    return `${header}.${payload}.${signature}`;
  }
}

export default new AuthService();
