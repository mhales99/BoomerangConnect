"use client";

import { useRouter } from "next/navigation";

export default function ChecklistCard() {
  const router = useRouter();

  // Demo checklist items
  const checklistItems = [
    {
      id: 1,
      title: "Complete your profile",
      description: "Add your specialty, clinic, and contact information",
      completed: true,
      action: () => router.push('/onboarding/practitioner')
    },
    {
      id: 2,
      title: "Connect with colleagues",
      description: "Start building your professional network",
      completed: false,
      action: () => router.push('/connections')
    },
    {
      id: 3,
      title: "Send your first referral",
      description: "Help patients find the right care",
      completed: false,
      action: () => router.push('/referrals/send')
    }
  ];

  const completedCount = checklistItems.filter(item => item.completed).length;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Getting Started</h3>
        <span className="text-sm text-gray-600">{completedCount}/{checklistItems.length}</span>
      </div>
      
      <div className="space-y-3">
        {checklistItems.map((item) => (
          <div key={item.id} className="flex items-start space-x-3">
            <div className={`mt-1 h-4 w-4 rounded-full border-2 flex-shrink-0 ${
              item.completed 
                ? 'bg-blue-600 border-blue-600' 
                : 'border-gray-300'
            }`}>
              {item.completed && (
                <svg className="h-2 w-2 text-white mx-auto mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <button
                onClick={item.action}
                className={`text-left w-full ${
                  item.completed ? 'text-gray-500' : 'text-gray-900 hover:text-blue-600'
                }`}
              >
                <div className={`font-medium ${item.completed ? 'line-through' : ''}`}>
                  {item.title}
                </div>
                <div className="text-sm text-gray-600">
                  {item.description}
                </div>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
