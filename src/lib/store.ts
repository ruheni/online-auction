import { Deposit, User } from '@prisma/client';
import { create } from 'zustand';

interface DepositState {
  deposit: Deposit[];
  // eslint-disable-next-line no-unused-vars
  addToDeposits: (_deposit: { amount: string }) => Promise<Response>;
  balance: string;
  fetchDeposits: () => void;
  // eslint-disable-next-line no-unused-vars
  deductBalance: (amount: string) => void;
}

export const useDepositStore = create<DepositState>()((set) => ({
  deposit: [],
  balance: '0',
  addToDeposits: async (deposit): Promise<Response> => {
    const res = await fetch('/api/deposit', {
      method: 'POST',
      body: JSON.stringify(deposit),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response: { user: User & { deposits: Deposit[] } } = await res.json();

    const depositData = response?.user?.deposits[0];

    set((state) => ({ deposit: [...state.deposit, depositData] }));

    set((state) => ({
      balance: [...state.deposit]
        .reduce((total, deposit) => total + deposit.amount, 0)
        .toFixed(2),
    }));

    return res;
  },
  fetchDeposits: async () => {
    const res = await fetch('/api/deposit');

    const response: { success: boolean; deposits: Deposit[] } =
      await res.json();

    set({ deposit: response.deposits });

    set((state) => ({
      balance: state.deposit
        .reduce((total, deposit) => total + deposit.amount, 0)
        .toFixed(2),
    }));
  },
  deductBalance: (amount) => {
    set((state) => ({
      balance: (parseFloat(state.balance) - parseFloat(amount)).toString(),
    }));
  },
}));
