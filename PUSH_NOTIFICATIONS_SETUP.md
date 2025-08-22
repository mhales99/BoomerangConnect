# Push Notifications Setup Guide

This guide explains how to set up push notifications for the BoomerangConnect app on iOS and Android platforms.

## Prerequisites

1. Firebase project set up (see ENVIRONMENT_SETUP.md)
2. Apple Developer Account (for iOS)
3. Firebase Cloud Messaging API enabled in your Firebase project

## iOS Setup

### 1. Generate Push Notification Certificate

1. Go to [Apple Developer Portal](https://developer.apple.com/account/)
2. Navigate to "Certificates, Identifiers & Profiles"
3. Select "Identifiers" and find your app's Bundle ID
4. Enable "Push Notifications" capability
5. Go to "Certificates" and create a new APNs certificate:
   - For development: Apple Push Notification service SSL (Sandbox)
   - For production: Apple Push Notification service SSL (Production)
6. Download the certificate and double-click to add it to your Keychain
7. Export the certificate as a .p12 file (right-click > Export)
   - Remember the password you set for the .p12 file

### 2. Upload Certificate to Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to Project Settings > Cloud Messaging
4. Under "Apple apps", click "Upload" and select your .p12 file
5. Enter the password you set when exporting the certificate

### 3. Configure Xcode Project

1. Open your project in Xcode
2. Select your target and go to "Signing & Capabilities"
3. Click "+ Capability" and add "Push Notifications"
4. Also add "Background Modes" and check "Remote notifications"
5. Ensure your Bundle ID matches the one registered in Apple Developer Portal

### 4. Add GoogleService-Info.plist

1. Download the updated GoogleService-Info.plist from Firebase Console
2. Place it in the `ios/BoomerangConnect/` directory
3. Make sure it's included in your Xcode project

## Android Setup

### 1. Configure Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to Project Settings > Cloud Messaging
4. Note your Server Key and Sender ID

### 2. Update google-services.json

1. Download the updated google-services.json from Firebase Console
2. Place it in the `android/app/` directory

### 3. Configure Android Project

1. Make sure your `android/app/build.gradle` includes Firebase Messaging:
   ```gradle
   dependencies {
       // ... other dependencies
       implementation "com.google.firebase:firebase-messaging:23.0.0"
   }
   ```

2. Update `android/app/src/main/AndroidManifest.xml` to include:
   ```xml
   <manifest ...>
     <uses-permission android:name="android.permission.INTERNET" />
     <uses-permission android:name="android.permission.VIBRATE" />
     <uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED"/>
     
     <application ...>
       <!-- ... other components -->
       
       <meta-data
         android:name="com.google.firebase.messaging.default_notification_icon"
         android:resource="@drawable/ic_notification" />
       <meta-data
         android:name="com.google.firebase.messaging.default_notification_color"
         android:resource="@color/notification_color" />
       <meta-data
         android:name="com.google.firebase.messaging.default_notification_channel_id"
         android:value="default" />
         
       <service
         android:name=".java.MyFirebaseMessagingService"
         android:exported="false">
         <intent-filter>
           <action android:name="com.google.firebase.MESSAGING_EVENT" />
         </intent-filter>
       </service>
     </application>
   </manifest>
   ```

3. Create notification icon:
   - Add an icon named `ic_notification.png` in various resolutions to your `android/app/src/main/res/drawable-*` folders
   - This icon should be white and transparent (see Android notification icon guidelines)

4. Define notification color in `android/app/src/main/res/values/colors.xml`:
   ```xml
   <?xml version="1.0" encoding="utf-8"?>
   <resources>
     <color name="notification_color">#007AFF</color>
   </resources>
   ```

## Testing Push Notifications

### Using Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to "Cloud Messaging" in the left sidebar
4. Click "Send your first message"
5. Fill in the notification details:
   - Notification title and text
   - Select your app as the target
   - Add any custom data if needed
6. Send the test message

### Using Postman or cURL

You can also test FCM notifications using REST API:

```bash
curl -X POST -H "Authorization: key=YOUR_SERVER_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "to": "DEVICE_FCM_TOKEN",
    "notification": {
      "title": "Test Notification",
      "body": "This is a test notification"
    },
    "data": {
      "type": "test",
      "id": "123"
    }
  }' \
  https://fcm.googleapis.com/fcm/send
```

Replace `YOUR_SERVER_KEY` with your FCM server key and `DEVICE_FCM_TOKEN` with the token from the device you want to test.

## Troubleshooting

### iOS

1. **Notifications not showing in foreground**:
   - Ensure you've implemented the foreground notification handler in NotificationService.js
   - Check that you're using Notifee to display the notification

2. **Silent notifications not working**:
   - Make sure "Background Modes" > "Remote notifications" is enabled
   - Verify your payload includes `content-available: 1`

3. **Certificate issues**:
   - Verify your certificate is not expired
   - Make sure you're using the correct certificate (development vs. production)

### Android

1. **Notifications not showing**:
   - Check if notification channel is created properly
   - Verify your app has notification permissions

2. **Custom notification icon not showing**:
   - Make sure the icon follows Android guidelines (white and transparent)
   - Verify the icon is added to the correct drawable folders

3. **Notification not opening app**:
   - Check that you've implemented the notification click handler correctly

## Security Best Practices

1. **Never store FCM server key in client code**:
   - Use your backend server to send notifications
   - Keep the server key secure on your server

2. **Validate notification data**:
   - Always validate data received from notifications before acting on it

3. **Implement rate limiting**:
   - Prevent notification spam by implementing rate limiting on your server

4. **Use topic messaging wisely**:
   - Don't create too many topics
   - Use user-specific tokens for personalized notifications

## Additional Resources

- [Firebase Cloud Messaging Documentation](https://firebase.google.com/docs/cloud-messaging)
- [Notifee Documentation](https://notifee.app/react-native/docs)
- [Apple Push Notification Service](https://developer.apple.com/documentation/usernotifications)
- [Android Notification Design Guidelines](https://material.io/design/platform-guidance/android-notifications.html)




