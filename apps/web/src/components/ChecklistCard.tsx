"use client";
import { useAuth } from "@boomerang/core";
import { useRouter } from "next/navigation";

export default function ChecklistCard() {
  const { userProfile } = useAuth();
  const router = useRouter();

  const checklistItems = [
    {
      id: "profile",
      title: "Complete your profile",
      description: "Add your specialties and practice details",
      completed: !!userProfile?.onboardingComplete,
      action: () => router.push("/onboarding/practitioner"),
    },
    {
      id: "connections",
      title: "Connect with colleagues",
      description: "Build your trusted network",
      completed: (userProfile?.connectionsCount || 0) > 0,
      action: () => router.push("/network/invite"),
    },
    {
      id: "referrals",
      title: "Send your first referral",
      description: "Start helping patients find care",
      completed: false, // TODO: Track referral count
      action: () => router.push("/dashboard"),
    },
  ];

  const completedCount = checklistItems.filter(item => item.completed).length;
  const progress = (completedCount / checklistItems.length) * 100;

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-ink">Getting Started</h3>
        <p className="text-sm text-muted">Complete these steps to get the most out of BoomerangConnect</p>
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-muted mb-2">
          <span>{completedCount} of {checklistItems.length} completed</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-brand h-2 rounded-full transition-all duration-300" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Checklist items */}
      <div className="space-y-3">
        {checklistItems.map((item) => (
          <div
            key={item.id}
            className={`flex items-center gap-3 p-3 rounded-lg border transition-colors cursor-pointer ${
              item.completed 
                ? "bg-green-50 border-green-200" 
                : "bg-page border-border hover:bg-gray-50"
            }`}
            onClick={item.action}
          >
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              item.completed 
                ? "bg-green-500 border-green-500" 
                : "border-gray-300"
            }`}>
              {item.completed && (
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <div className="flex-1">
              <div className={`font-medium ${
                item.completed ? "text-green-800" : "text-ink"
              }`}>
                {item.title}
              </div>
              <div className="text-sm text-muted">{item.description}</div>
            </div>
            {!item.completed && (
              <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
