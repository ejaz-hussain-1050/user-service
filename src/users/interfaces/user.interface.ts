// src/users/interfaces/user.interface.ts
export interface User {
  id: string;
  name: string;
  role: 'admin' | 'user';
}
