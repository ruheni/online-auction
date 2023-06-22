// When encountering conflicts with TypeScript types, it is recommended to utilize the type models declared in the schema.prisma file.
import { Item } from '@prisma/client';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  deposits?: Deposit[];
  items?: Item[];
}

export interface Deposit {
  id: number;
  amount: number;
  createdAt: Date;
  userId: number;
  user: User;
}

export interface Auction {
  id: number;
  itemId: number;
  item: Item;
  biddingOpen: boolean;
  createdAt: Date;
  currentPrice?: number;
  endTime?: Date;
}
