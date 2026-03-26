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
}
