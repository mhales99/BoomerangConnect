#!/bin/bash

echo "🚀 Starting Boomerang Monorepo Development"
echo "=========================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
  echo "❌ Error: package.json not found. Make sure you're in the monorepo root."
  exit 1
fi

echo "✅ Found monorepo root"

# Check if .env.local exists for web app
if [ ! -f "apps/web/.env.local" ]; then
  echo "⚠️  Warning: apps/web/.env.local not found"
  echo "   Run: cp apps/web/.env.example apps/web/.env.local"
  echo "   Then edit with your Firebase configuration"
  echo ""
fi

echo "🌐 Starting web development server..."
echo "   URL: http://localhost:3000"
echo ""

# Start the web development server
npm run dev:web
