import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  getUsers = (req: Request, res: Response): void => {
    try {
      const users = this.userService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve users' });
    }
  };

  getUserById = (req: Request, res: Response): void => {
    try {
      const userIdParam = req.params.userId;
      const userId = parseInt(Array.isArray(userIdParam) ? userIdParam[0] : userIdParam, 10);
      
      if (isNaN(userId)) {
        res.status(400).json({ error: 'Invalid user ID' });
        return;
      }

      const user = this.userService.getUserById(userId);
      
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve user' });
    }
  };
}
