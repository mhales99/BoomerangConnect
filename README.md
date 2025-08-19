# BoomerangConnect

A modern React Native networking app that helps professionals connect, collaborate, and grow their network.

## 🚀 Features

- **Professional Networking**: Connect with like-minded professionals
- **Real-time Messaging**: Built-in chat functionality
- **Profile Management**: Comprehensive user profiles with skills and experience
- **Smart Recommendations**: AI-powered connection suggestions
- **Cross-platform**: Works on both iOS and Android
- **Real-time Updates**: Live notifications and activity feeds

## 🛠 Tech Stack

- **Frontend**: React Native 0.81.0
- **Navigation**: React Navigation v6
- **Backend**: Firebase (Authentication, Firestore, Storage)
- **Deployment**: Vercel
- **Version Control**: GitHub
- **Styling**: React Native StyleSheet

## 📱 Screenshots

*Screenshots will be added here once the app is running*

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/BoomerangConnect.git
   cd BoomerangConnect
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **iOS Setup (macOS only)**
   ```bash
   cd ios
   pod install
   cd ..
   ```

4. **Start the development server**
   ```bash
   npx react-native start
   ```

5. **Run the app**
   ```bash
   # For iOS
   npx react-native run-ios
   
   # For Android
   npx react-native run-android
   ```

## 🔧 Configuration

### Firebase Setup

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Add Android and iOS apps to your Firebase project
3. Download configuration files:
   - `google-services.json` → `android/app/`
   - `GoogleService-Info.plist` → `ios/BoomerangConnect/`
4. Update Firebase configuration in `src/config/firebase.js`

### Environment Variables

Create a `.env` file in the root directory:

```env
FIREBASE_API_KEY=your_firebase_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
```

## 📁 Project Structure

```
BoomerangConnect/
├── src/
│   ├── components/          # Reusable UI components
│   ├── screens/            # Screen components
│   │   ├── HomeScreen.js
│   │   ├── ConnectScreen.js
│   │   ├── ProfileScreen.js
│   │   └── SettingsScreen.js
│   ├── navigation/         # Navigation configuration
│   │   └── AppNavigator.js
│   ├── config/            # Configuration files
│   │   └── firebase.js
│   ├── services/          # API and service functions
│   └── utils/             # Utility functions
├── android/               # Android-specific files
├── ios/                   # iOS-specific files
├── .github/               # GitHub Actions workflows
├── firebase.json          # Firebase configuration
├── vercel.json           # Vercel deployment config
└── README.md
```

## 🚀 Deployment

### GitHub Setup

1. Initialize Git repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Create a new repository on GitHub

3. Connect and push to GitHub:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/BoomerangConnect.git
   git branch -M main
   git push -u origin main
   ```

### Vercel Deployment

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy to Vercel:
   ```bash
   vercel login
   vercel
   ```

3. Configure environment variables in Vercel dashboard

### Firebase Deployment

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login and initialize:
   ```bash
   firebase login
   firebase init
   ```

3. Deploy:
   ```bash
   firebase deploy
   ```

## 🔄 Continuous Integration

The project includes GitHub Actions workflows for:
- Automatic testing on pull requests
- Deployment to Vercel on main branch pushes
- Code quality checks

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 📦 Build

### Android

```bash
# Debug build
npx react-native run-android

# Release build
cd android
./gradlew assembleRelease
```

### iOS

```bash
# Debug build
npx react-native run-ios

# Release build
npx react-native run-ios --configuration Release
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📧 Email: support@boomerangconnect.com
- 🐛 Issues: [GitHub Issues](https://github.com/YOUR_USERNAME/BoomerangConnect/issues)
- 📖 Documentation: [Wiki](https://github.com/YOUR_USERNAME/BoomerangConnect/wiki)

## 🙏 Acknowledgments

- React Native team for the amazing framework
- Firebase team for the backend services
- Vercel team for the deployment platform
- All contributors and supporters

---

Made with ❤️ by the BoomerangConnect team
