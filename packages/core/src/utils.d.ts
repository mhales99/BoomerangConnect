import { TrustPointTier } from './types';
/**
 * Calculate trust tier based on trust points
 * @param points Trust points
 * @returns Trust tier
 */
export declare function calculateTrustTier(points: number): TrustPointTier;
/**
 * Calculate points needed for next tier
 * @param points Current trust points
 * @returns Points needed for next tier
 */
export declare function pointsToNextTier(points: number): number;
/**
 * Get tier color based on trust tier
 * @param tier Trust tier
 * @returns Color for the tier
 */
export declare function getTierColor(tier: TrustPointTier): string;
/**
 * Format date to relative time (e.g., "2 hours ago", "Yesterday", etc.)
 * @param date Date to format
 * @returns Formatted relative time string
 */
export declare function formatRelativeTime(date: Date): string;
//# sourceMappingURL=utils.d.ts.map