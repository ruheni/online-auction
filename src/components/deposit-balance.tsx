'use client';

import { useDepositStore } from '@/lib/store';
import { useEffect } from 'react';

function Balance() {
  const { fetchDeposits, deposit, balance } = useDepositStore();

  useEffect(() => {
    if (deposit.length == 0) {
      fetchDeposits();
    }
  }, [fetchDeposits, deposit]);

  return (
    <div>
      <span>Balance: {balance}</span>
    </div>
  );
}

export default Balance;
