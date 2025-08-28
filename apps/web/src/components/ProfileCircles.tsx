'use client';

import React from 'react';
import Link from 'next/link';

// Jane-inspired color palette for profile rings
const janeColors = [
  'from-brand to-[#2ECAD4]',         // Teal gradient
  'from-[#FF8A5B] to-[#FF6B3D]',     // Coral gradient
  'from-[#9F7AEA] to-[#805AD5]',     // Purple gradient
  'from-[#38B2AC] to-[#319795]',     // Teal-green gradient
  'from-[#F6AD55] to-[#ED8936]',     // Orange gradient
  'from-[#4299E1] to-[#3182CE]',     // Blue gradient
  'from-[#68D391] to-[#48BB78]',     // Green gradient
];

// Mock data for recent referrals
const mockReferrals = [
  { id: '1', name: 'Dr. Chen', specialty: 'Cardiology', initials: 'JC' },
  { id: '2', name: 'Dr. Patel', specialty: 'Neurology', initials: 'SP' },
  { id: '3', name: 'Dr. Nguyen', specialty: 'Orthopedics', initials: 'TN' },
  { id: '4', name: 'Dr. Garcia', specialty: 'Pediatrics', initials: 'MG' },
  { id: '5', name: 'Dr. Kim', specialty: 'Dermatology', initials: 'SK' },
];

export default function ProfileCircles() {
  return (
    <div className="space-y-4">
      <h3 className="font-medium">Recent Referrals</h3>
      
      <div className="flex gap-4 overflow-x-auto pb-2">
        {mockReferrals.map((referral, index) => (
          <Link 
            href={`/network/profile/${referral.id}`} 
            key={referral.id}
            className="flex flex-col items-center gap-1 min-w-[72px]"
          >
            <div className={`rounded-full p-0.5 bg-gradient-to-br ${janeColors[index % janeColors.length]}`}>
              <div className="rounded-full bg-white p-0.5">
                <div className="h-14 w-14 rounded-full bg-gray-100 grid place-items-center text-lg font-medium">
                  {referral.initials}
                </div>
              </div>
            </div>
            <p className="text-xs text-center font-medium truncate w-full">{referral.name}</p>
            <p className="text-[10px] text-muted text-center truncate w-full">{referral.specialty}</p>
          </Link>
        ))}

        <Link 
          href="/network" 
          className="flex flex-col items-center gap-1 min-w-[72px]"
        >
          <div className="rounded-full p-0.5 bg-gradient-to-br from-gray-300 to-gray-400">
            <div className="rounded-full bg-white p-0.5">
              <div className="h-14 w-14 rounded-full bg-gray-100 grid place-items-center text-xl font-medium text-gray-400">
                +
              </div>
            </div>
          </div>
          <p className="text-xs text-center font-medium truncate w-full">View all</p>
          <p className="text-[10px] text-muted text-center truncate w-full">Network</p>
        </Link>
      </div>
    </div>
  );
}
