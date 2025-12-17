const API_BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000/api';

interface ApiResponse<T> {
  success: boolean;
  statusCode?: number;
  message?: string;
  data?: T;
  [key: string]: unknown;
}

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include',
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'An error occurred');
      }
      
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Network error occurred');
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async put<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const apiService = new ApiService(API_BASE_URL);

export const authApi = {
  signup: (data: {
    email: string;
    username: string;
    password: string;
    firstname?: string;
    lastname?: string;
    refCode?: string;
  }) => apiService.post('/auth/signup', data),

  signin: (data: { email: string; password: string }) =>
    apiService.post('/auth/signin', data),

  signout: () => apiService.get('/auth/signout'),

  googleAuth: () => apiService.get('/auth/register/google'),

  generateOTP: (email: string) =>
    apiService.post('/auth/generateOTP', { email }),

  verifyOTP: (data: { email: string; OTP: string }) =>
    apiService.post('/auth/verifyOTP', data),

  resendOTP: (email: string) =>
    apiService.post('/auth/resendOTP', { email }),

  verifyUser: (id: string, token: string) =>
    apiService.get(`/auth/${id}/verify/${token}`),

  resendVerificationEmail: (id: string) =>
    apiService.get(`/auth/resendVerificationMail/${id}`),

  resetPassword: (newPassword: string) =>
    apiService.post('/auth/resetPassword', { newPassword }),

  changePassword: (data: { currentPassword: string; newPassword: string }) =>
    apiService.post('/auth/changePassword', data),

  readCookies: () => apiService.get('/auth/read-cookies'),
};

