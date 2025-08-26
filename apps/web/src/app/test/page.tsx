"use client";

import { useAuth } from "@boomerang/core";
import { useState } from "react";

export default function TestPage() {
  const { user, userProfile, loading, signIn, signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");

  const handleTestSignIn = async () => {
    try {
      setResult("Attempting sign in...");
      const user = await signIn(email, password);
      setResult(`Sign in successful: ${user.email}`);
    } catch (error: any) {
      setResult(`Sign in failed: ${error.message}`);
    }
  };

  const handleTestSignUp = async () => {
    try {
      setResult("Attempting sign up...");
      const user = await signUp(email, password, "Test User");
      setResult(`Sign up successful: ${user.email}`);
    } catch (error: any) {
      setResult(`Sign up failed: ${error.message}`);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Authentication Test</h1>
      
      <div className="mb-4">
        <p><strong>Loading:</strong> {loading ? "Yes" : "No"}</p>
        <p><strong>User:</strong> {user ? user.email : "None"}</p>
        <p><strong>Profile:</strong> {userProfile ? "Exists" : "None"}</p>
      </div>

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
            placeholder="password"
          />
        </div>

        <div className="space-x-2">
          <button
            onClick={handleTestSignIn}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Test Sign In
          </button>
          <button
            onClick={handleTestSignUp}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Test Sign Up
          </button>
        </div>

        {result && (
          <div className="p-4 bg-gray-100 rounded-md">
            <strong>Result:</strong> {result}
          </div>
        )}
      </div>
    </div>
  );
}

