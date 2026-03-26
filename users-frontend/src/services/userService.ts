import axios from 'axios';
import type { User } from '../types/User';

const API_BASE_URL = 'http://localhost:3000';

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get<User[]>(`${API_BASE_URL}/api/users`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Failed to fetch users');
    }
    throw new Error('An unexpected error occurred');
  }
};

export const getUserById = async (userId: number): Promise<User> => {
  try {
    const response = await axios.get<User>(`${API_BASE_URL}/api/users/${userId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Failed to fetch user');
    }
    throw new Error('An unexpected error occurred');
  }
};
