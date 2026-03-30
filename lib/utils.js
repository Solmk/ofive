/**
 * lib/utils.js — Class-name utility
 *
 * cn() merges Tailwind classes safely:
 *   clsx   → handles conditional/array class inputs
 *   twMerge → deduplicates conflicting Tailwind utilities
 *              e.g. cn('text-red-500', 'text-blue-500') → 'text-blue-500'
 */

import { clsx }    from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
