'use client';

import { useDepositStore } from '@/lib/store';
import { useEffect } from 'react';

function Balance() {
  const { fetchDeposits, deposit } = useDepositStore();

  useEffect(() => {
    if (deposit.length == 0) {
      fetchDeposits();
    }
  }, [fetchDeposits, deposit]);

  return (
    <div>
      <span>
        Balance:{' '}
        {Array.isArray(deposit) &&
          deposit
            .reduce((total, deposit) => total + deposit.amount, 0)
            .toFixed(2)}
      </span>
    </div>
  );
}

export default Balance;
