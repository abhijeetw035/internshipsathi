class AuthService {
  constructor() {
    // No backend configuration needed - pure frontend implementation
    this.mockUsers = [
      { email: 'admin@ministry.gov.in', password: 'admin123', role: 'admin', fullName: 'Admin User' },
      { email: 'student@ministry.gov.in', password: 'student123', role: 'student', fullName: 'Student User' },
      { email: 'company@ministry.gov.in', password: 'comp123', role: 'company', fullName: 'Company User' }
    ];
  }

  setAuthToken(token) {
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
  }

  removeAuthToken() {
    localStorage.removeItem('authToken');
  }

  getToken() {
    return localStorage.getItem('authToken');
  }

  isAuthenticated() {
    const token = this.getToken();
    if (!token) return false;
    
    try {
      const decoded = this.decodeToken(token);
      return decoded.exp > Math.floor(Date.now() / 1000);
    } catch {
      return false;
    }
  }

  getCurrentUser() {
    const token = this.getToken();
    if (!token) return null;
    
    try {
      return this.decodeToken(token);
    } catch {
      return null;
    }
  }

  decodeToken(token) {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }

  async login(email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = this.mockUsers.find(
          cred => cred.email === email && cred.password === password
        );

        if (user) {
          const token = this.generateMockToken(user);
          this.setAuthToken(token);
          resolve({ 
            token, 
            user: { 
              email: user.email, 
              role: user.role, 
              fullName: user.fullName 
            } 
          });
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

  async register(userData) {
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

        // Check if email already exists
        if (this.mockUsers.find(user => user.email === userData.email)) {
          reject({
            response: {
              data: { message: 'Email already exists' }
            }
          });
          return;
        }

        const user = {
          email: userData.email,
          role: userData.role || 'student',
          fullName: userData.fullName
        };

        // Add to mock users for future logins
        this.mockUsers.push({ ...user, password: userData.password });

        const token = this.generateMockToken(user);
        this.setAuthToken(token);
        resolve({ token, user });
      }, 1000);
    });
  }

  async refreshToken() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const currentToken = this.getToken();
        if (currentToken && this.isAuthenticated()) {
          const decoded = this.decodeToken(currentToken);
          const newToken = this.generateMockToken(decoded);
          this.setAuthToken(newToken);
          resolve({ token: newToken });
        } else {
          resolve({ token: null });
        }
      }, 500);
    });
  }

  async logout() {
    this.removeAuthToken();
    return Promise.resolve();
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
