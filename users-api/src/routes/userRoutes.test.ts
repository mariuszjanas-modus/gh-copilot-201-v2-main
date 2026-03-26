import request from 'supertest';
import app from '../app';
import { User } from '../types/User';

describe('Users API Integration Tests', () => {
  describe('GET /api/users', () => {
    it('should return 200 status code', async () => {
      const response = await request(app).get('/api/users');
      expect(response.status).toBe(200);
    });

    it('should return an array of users', async () => {
      const response = await request(app).get('/api/users');
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should return the correct number of users', async () => {
      const response = await request(app).get('/api/users');
      expect(response.body).toHaveLength(10);
    });

    it('should return users with the correct interface', async () => {
      const response = await request(app).get('/api/users');
      const users: User[] = response.body;

      users.forEach((user) => {
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
        
        expect(typeof user.id).toBe('number');
        expect(typeof user.name).toBe('string');
        expect(typeof user.username).toBe('string');
        expect(typeof user.email).toBe('string');
        expect(typeof user.role).toBe('string');
        expect(typeof user.phone).toBe('string');
        expect(typeof user.avatar).toBe('string');
        expect(typeof user.bio).toBe('string');
        expect(typeof user.address).toBe('object');
        expect(typeof user.company).toBe('object');
      });
    });

    it('should return users with valid email format', async () => {
      const response = await request(app).get('/api/users');
      const users: User[] = response.body;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      users.forEach((user) => {
        expect(emailRegex.test(user.email)).toBe(true);
      });
    });

    it('should return users with valid roles', async () => {
      const response = await request(app).get('/api/users');
      const users: User[] = response.body;
      const validRoles = ['admin', 'user', 'moderator'];

      users.forEach((user) => {
        expect(validRoles).toContain(user.role);
      });
    });

    it('should return JSON content type', async () => {
      const response = await request(app).get('/api/users');
      expect(response.headers['content-type']).toMatch(/json/);
    });

    it('should return consistent data on multiple requests', async () => {
      const response1 = await request(app).get('/api/users');
      const response2 = await request(app).get('/api/users');
      
      expect(response1.body).toEqual(response2.body);
    });
  });

  describe('GET /api/users/:userId', () => {
    it('should return 200 status code for valid user ID', async () => {
      const response = await request(app).get('/api/users/1');
      expect(response.status).toBe(200);
    });

    it('should return a single user object', async () => {
      const response = await request(app).get('/api/users/1');
      expect(response.body).toHaveProperty('id');
      expect(response.body.id).toBe(1);
    });

    it('should return user with all properties', async () => {
      const response = await request(app).get('/api/users/1');
      const user: User = response.body;

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

      expect(typeof user.id).toBe('number');
      expect(typeof user.name).toBe('string');
      expect(typeof user.phone).toBe('string');
      expect(typeof user.avatar).toBe('string');
      expect(typeof user.bio).toBe('string');
      expect(typeof user.address).toBe('object');
      expect(typeof user.company).toBe('object');
    });

    it('should return correct user for different IDs', async () => {
      const response1 = await request(app).get('/api/users/1');
      const response2 = await request(app).get('/api/users/2');

      expect(response1.body.id).toBe(1);
      expect(response2.body.id).toBe(2);
      expect(response1.body.name).not.toBe(response2.body.name);
    });

    it('should return 404 for non-existent user ID', async () => {
      const response = await request(app).get('/api/users/999');
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('User not found');
    });

    it('should return 400 for invalid user ID', async () => {
      const response = await request(app).get('/api/users/invalid');
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Invalid user ID');
    });

    it('should return JSON content type', async () => {
      const response = await request(app).get('/api/users/1');
      expect(response.headers['content-type']).toMatch(/json/);
    });

    it('should return user with valid address structure', async () => {
      const response = await request(app).get('/api/users/1');
      const user: User = response.body;

      expect(user.address).toHaveProperty('street');
      expect(user.address).toHaveProperty('city');
      expect(user.address).toHaveProperty('state');
      expect(user.address).toHaveProperty('zipCode');
      expect(user.address).toHaveProperty('country');
    });

    it('should return user with valid company structure', async () => {
      const response = await request(app).get('/api/users/1');
      const user: User = response.body;

      expect(user.company).toHaveProperty('name');
      expect(user.company).toHaveProperty('position');
      expect(user.company).toHaveProperty('department');
    });

    it('should return user with valid email format', async () => {
      const response = await request(app).get('/api/users/1');
      const user: User = response.body;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      expect(emailRegex.test(user.email)).toBe(true);
    });

    it('should return consistent data on multiple requests', async () => {
      const response1 = await request(app).get('/api/users/1');
      const response2 = await request(app).get('/api/users/1');
      
      expect(response1.body).toEqual(response2.body);
    });
  });

  describe('CORS Configuration', () => {
    it('should have CORS headers configured', async () => {
      const response = await request(app)
        .get('/api/users')
        .set('Origin', 'http://localhost:3001');
      
      expect(response.headers['access-control-allow-origin']).toBe('http://localhost:3001');
    });
  });

  describe('Error Handling', () => {
    it('should return 404 for non-existent routes', async () => {
      const response = await request(app).get('/api/nonexistent');
      expect(response.status).toBe(404);
    });
  });
});
