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
        
        expect(typeof user.id).toBe('number');
        expect(typeof user.name).toBe('string');
        expect(typeof user.username).toBe('string');
        expect(typeof user.email).toBe('string');
        expect(typeof user.role).toBe('string');
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
