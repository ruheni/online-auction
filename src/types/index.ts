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

export interface Item {
  id: number;
  name: string;
  startingPrice: number;
  timeWindow: number;
  state: ItemState;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: User;
  createdById?: number;
  publishedAt?: Date;
  auctions?: Auction[];
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

enum ItemState {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
}
