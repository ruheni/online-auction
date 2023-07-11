import { CreateItemForm } from '@/app/create-item/form';
import Modal from '@/components/modal';
import { DialogDescription, DialogTitle } from '@/components/ui/dialog';

export default function CreateItemModal() {
  return (
    <Modal>
      <DialogTitle>Create Item</DialogTitle>
      <DialogDescription asChild>
        <CreateItemForm />
      </DialogDescription>
    </Modal>
  );
}
