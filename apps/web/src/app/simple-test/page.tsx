"use client";

import { useState } from 'react';

export default function SimpleTestPage() {
  const [result, setResult] = useState<string>('');

  const testAuthService = async () => {
    try {
      // Simulate auth service test
      console.log('Testing demo auth service...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      setResult('Demo auth service test successful!');
    } catch (error) {
      setResult(`Demo auth service test failed: ${error}`);
    }
  };

  const testFirebaseAuth = async () => {
    try {
      // Simulate Firebase auth test
      console.log('Testing demo Firebase auth...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      setResult('Demo Firebase auth test successful!');
    } catch (error) {
      setResult(`Demo Firebase auth test failed: ${error}`);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Simple Test Page</h1>
      
      <div className="space-y-4">
        <button
          onClick={testAuthService}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 mr-4"
        >
          Test Demo Auth Service
        </button>
        
        <button
          onClick={testFirebaseAuth}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Test Demo Firebase Auth
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

