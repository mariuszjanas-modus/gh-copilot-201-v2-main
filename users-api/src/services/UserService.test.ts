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
      phone: '+1 (555) 123-4567',
      avatar: 'https://i.pravatar.cc/150?img=1',
      bio: 'Test bio',
      address: {
        street: '123 Main St',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94102',
        country: 'USA',
      },
      company: {
        name: 'TechCorp',
        position: 'Engineer',
        department: 'Engineering',
      },
    },
    {
      id: 2,
      name: 'Bob Smith',
      username: 'bobsmith',
      email: 'bob.smith@example.com',
      role: 'user',
      phone: '+1 (555) 234-5678',
      avatar: 'https://i.pravatar.cc/150?img=2',
      bio: 'Test bio 2',
      address: {
        street: '456 Oak Ave',
        city: 'Austin',
        state: 'TX',
        zipCode: '78701',
        country: 'USA',
      },
      company: {
        name: 'WebDesign Co.',
        position: 'Developer',
        department: 'Design',
      },
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
        expect(user).toHaveProperty('phone');
        expect(user).toHaveProperty('avatar');
        expect(user).toHaveProperty('bio');
        expect(user).toHaveProperty('address');
        expect(user).toHaveProperty('company');
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

  describe('getUserById', () => {
    it('should return user when valid ID is provided', () => {
      (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockUsers));

      const result = userService.getUserById(1);

      expect(result).toEqual(mockUsers[0]);
      expect(result?.id).toBe(1);
    });

    it('should return null when user is not found', () => {
      (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockUsers));

      const result = userService.getUserById(999);

      expect(result).toBeNull();
    });

    it('should return correct user for different IDs', () => {
      (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockUsers));

      const result1 = userService.getUserById(1);
      const result2 = userService.getUserById(2);

      expect(result1?.id).toBe(1);
      expect(result1?.name).toBe('Alice Johnson');
      expect(result2?.id).toBe(2);
      expect(result2?.name).toBe('Bob Smith');
    });

    it('should return user with all properties', () => {
      (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockUsers));

      const result = userService.getUserById(1);

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('name');
      expect(result).toHaveProperty('username');
      expect(result).toHaveProperty('email');
      expect(result).toHaveProperty('role');
      expect(result).toHaveProperty('phone');
      expect(result).toHaveProperty('avatar');
      expect(result).toHaveProperty('bio');
      expect(result).toHaveProperty('address');
      expect(result).toHaveProperty('company');
    });

    it('should return null when no users exist', () => {
      (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify([]));

      const result = userService.getUserById(1);

      expect(result).toBeNull();
    });

    it('should handle errors gracefully', () => {
      (fs.readFileSync as jest.Mock).mockImplementation(() => {
        throw new Error('File read error');
      });

      const result = userService.getUserById(1);

      expect(result).toBeNull();
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
