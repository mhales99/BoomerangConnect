import { TrustPointTier } from './types';

/**
 * Calculate trust tier based on trust points
 * @param points Trust points
 * @returns Trust tier
 */
export function calculateTrustTier(points: number): TrustPointTier {
  if (points >= 1000) {
    return 'Platinum';
  } else if (points >= 750) {
    return 'Gold';
  } else if (points >= 500) {
    return 'Silver';
  } else {
    return 'Bronze';
  }
}

/**
 * Calculate points needed for next tier
 * @param points Current trust points
 * @returns Points needed for next tier
 */
export function pointsToNextTier(points: number): number {
  if (points >= 1000) {
    return 0; // Already at highest tier
  } else if (points >= 750) {
    return 1000 - points; // Points to Platinum
  } else if (points >= 500) {
    return 750 - points; // Points to Gold
  } else {
    return 500 - points; // Points to Silver
  }
}

/**
 * Get tier color based on trust tier
 * @param tier Trust tier
 * @returns Color for the tier
 */
export function getTierColor(tier: TrustPointTier): string {
  switch (tier) {
    case 'Platinum':
      return '#A7BDC8'; // Platinum color
    case 'Gold':
      return '#CBA258'; // Gold color
    case 'Silver':
      return '#A3ABA8'; // Silver color
    case 'Bronze':
      return '#CD7F32'; // Bronze color
    default:
      return '#CBA258'; // Default to gold
  }
}

/**
 * Format date to relative time (e.g., "2 hours ago", "Yesterday", etc.)
 * @param date Date to format
 * @returns Formatted relative time string
 */
export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return 'Just now';
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) {
    return 'Yesterday';
  }
  
  if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  }
  
  // For older dates, return the actual date
  return date.toLocaleDateString();
}
