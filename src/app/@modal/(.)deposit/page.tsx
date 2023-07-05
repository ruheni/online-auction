import { DepositForm } from '@/app/deposit/form';
import Modal from '@/components/modal';

export default function DepositModal() {
  return (
    <Modal>
      <div className='flex h-screen flex-col items-center  justify-center '>
        <div className='w-full max-w-lg rounded-lg bg-white p-6 shadow-md'>
          <DepositForm />
        </div>
      </div>
    </Modal>
  );
}
