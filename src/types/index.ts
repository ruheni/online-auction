export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  deposits: Deposit[];
}

export interface Deposit {
  id: number;
  amount: number;
  createdAt: Date;
  userId: number;
  user: User;
}
