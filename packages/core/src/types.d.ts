import { z } from 'zod';
export declare const ProviderSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    specialty: z.ZodString;
    rating: z.ZodNumber;
    imageUrl: z.ZodOptional<z.ZodString>;
    isVerified: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    specialty: string;
    rating: number;
    isVerified: boolean;
    imageUrl?: string | undefined;
}, {
    id: string;
    name: string;
    specialty: string;
    rating: number;
    imageUrl?: string | undefined;
    isVerified?: boolean | undefined;
}>;
export type Provider = z.infer<typeof ProviderSchema>;
export declare const ReferralLoopSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    progress: z.ZodNumber;
    daysLeft: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    progress: number;
    daysLeft: number;
}, {
    id: string;
    name: string;
    progress: number;
    daysLeft: number;
}>;
export type ReferralLoop = z.infer<typeof ReferralLoopSchema>;
export declare const TrustPointTierSchema: z.ZodEnum<["Bronze", "Silver", "Gold", "Platinum"]>;
export type TrustPointTier = z.infer<typeof TrustPointTierSchema>;
export declare const UserSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
    specialty: z.ZodOptional<z.ZodString>;
    imageUrl: z.ZodOptional<z.ZodString>;
    trustPoints: z.ZodNumber;
    trustTier: z.ZodEnum<["Bronze", "Silver", "Gold", "Platinum"]>;
    isVerified: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    isVerified: boolean;
    email: string;
    trustPoints: number;
    trustTier: "Bronze" | "Silver" | "Gold" | "Platinum";
    specialty?: string | undefined;
    imageUrl?: string | undefined;
}, {
    id: string;
    name: string;
    email: string;
    trustPoints: number;
    trustTier: "Bronze" | "Silver" | "Gold" | "Platinum";
    specialty?: string | undefined;
    imageUrl?: string | undefined;
    isVerified?: boolean | undefined;
}>;
export type User = z.infer<typeof UserSchema>;
export declare const ActivityTypeSchema: z.ZodEnum<["connection_request", "referral_completed", "referral_started", "message_received", "trust_points_earned"]>;
export type ActivityType = z.infer<typeof ActivityTypeSchema>;
export declare const ActivitySchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodEnum<["connection_request", "referral_completed", "referral_started", "message_received", "trust_points_earned"]>;
    title: z.ZodString;
    description: z.ZodString;
    timestamp: z.ZodDate;
    relatedUserId: z.ZodOptional<z.ZodString>;
    relatedReferralId: z.ZodOptional<z.ZodString>;
    read: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: "connection_request" | "referral_completed" | "referral_started" | "message_received" | "trust_points_earned";
    title: string;
    description: string;
    timestamp: Date;
    read: boolean;
    relatedUserId?: string | undefined;
    relatedReferralId?: string | undefined;
}, {
    id: string;
    type: "connection_request" | "referral_completed" | "referral_started" | "message_received" | "trust_points_earned";
    title: string;
    description: string;
    timestamp: Date;
    relatedUserId?: string | undefined;
    relatedReferralId?: string | undefined;
    read?: boolean | undefined;
}>;
export type Activity = z.infer<typeof ActivitySchema>;
//# sourceMappingURL=types.d.ts.map