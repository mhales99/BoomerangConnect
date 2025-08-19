#!/bin/bash

echo "🧪 Testing Boomerang Monorepo Setup"
echo "=================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
  echo "❌ Error: package.json not found. Make sure you're in the monorepo root."
  exit 1
fi

echo "✅ Found monorepo root"

# Check if all directories exist
echo "📁 Checking directory structure..."
directories=("apps/web" "apps/mobile" "packages/core" "packages/ui")

for dir in "${directories[@]}"; do
  if [ -d "$dir" ]; then
    echo "✅ $dir exists"
  else
    echo "❌ $dir missing"
    exit 1
  fi
done

# Check if package.json files exist in each workspace
echo "📦 Checking package.json files..."
workspaces=("apps/web/package.json" "apps/mobile/package.json" "packages/core/package.json" "packages/ui/package.json")

for pkg in "${workspaces[@]}"; do
  if [ -f "$pkg" ]; then
    echo "✅ $pkg exists"
  else
    echo "❌ $pkg missing"
    exit 1
  fi
done

# Check if TypeScript configs exist
echo "⚙️  Checking TypeScript configurations..."
tsconfigs=("tsconfig.base.json" "apps/web/tsconfig.json" "apps/mobile/tsconfig.json" "packages/core/tsconfig.json" "packages/ui/tsconfig.json")

for tsconfig in "${tsconfigs[@]}"; do
  if [ -f "$tsconfig" ]; then
    echo "✅ $tsconfig exists"
  else
    echo "❌ $tsconfig missing"
    exit 1
  fi
done

# Check if Next.js app structure exists
echo "🌐 Checking Next.js app structure..."
nextjs_files=("apps/web/next.config.js" "apps/web/src/app/layout.tsx" "apps/web/src/app/page.tsx" "apps/web/.env.example")

for file in "${nextjs_files[@]}"; do
  if [ -f "$file" ]; then
    echo "✅ $file exists"
  else
    echo "❌ $file missing"
    exit 1
  fi
done

# Check if Expo app structure exists
echo "📱 Checking Expo app structure..."
expo_files=("apps/mobile/app.json" "apps/mobile/app/_layout.tsx" "apps/mobile/app/(tabs)/_layout.tsx" "apps/mobile/app/(tabs)/index.tsx")

for file in "${expo_files[@]}"; do
  if [ -f "$file" ]; then
    echo "✅ $file exists"
  else
    echo "❌ $file missing"
    exit 1
  fi
done

# Check if shared packages have source files
echo "📚 Checking shared packages..."
core_files=("packages/core/src/index.ts" "packages/core/src/theme.ts" "packages/core/src/types.ts" "packages/core/src/utils.ts")
ui_files=("packages/ui/src/index.ts" "packages/ui/src/components/Text.tsx" "packages/ui/src/components/Button.tsx" "packages/ui/src/components/Stack.tsx" "packages/ui/src/components/Card.tsx")

for file in "${core_files[@]}"; do
  if [ -f "$file" ]; then
    echo "✅ $file exists"
  else
    echo "❌ $file missing"
    exit 1
  fi
done

for file in "${ui_files[@]}"; do
  if [ -f "$file" ]; then
    echo "✅ $file exists"
  else
    echo "❌ $file missing"
    exit 1
  fi
done

echo ""
echo "🎉 All checks passed! Monorepo structure is complete."
echo ""
echo "Next steps:"
echo "1. Run 'npm install' to install dependencies"
echo "2. Copy 'apps/web/.env.example' to 'apps/web/.env.local' and fill in Firebase values"
echo "3. Run 'npm run dev' to start both web and mobile development servers"
echo ""
echo "📖 For more information, see README.md"
