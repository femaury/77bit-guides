import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Calculate estimated reading time for text content
 * @param content Text content to calculate reading time for
 * @param wordsPerMinute Average reading speed (default: 200)
 * @returns Estimated reading time in minutes
 */
export function calculateReadingTime(content: string, wordsPerMinute = 200): number {
  if (!content) return 0;
  
  // Count words by splitting on whitespace
  const textOnly = content.replace(/<\/?[^>]+(>|$)/g, ''); // Remove HTML tags if any
  const wordCount = textOnly.split(/\s+/).length;
  
  // Calculate reading time in minutes
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  
  // Return at least 1 minute
  return Math.max(1, readingTime);
} 