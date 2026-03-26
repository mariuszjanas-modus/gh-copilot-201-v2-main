import { User } from '../types/User';
import * as fs from 'fs';
import * as path from 'path';

export class UserService {
  private usersFilePath: string;

  constructor() {
    this.usersFilePath = path.join(__dirname, '../../data/users.json');
  }

  getAllUsers(): User[] {
    try {
      const data = fs.readFileSync(this.usersFilePath, 'utf-8');
      return JSON.parse(data) as User[];
    } catch (error) {
      console.error('Error reading users file:', error);
      return [];
    }
  }

  getUserById(id: number): User | null {
    try {
      const users = this.getAllUsers();
      const user = users.find((user) => user.id === id);
      return user || null;
    } catch (error) {
      console.error('Error finding user:', error);
      return null;
    }
  }
}
