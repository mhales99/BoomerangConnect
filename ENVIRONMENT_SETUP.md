# Environment Setup for BoomerangConnect

This document provides instructions for setting up environment variables and Firebase configuration for the BoomerangConnect application.

## Environment Variables

Create a `.env` file in the root directory of the project with the following variables:

```env
# Firebase Configuration
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
FIREBASE_MEASUREMENT_ID=your_measurement_id

# Google Analytics
GA4_MEASUREMENT_ID=your_ga4_measurement_id

# Analytics API
ANALYTICS_ENDPOINT=https://api.boomerangconnect.com/analytics
ANALYTICS_API_KEY=your_analytics_api_key
```

## Firebase Setup

1. Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Register your app (Web, iOS, and Android)
3. Copy the configuration values from your Firebase project settings to your `.env` file

### iOS Setup

1. Download the `GoogleService-Info.plist` file from Firebase Console
2. Place it in the `ios/BoomerangConnect/` directory
3. Open the iOS project in Xcode and ensure the file is included in the app target

### Android Setup

1. Download the `google-services.json` file from Firebase Console
2. Place it in the `android/app/` directory
3. Ensure the Firebase SDK is properly configured in your Android project

## Security Notes

- **NEVER commit the `.env` file to version control**
- **NEVER commit `GoogleService-Info.plist` or `google-services.json` to version control**
- Both files are already added to `.gitignore` to prevent accidental commits

## Vercel Deployment

When deploying to Vercel, add all environment variables in the Vercel project settings:

1. Go to your project on Vercel
2. Navigate to Settings > Environment Variables
3. Add all the variables from your `.env` file

## Local Development

For local development, the `.env` file will be automatically loaded by the application. If you're using a different environment setup, make sure to provide these variables through your environment.
