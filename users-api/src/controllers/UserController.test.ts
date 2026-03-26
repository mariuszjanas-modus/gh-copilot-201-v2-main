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

  describe('getUserById', () => {
    it('should return user when valid ID is provided', () => {
      const mockGetUserById = jest.fn().mockReturnValue(mockUsers[0]);
      (UserService as jest.MockedClass<typeof UserService>).prototype.getUserById = mockGetUserById;
      mockRequest.params = { userId: '1' };

      userController = new UserController();
      userController.getUserById(mockRequest as Request, mockResponse as Response);

      expect(mockGetUserById).toHaveBeenCalledWith(1);
      expect(mockJson).toHaveBeenCalledWith(mockUsers[0]);
      expect(mockStatus).not.toHaveBeenCalled();
    });

    it('should return 404 when user is not found', () => {
      const mockGetUserById = jest.fn().mockReturnValue(null);
      (UserService as jest.MockedClass<typeof UserService>).prototype.getUserById = mockGetUserById;
      mockRequest.params = { userId: '999' };

      userController = new UserController();
      userController.getUserById(mockRequest as Request, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockJson).toHaveBeenCalledWith({ error: 'User not found' });
    });

    it('should return 400 for invalid user ID', () => {
      mockRequest.params = { userId: 'invalid' };

      userController = new UserController();
      userController.getUserById(mockRequest as Request, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({ error: 'Invalid user ID' });
    });

    it('should return 400 for non-numeric user ID', () => {
      mockRequest.params = { userId: 'abc' };

      userController = new UserController();
      userController.getUserById(mockRequest as Request, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({ error: 'Invalid user ID' });
    });

    it('should handle errors and return 500 status', () => {
      const mockGetUserById = jest.fn().mockImplementation(() => {
        throw new Error('Database error');
      });
      (UserService as jest.MockedClass<typeof UserService>).prototype.getUserById = mockGetUserById;
      mockRequest.params = { userId: '1' };

      userController = new UserController();
      userController.getUserById(mockRequest as Request, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({ error: 'Failed to retrieve user' });
    });

    it('should parse user ID correctly', () => {
      const mockGetUserById = jest.fn().mockReturnValue(mockUsers[1]);
      (UserService as jest.MockedClass<typeof UserService>).prototype.getUserById = mockGetUserById;
      mockRequest.params = { userId: '2' };

      userController = new UserController();
      userController.getUserById(mockRequest as Request, mockResponse as Response);

      expect(mockGetUserById).toHaveBeenCalledWith(2);
    });

    it('should return user with all properties', () => {
      const mockGetUserById = jest.fn().mockReturnValue(mockUsers[0]);
      (UserService as jest.MockedClass<typeof UserService>).prototype.getUserById = mockGetUserById;
      mockRequest.params = { userId: '1' };

      userController = new UserController();
      userController.getUserById(mockRequest as Request, mockResponse as Response);

      const returnedUser = mockJson.mock.calls[0][0];
      expect(returnedUser).toHaveProperty('id');
      expect(returnedUser).toHaveProperty('name');
      expect(returnedUser).toHaveProperty('phone');
      expect(returnedUser).toHaveProperty('avatar');
      expect(returnedUser).toHaveProperty('bio');
      expect(returnedUser).toHaveProperty('address');
      expect(returnedUser).toHaveProperty('company');
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
