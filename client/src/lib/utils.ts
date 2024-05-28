import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatViews(num: string | number): string {
  // Convert number to string if necessary
  if (typeof num === 'number') {
    num = num.toString();
  }

  // Use a regular expression to insert commas
  let withCommas = num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return withCommas;
}
