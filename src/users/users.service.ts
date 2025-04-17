/* eslint-disable @typescript-eslint/require-await */
// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 'a1b2c3d4-1234-5678-9012-abcdef123456', // UUID format
      name: 'Admin User',
      role: 'admin',
    },
    {
      id: 'b2c3d4e5-2345-6789-0123-bcdef123456a', // UUID format
      name: 'Regular User',
      role: 'user',
    },
  ];

  async findById(userId: string): Promise<User | undefined> {
    return this.users.find((user) => user.id === userId);
  }

  async exists(userId: string): Promise<boolean> {
    return this.users.some((user) => user.id === userId);
  }
}
