"use client";

import { useState } from "react";

export default function SimpleTestPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");

  const testAuth = async () => {
    try {
      setResult("Testing authentication...");
      
      // Test if we can import the auth service
      const { AuthService } = await import("@boomerang/core");
      setResult("AuthService imported successfully");
      
      // Test if we can access Firebase
      const { auth } = await import("@boomerang/core");
      setResult("Firebase auth accessed successfully");
      
      // Test sign up
      const user = await AuthService.signUp(email, password, "Test User");
      setResult(`Sign up successful: ${user.email}`);
      
    } catch (error: any) {
      console.error("Test error:", error);
      setResult(`Error: ${error.message}`);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Simple Auth Test</h1>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="test@example.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="password123"
          />
        </div>

        <button
          onClick={testAuth}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Test Authentication
        </button>

        {result && (
          <div className="p-4 bg-gray-100 rounded-md">
            <strong>Result:</strong> {result}
          </div>
        )}
      </div>
    </div>
  );
}
