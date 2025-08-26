'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      // Simulate sign out
      console.log('Signing out...');
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

  // Demo user profile
  const userProfile = {
    displayName: "Demo User",
    email: "demo@example.com",
    phoneNumber: "+1 (555) 123-4567",
    specialty: "Chiropractic",
    clinic: "Demo Clinic",
    trustPoints: 150
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {userProfile.displayName}!
              </h1>
              <p className="text-gray-600 mt-1">
                Here&apos;s what&apos;s happening with your network today.
              </p>
            </div>
            <button
              onClick={handleSignOut}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Sign out
            </button>
          </div>

          {/* Trust Points Display */}
          <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Trust Points</h2>
                <p className="text-blue-100">Your reputation in the network</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{userProfile.trustPoints}</div>
                <div className="text-blue-100 text-sm">points</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Practitioner Carousel */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Practitioners</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {demoPractitioners.slice(0, 3).map((practitioner) => (
                  <div key={practitioner.id} className="rounded-lg border border-gray-200 p-4">
                    <h4 className="font-medium text-gray-900">{practitioner.name}</h4>
                    <p className="text-sm text-gray-600">{practitioner.specialty}</p>
                    <p className="text-sm text-gray-500">{practitioner.clinic}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <div className="text-2xl font-bold text-gray-900">0</div>
                <div className="text-sm text-gray-600">Connections</div>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <div className="text-2xl font-bold text-gray-900">0</div>
                <div className="text-sm text-gray-600">Referrals Sent</div>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-6">
                <div className="text-2xl font-bold text-gray-900">0</div>
                <div className="text-sm text-gray-600">Referrals Received</div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="text-center py-8">
                <div className="text-gray-600 mb-2">No recent activity</div>
                <p className="text-sm text-gray-500">Start by connecting with colleagues or sending referrals!</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Summary */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Summary</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-sm text-gray-600">Name</div>
                  <div className="font-medium text-gray-900">{userProfile.displayName}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Email</div>
                  <div className="font-medium text-gray-900">{userProfile.email}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Phone</div>
                  <div className="font-medium text-gray-900">{userProfile.phoneNumber}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Specialty</div>
                  <div className="font-medium text-gray-900">{userProfile.specialty}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Clinic</div>
                  <div className="font-medium text-gray-900">{userProfile.clinic}</div>
                </div>
              </div>
              <button
                onClick={() => router.push('/onboarding/practitioner')}
                className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
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




