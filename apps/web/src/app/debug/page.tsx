"use client";

export default function DebugPage() {
  const envVars = {
    NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    NODE_ENV: process.env.NODE_ENV,
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Debug Information</h1>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-3">Environment Variables</h2>
          <div className="bg-gray-100 p-4 rounded-md">
            <pre className="text-sm overflow-auto">
              {JSON.stringify(envVars, null, 2)}
            </pre>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">Browser Information</h2>
          <div className="bg-gray-100 p-4 rounded-md">
            <p><strong>User Agent:</strong> {typeof window !== 'undefined' ? window.navigator.userAgent : 'Server-side'}</p>
            <p><strong>URL:</strong> {typeof window !== 'undefined' ? window.location.href : 'Server-side'}</p>
            <p><strong>Timestamp:</strong> {new Date().toISOString()}</p>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">Demo Test</h2>
          <div className="bg-gray-100 p-4 rounded-md">
            <button
              onClick={async () => {
                try {
                  console.log('Demo test successful!');
                  alert('Demo test successful! Check console for details.');
                } catch (error) {
                  console.error('Demo test error:', error);
                  alert(`Demo test error: ${error}`);
                }
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Test Demo Function
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

