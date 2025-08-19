import { z } from 'zod';

// Provider schema
export const ProviderSchema = z.object({
  id: z.string(),
  name: z.string(),
  specialty: z.string(),
  rating: z.number().min(0).max(5),
  imageUrl: z.string().url().optional(),
  isVerified: z.boolean().default(false),
});

export type Provider = z.infer<typeof ProviderSchema>;

// ReferralLoop schema
export const ReferralLoopSchema = z.object({
  id: z.string(),
  name: z.string(),
  progress: z.number().min(0).max(1),
  daysLeft: z.number().int().min(0),
});

export type ReferralLoop = z.infer<typeof ReferralLoopSchema>;

// TrustPointTier schema
export const TrustPointTierSchema = z.enum(['Bronze', 'Silver', 'Gold', 'Platinum']);

export type TrustPointTier = z.infer<typeof TrustPointTierSchema>;

// User schema
export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  specialty: z.string().optional(),
  imageUrl: z.string().url().optional(),
  trustPoints: z.number().int().min(0),
  trustTier: TrustPointTierSchema,
  isVerified: z.boolean().default(false),
});

export type User = z.infer<typeof UserSchema>;

// Activity schema
export const ActivityTypeSchema = z.enum([
  'connection_request',
  'referral_completed',
  'referral_started',
  'message_received',
  'trust_points_earned',
]);

export type ActivityType = z.infer<typeof ActivityTypeSchema>;

export const ActivitySchema = z.object({
  id: z.string(),
  type: ActivityTypeSchema,
  title: z.string(),
  description: z.string(),
  timestamp: z.date(),
  relatedUserId: z.string().optional(),
  relatedReferralId: z.string().optional(),
  read: z.boolean().default(false),
});

export type Activity = z.infer<typeof ActivitySchema>;
