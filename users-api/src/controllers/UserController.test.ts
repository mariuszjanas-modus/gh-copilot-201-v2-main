import { Request, Response } from 'express';
import { UserController } from './UserController';
import { UserService } from '../services/UserService';
import { User } from '../types/User';

// Mock the UserService
jest.mock('../services/UserService');

describe('UserController Unit Tests', () => {
  let userController: UserController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockJson: jest.Mock;
  let mockStatus: jest.Mock;

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
    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({ json: mockJson });
    
    mockRequest = {};
    mockResponse = {
      json: mockJson,
      status: mockStatus,
    };

    userController = new UserController();
    jest.clearAllMocks();
  });

  describe('getUsers', () => {
    it('should return users with status 200', () => {
      const mockGetAllUsers = jest.fn().mockReturnValue(mockUsers);
      (UserService as jest.MockedClass<typeof UserService>).prototype.getAllUsers = mockGetAllUsers;

      userController = new UserController();
      userController.getUsers(mockRequest as Request, mockResponse as Response);

      expect(mockGetAllUsers).toHaveBeenCalledTimes(1);
      expect(mockJson).toHaveBeenCalledWith(mockUsers);
      expect(mockStatus).not.toHaveBeenCalled();
    });

    it('should return correct number of users', () => {
      const mockGetAllUsers = jest.fn().mockReturnValue(mockUsers);
      (UserService as jest.MockedClass<typeof UserService>).prototype.getAllUsers = mockGetAllUsers;

      userController = new UserController();
      userController.getUsers(mockRequest as Request, mockResponse as Response);

      expect(mockJson).toHaveBeenCalledWith(expect.arrayContaining(mockUsers));
    });

    it('should return empty array when no users exist', () => {
      const mockGetAllUsers = jest.fn().mockReturnValue([]);
      (UserService as jest.MockedClass<typeof UserService>).prototype.getAllUsers = mockGetAllUsers;

      userController = new UserController();
      userController.getUsers(mockRequest as Request, mockResponse as Response);

      expect(mockJson).toHaveBeenCalledWith([]);
    });

    it('should handle errors and return 500 status', () => {
      const mockGetAllUsers = jest.fn().mockImplementation(() => {
        throw new Error('Database error');
      });
      (UserService as jest.MockedClass<typeof UserService>).prototype.getAllUsers = mockGetAllUsers;

      userController = new UserController();
      userController.getUsers(mockRequest as Request, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({ error: 'Failed to retrieve users' });
    });

    it('should return correct error message on failure', () => {
      const mockGetAllUsers = jest.fn().mockImplementation(() => {
        throw new Error('File not found');
      });
      (UserService as jest.MockedClass<typeof UserService>).prototype.getAllUsers = mockGetAllUsers;

      userController = new UserController();
      userController.getUsers(mockRequest as Request, mockResponse as Response);

      expect(mockJson).toHaveBeenCalledWith(
        expect.objectContaining({
          error: expect.stringContaining('Failed to retrieve users')
        })
      );
    });

    it('should call UserService getAllUsers method', () => {
      const mockGetAllUsers = jest.fn().mockReturnValue(mockUsers);
      (UserService as jest.MockedClass<typeof UserService>).prototype.getAllUsers = mockGetAllUsers;

      userController = new UserController();
      userController.getUsers(mockRequest as Request, mockResponse as Response);

      expect(mockGetAllUsers).toHaveBeenCalled();
    });

    it('should return users with valid interface structure', () => {
      const mockGetAllUsers = jest.fn().mockReturnValue(mockUsers);
      (UserService as jest.MockedClass<typeof UserService>).prototype.getAllUsers = mockGetAllUsers;

      userController = new UserController();
      userController.getUsers(mockRequest as Request, mockResponse as Response);

      const returnedUsers = mockJson.mock.calls[0][0];
      returnedUsers.forEach((user: User) => {
        expect(user).toHaveProperty('id');
        expect(user).toHaveProperty('name');
        expect(user).toHaveProperty('username');
        expect(user).toHaveProperty('email');
        expect(user).toHaveProperty('role');
      });
    });
  });

  describe('Constructor', () => {
    it('should initialize UserService', () => {
      // Clear mocks before this test
      jest.clearAllMocks();
      
      // Create a new instance
      const newController = new UserController();
      
      expect(newController).toBeInstanceOf(UserController);
      expect(UserService).toHaveBeenCalled();
    });
  });
});
