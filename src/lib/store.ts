import { Deposit, User } from '@prisma/client';
import { create } from 'zustand';

interface DepositState {
  deposit: Deposit[];
  addToDeposits: (deposit: { amount: string }) => Promise<Response>;
  fetchDeposits: () => void;
}

export const useDepositStore = create<DepositState>()((set) => ({
  deposit: [],
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

    return res;
  },
  fetchDeposits: async () => {
    const res = await fetch('/api/deposit');

    const response: { success: boolean; deposits: Deposit[] } =
      await res.json();

    set({ deposit: response.deposits });
  },
}));
