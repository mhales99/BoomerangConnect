# BoomerangConnect Monorepo Setup Guide

This guide will help you set up and run the BoomerangConnect monorepo project with web (Next.js) and mobile (Expo) applications.

## Prerequisites

- Node.js 18+ and npm installed
- Git installed
- GitHub account
- Vercel account (for web deployment)
- Firebase account
- Expo Go app (for mobile testing)

## 1. Project Structure

```
BoomerangConnect/
├── apps/
│   ├── web/              # Next.js 14 web application
│   └── mobile/           # Expo React Native mobile app
├── packages/
│   ├── core/             # Shared business logic & types
│   └── ui/               # Shared UI components
├── package.json          # Root workspace configuration
├── tsconfig.base.json    # Base TypeScript configuration
├── test-monorepo.sh      # Verification script
├── start-dev.sh          # Development startup script
└── [documentation files]
```

## 2. Initial Setup

### Step 1: Navigate to Project Directory
```bash
# Navigate to the monorepo root
cd "Boomerang Connect/Boomerang Cursor/BoomerangConnect"

# Verify you're in the right place
ls package.json
```

### Step 2: Install Dependencies
```bash
# Install all dependencies for the monorepo
npm install --legacy-peer-deps

# Verify installation
./test-monorepo.sh
```

### Step 3: Configure Environment Variables
```bash
# Copy environment template
cp apps/web/.env.example apps/web/.env.local

# Edit with your Firebase values
nano apps/web/.env.local
```

Add your Firebase configuration:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your_project-default-rtdb.firebaseio.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## 3. Firebase Setup

### Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Name your project: `BoomerangConnect`
4. Enable Google Analytics (recommended)
5. Click "Create project"

### Step 2: Get Firebase Configuration
1. In Firebase Console, click the web icon (</>) to add a web app
2. App nickname: `BoomerangConnect Web`
3. Click "Register app"
4. Copy the Firebase configuration object
5. Use these values in your `.env.local` file

### Step 3: Add Mobile App (Optional)
1. In Firebase Console, click the Android icon
2. Android package name: `com.boomerangconnect`
3. App nickname: `BoomerangConnect Mobile`
4. Click "Register app"
5. Download the `google-services.json` file
6. Place it in `apps/mobile/` directory

## 4. Development

### Step 1: Start Development Servers
```bash
# Start both web and mobile servers
npm run dev

# Or start individually:
npm run dev:web     # Web only (http://localhost:3000)
npm run dev:mobile  # Mobile only (scan QR with Expo Go)
```

### Step 2: Access Your Applications

**Web App:**
- Open your browser to http://localhost:3000
- Hot reload enabled
- Firebase integration active

**Mobile App:**
- Install Expo Go on your device
- Scan the QR code from the terminal
- Hot reload enabled

## 5. Project Structure Details

### Apps
- **`apps/web/`**: Next.js 14 web application
  - `src/app/`: App Router pages
  - `next.config.js`: Next.js configuration
  - `.env.local`: Environment variables

- **`apps/mobile/`**: Expo React Native mobile app
  - `app/`: Expo Router screens
  - `app.json`: Expo configuration
  - `metro.config.js`: Metro bundler configuration

### Packages
- **`packages/core/`**: Shared business logic
  - `src/theme.ts`: Design system
  - `src/types.ts`: TypeScript types
  - `src/utils.ts`: Utility functions

- **`packages/ui/`**: Shared UI components
  - `src/components/`: Reusable components
  - Works on both web and mobile

## 6. Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start both web and mobile servers |
| `npm run dev:web` | Start web development server |
| `npm run dev:mobile` | Start mobile development server |
| `npm run build` | Build web application |
| `npm run lint` | Run ESLint across all packages |
| `./test-monorepo.sh` | Verify monorepo setup |
| `./start-dev.sh` | Quick start web development |

## 7. Deployment

### Web Deployment (Vercel)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from the web app directory
cd apps/web
vercel

# Or deploy from root
vercel --cwd apps/web
```

### Mobile Deployment (Expo)
```bash
# Build for production
cd apps/mobile
npx expo build:android
npx expo build:ios

# Or use EAS Build
npx eas build --platform all
```

## 8. Troubleshooting

### Common Issues

**"Missing script: dev:web"**
- Ensure you're in the monorepo root directory
- Run `ls package.json` to verify location

**"Cannot find module" errors**
- Run `npm install --legacy-peer-deps`
- Clear node_modules: `rm -rf node_modules && npm install`

**Expo QR not working**
- Install Expo Go app on your device
- Ensure your device and computer are on the same network

**Port 3000 in use**
- Kill existing process: `lsof -ti:3000 | xargs kill -9`
- Or change port in `apps/web/package.json`

### Dependency Issues
```bash
# Fix dependency conflicts
npm install --legacy-peer-deps

# Update packages
npm audit fix --force

# Clear cache
npm cache clean --force
```

## 9. Development Workflow

### Adding New Features
1. **Shared Components**: Add to `packages/ui/src/components/`
2. **Business Logic**: Add to `packages/core/src/`
3. **Web Features**: Add to `apps/web/src/app/`
4. **Mobile Features**: Add to `apps/mobile/app/`

### Code Sharing
- UI components work on both platforms
- Business logic is shared
- Types are shared across all packages
- Theme is consistent across platforms

## 10. Next Steps

1. **Customize Theme**: Edit `packages/core/src/theme.ts`
2. **Add Components**: Create in `packages/ui/src/components/`
3. **Implement Features**: Build in respective app directories
4. **Set Up Testing**: Add tests to each package
5. **Configure Analytics**: Set up Firebase Analytics
6. **Add Authentication**: Implement Firebase Auth

## Support

For issues and questions:
- Check the `QUICK_START.md` for quick reference
- Review `MONOREPO_SETUP.md` for detailed setup
- Open issues in the GitHub repository
- Consult Expo and Next.js documentation
