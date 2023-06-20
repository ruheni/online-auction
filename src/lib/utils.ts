import { ClassValue, clsx } from 'clsx';
import { DateTime } from 'luxon';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function computeTimestamp(timeDurationInSeconds: number): DateTime {
  const currentTimestamp = Math.floor(Date.now() / 1000); // Current timestamp in seconds
  const expirationTimestamp = currentTimestamp + timeDurationInSeconds;
  const expirationDateTime = DateTime.fromSeconds(expirationTimestamp);
  return expirationDateTime;
}
