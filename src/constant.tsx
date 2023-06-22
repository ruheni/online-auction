import { CheckCircle, HelpCircle } from 'lucide-react';

export const statuses = [
  {
    value: true,
    label: 'On Going',
    icon: HelpCircle,
  },
  {
    value: false,
    label: 'Completed',
    icon: CheckCircle,
    color: 'text-green-700',
  },
];
