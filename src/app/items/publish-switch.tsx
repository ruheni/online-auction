'use client';

import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { Item } from '@/types';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';

interface Props {
  item: Item;
}

const PublishSwitch: FC<Props> = ({ item }) => {
  const { toast } = useToast();
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const handlePublish = async (checked: boolean) => {
    setChecked(checked);

    try {
      const res = await fetch('/api/auction', {
        method: 'POST',
        body: JSON.stringify({
          itemId: item.id,
          timeWindow: item.timeWindow,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem with your request.',
        });
        return;
      }

      toast({
        title: 'Success!',
        description: 'Publish item successful',
        variant: 'success',
      });

      setChecked(false);

      router.refresh();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
      });
    }
  };
  return (
    <>
      <Switch onCheckedChange={handlePublish} checked={checked || false} />
      <Label className='pl-2'>Publish</Label>
    </>
  );
};

export default PublishSwitch;
