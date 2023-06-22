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

/**
 * Formats the given time in seconds into a human-readable format with units (days, hours, minutes, seconds).
 *
 * @param time - The time in seconds.
 * @returns The formatted time string.
 */
export const formatTime = (time: number): string => {
  const timeUnits = [
    { label: 'days', seconds: 24 * 60 * 60 },
    { label: 'hours', seconds: 60 * 60 },
    { label: 'minutes', seconds: 60 },
    { label: 'seconds', seconds: 1 },
  ];

  let formattedTime = '';

  for (const unit of timeUnits) {
    if (time >= unit.seconds) {
      const unitValue = Math.floor(time / unit.seconds);
      time %= unit.seconds;

      formattedTime += `${unitValue}${unit.label.slice(0, 1)}:`;
    }
  }

  return formattedTime.slice(0, -1);
};

/**
 * Calculates the remaining time in seconds between the current time and the provided end time.
 * If the remaining time is less than or equal to zero, it clears the interval and returns zero.
 *
 * @param endTime - The end time of the countdown.
 * @param intervalRef - A mutable ref object holding the interval reference.
 * @returns The remaining time in seconds.
 */
export function calculateRemainingTime<T extends NodeJS.Timeout>(
  endTime: Date,
  intervalRef: React.MutableRefObject<T | null>
): number {
  // Calculate the current timestamp in seconds
  const now: number = Math.floor(Date.now() / 1000);

  // Convert the end timestamp to seconds
  const endTimestamp: number = Math.floor(endTime.getTime() / 1000);

  // Calculate the remaining time in seconds
  const remaining: number = endTimestamp - now;

  // If remaining time is less than or equal to zero, clear the interval and return zero
  if (remaining <= 0) {
    // Maybe call the API to update the auction to completed here?
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return 0;
  }

  return remaining;
}
