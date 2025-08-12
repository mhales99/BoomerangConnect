# BoomerangConnect Setup Guide

This guide will help you connect your BoomerangConnect React Native project to GitHub, Vercel, and Firebase.

## Prerequisites

- Node.js and npm installed
- Git installed
- GitHub account
- Vercel account
- Firebase account

## 1. GitHub Setup

### Step 1: Initialize Git Repository
```bash
# Navigate to your project directory
cd BoomerangConnect

# Initialize Git repository
git init

# Add all files to Git
git add .

# Create initial commit
git commit -m "Initial commit: BoomerangConnect React Native project"
```

### Step 2: Create GitHub Repository
1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name the repository: `BoomerangConnect`
5. Make it public or private as per your preference
6. Do NOT initialize with README, .gitignore, or license (we already have these)
7. Click "Create repository"

### Step 3: Connect Local Repository to GitHub
```bash
# Add the remote origin (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/BoomerangConnect.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## 2. Firebase Setup

### Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Name your project: `BoomerangConnect`
4. Enable Google Analytics (optional)
5. Click "Create project"

### Step 2: Add Android App
1. In Firebase Console, click the Android icon
2. Android package name: `com.boomerangconnect`
3. App nickname: `BoomerangConnect`
4. Click "Register app"
5. Download the `google-services.json` file
6. Place it in the `android/app/` directory

### Step 3: Add iOS App
1. In Firebase Console, click the iOS icon
2. iOS bundle ID: `com.boomerangconnect`
3. App nickname: `BoomerangConnect`
4. Click "Register app"
5. Download the `GoogleService-Info.plist` file
6. Place it in the `ios/BoomerangConnect/` directory

### Step 4: Configure Firebase in Your App
The Firebase configuration is already set up in `src/config/firebase.js`

## 3. Vercel Setup

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Deploy to Vercel
```bash
# Login to Vercel
vercel login

# Deploy the project
vercel

# Follow the prompts:
# - Set up and deploy: Yes
# - Which scope: Select your account
# - Link to existing project: No
# - Project name: boomerangconnect
# - Directory: ./
# - Override settings: No
```

### Step 3: Configure Environment Variables
In your Vercel dashboard:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add the following variables:
   - `FIREBASE_API_KEY`
   - `FIREBASE_AUTH_DOMAIN`
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_STORAGE_BUCKET`
   - `FIREBASE_MESSAGING_SENDER_ID`
   - `FIREBASE_APP_ID`

## 4. Project Structure

```
BoomerangConnect/
├── src/
│   ├── components/
│   ├── screens/
│   ├── navigation/
│   ├── config/
│   ├── services/
│   └── utils/
├── android/
├── ios/
├── firebase.json
├── vercel.json
└── README.md
```

## 5. Environment Configuration

Create a `.env` file in the root directory:
```env
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
```

## 6. Running the Project

### Development
```bash
# Install dependencies
npm install

# Start Metro bundler
npx react-native start

# Run on Android
npx react-native run-android

# Run on iOS
npx react-native run-ios
```

### Production
```bash
# Build for production
npx react-native run-android --variant=release
npx react-native run-ios --configuration=Release
```

## 7. Continuous Deployment

### GitHub Actions
The project includes a GitHub Actions workflow for automatic deployment to Vercel when you push to the main branch.

### Manual Deployment
```bash
# Deploy to Vercel
vercel --prod
```

## 8. Troubleshooting

### Xcode License Issue
If you encounter Xcode license issues:
```bash
sudo xcodebuild -license accept
```

### Firebase Issues
- Ensure `google-services.json` is in `android/app/`
- Ensure `GoogleService-Info.plist` is in `ios/BoomerangConnect/`
- Check Firebase console for correct configuration

### Vercel Issues
- Ensure all environment variables are set
- Check Vercel logs for deployment errors
- Verify build settings in `vercel.json`

## 9. Next Steps

1. Customize the app theme and branding
2. Add authentication screens
3. Implement core features
4. Set up testing
5. Configure analytics
6. Add push notifications

## Support

For issues and questions:
- Check the React Native documentation
- Review Firebase documentation
- Consult Vercel documentation
- Open issues in the GitHub repository
