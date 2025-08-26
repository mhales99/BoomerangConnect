// Firebase configuration
// Replace these values with your actual Firebase project values
// or use environment variables in production

export const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "your_firebase_api_key",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "your_project.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID || "your_project_id",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "your_project.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "your_sender_id",
  appId: process.env.FIREBASE_APP_ID || "your_app_id",
  measurementId: process.env.FIREBASE_MEASUREMENT_ID || "your_measurement_id"
};

// Instructions for setting up Firebase:
// 1. Create a Firebase project at https://console.firebase.google.com/
// 2. Register your app (Web, iOS, and Android)
// 3. Copy the configuration values from your Firebase project settings
// 4. Create a .env file in the root directory with these values:
//    FIREBASE_API_KEY=your_firebase_api_key
//    FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
//    FIREBASE_PROJECT_ID=your_project_id
//    FIREBASE_STORAGE_BUCKET=your_project.appspot.com
//    FIREBASE_MESSAGING_SENDER_ID=your_sender_id
//    FIREBASE_APP_ID=your_app_id
//    FIREBASE_MEASUREMENT_ID=your_measurement_id
// 5. Add .env to your .gitignore file to keep these values private

// For iOS: Ensure GoogleService-Info.plist is in ios/BoomerangConnect/
// For Android: Ensure google-services.json is in android/app/