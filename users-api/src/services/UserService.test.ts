import { UserService } from './UserService';
import { User } from '../types/User';
import * as fs from 'fs';
import * as path from 'path';

// Mock the fs module
jest.mock('fs');

describe('UserService Unit Tests', () => {
  let userService: UserService;
  const mockUsers: User[] = [
    {
      id: 1,
      name: 'Alice Johnson',
      username: 'alicej',
      email: 'alice.johnson@example.com',
      role: 'admin',
    },
    {
      id: 2,
      name: 'Bob Smith',
      username: 'bobsmith',
      email: 'bob.smith@example.com',
      role: 'user',
    },
  ];

  beforeEach(() => {
    userService = new UserService();
    jest.clearAllMocks();
  });

  describe('getAllUsers', () => {
    it('should return an array of users when file is read successfully', () => {
      (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockUsers));

      const result = userService.getAllUsers();

      expect(result).toEqual(mockUsers);
      expect(result).toHaveLength(2);
    });

    it('should return users with correct interface properties', () => {
      (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockUsers));

      const result = userService.getAllUsers();

      result.forEach((user) => {
        expect(user).toHaveProperty('id');
        expect(user).toHaveProperty('name');
        expect(user).toHaveProperty('username');
        expect(user).toHaveProperty('email');
        expect(user).toHaveProperty('role');
      });
    });

    it('should return empty array when file read fails', () => {
      (fs.readFileSync as jest.Mock).mockImplementation(() => {
        throw new Error('File not found');
      });

      const result = userService.getAllUsers();

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });

    it('should return empty array when JSON parsing fails', () => {
      (fs.readFileSync as jest.Mock).mockReturnValue('invalid json');

      const result = userService.getAllUsers();

      expect(result).toEqual([]);
    });

    it('should call readFileSync with correct path', () => {
      (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockUsers));

      userService.getAllUsers();

      expect(fs.readFileSync).toHaveBeenCalledTimes(1);
      expect(fs.readFileSync).toHaveBeenCalledWith(
        expect.stringContaining('users.json'),
        'utf-8'
      );
    });

    it('should handle empty user array', () => {
      (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify([]));

      const result = userService.getAllUsers();

      expect(result).toEqual([]);
      expect(Array.isArray(result)).toBe(true);
    });

    it('should preserve user data integrity', () => {
      (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockUsers));

      const result = userService.getAllUsers();

      expect(result[0].id).toBe(mockUsers[0].id);
      expect(result[0].name).toBe(mockUsers[0].name);
      expect(result[0].email).toBe(mockUsers[0].email);
    });
  });

  describe('Error Handling', () => {
    it('should log error when file read fails', () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      (fs.readFileSync as jest.Mock).mockImplementation(() => {
        throw new Error('Read error');
      });

      userService.getAllUsers();

      expect(consoleSpy).toHaveBeenCalledWith(
        'Error reading users file:',
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });
  });
});
