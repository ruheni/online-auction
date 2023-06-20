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

export function isIntervalPastThreshold(
  createdAt: Date,
  thresholdSeconds: number
): boolean {
  const createdAtDateTime = DateTime.fromJSDate(createdAt);
  const currentDateTime = DateTime.now();
  const intervalSeconds = currentDateTime.diff(
    createdAtDateTime,
    'seconds'
  ).seconds;
  return intervalSeconds >= thresholdSeconds;
}
