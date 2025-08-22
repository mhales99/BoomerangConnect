'use client';

import React from 'react';
import { useAuth } from '@boomerang/core';
import { useRouter } from 'next/navigation';
import ChecklistCard from '@/components/ChecklistCard';
import PractitionerCarousel from '@/components/PractitionerCarousel';

export default function DashboardPage() {
  const { userProfile, signOut, user } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/login');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  // Demo data for practitioner carousel
  const demoPractitioners = [
    { 
      id: "1", 
      name: "Dr. Taylor Chen", 
      specialty: "Chiropractic", 
      clinic: "Harbor Health" 
    },
    { 
      id: "2", 
      name: "Alex Morgan, RMT", 
      specialty: "Massage Therapy", 
      clinic: "Westside Wellness" 
    },
    { 
      id: "3", 
      name: "Dr. Sarah Kim", 
      specialty: "Physiotherapy", 
      clinic: "Downtown Rehab" 
    },
    { 
      id: "4", 
      name: "Mike Johnson, DC", 
      specialty: "Chiropractic", 
      clinic: "North Shore Health" 
    },
    { 
      id: "5", 
      name: "Dr. Lisa Park", 
      specialty: "Acupuncture", 
      clinic: "Eastside Wellness" 
    },
  ];

  if (!userProfile) {
    return (
      <main className="min-h-screen bg-page flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand mx-auto mb-4"></div>
          <p className="text-muted">Loading your dashboard...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-page">
      <div className="mx-auto max-w-6xl px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
                              <h1 className="text-3xl font-bold text-ink">
                  Welcome back, {userProfile.displayName || user?.email?.split('@')[0]}!
                </h1>
                              <p className="text-muted mt-1">
                  Here&apos;s what&apos;s happening with your network today.
                </p>
            </div>
            <button
              onClick={handleSignOut}
              className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-ink hover:bg-gray-50 transition-colors"
            >
              Sign out
            </button>
          </div>

          {/* Trust Points Display */}
          <div className="rounded-2xl bg-gradient-to-r from-brand to-brand-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Trust Points</h2>
                <p className="text-brand-100">Your reputation in the network</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{userProfile.trustPoints || 0}</div>
                <div className="text-brand-100 text-sm">points</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Practitioner Carousel */}
            <PractitionerCarousel items={demoPractitioners} />

            {/* Quick Stats */}
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="text-2xl font-bold text-ink">0</div>
                <div className="text-sm text-muted">Connections</div>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="text-2xl font-bold text-ink">0</div>
                <div className="text-sm text-muted">Referrals Sent</div>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="text-2xl font-bold text-ink">0</div>
                <div className="text-sm text-muted">Referrals Received</div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-ink mb-4">Recent Activity</h3>
              <div className="text-center py-8">
                <div className="text-muted mb-2">No recent activity</div>
                <p className="text-sm text-muted">Start by connecting with colleagues or sending referrals!</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Checklist Card */}
            <ChecklistCard />

            {/* Profile Summary */}
            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold text-ink mb-4">Profile Summary</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-muted">Name</div>
                  <div className="font-medium text-ink">{userProfile.displayName || 'Not set'}</div>
                </div>
                <div>
                  <div className="text-sm text-muted">Email</div>
                  <div className="font-medium text-ink">{userProfile.email}</div>
                </div>
                                 <div>
                   <div className="text-sm text-muted">Phone</div>
                   <div className="font-medium text-ink">{userProfile.phoneNumber || 'Not set'}</div>
                 </div>
                 <div>
                   <div className="text-sm text-muted">Specialty</div>
                   <div className="font-medium text-ink">
                     {userProfile.specialties?.join(', ') || userProfile.specialty || 'Not set'}
                   </div>
                 </div>
                 <div>
                   <div className="text-sm text-muted">Clinic</div>
                   <div className="font-medium text-ink">{userProfile.clinic || 'Not set'}</div>
                 </div>
              </div>
              <button
                onClick={() => router.push('/onboarding/practitioner')}
                className="mt-4 w-full rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-600 transition-colors"
              >
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}




