"use client";

import { useState } from 'react';

export default function TestPage() {
  const [result, setResult] = useState<string>('');

  const testAuth = async () => {
    try {
      // Simulate auth test
      console.log('Testing demo authentication...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      setResult('Demo authentication test successful!');
    } catch (error) {
      setResult(`Demo authentication test failed: ${error}`);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Test Page</h1>
      
      <div className="space-y-4">
        <button
          onClick={testAuth}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Test Demo Authentication
        </button>
        
        {result && (
          <div className="mt-4 p-4 bg-gray-100 rounded-md">
            <p><strong>Result:</strong> {result}</p>
          </div>
        )}
      </div>
    </div>
  );
}

