# BoomerangConnect

A cross-platform healthcare provider connection app built with Next.js (web) and React Native (mobile) in a modern monorepo architecture.

## 🚀 Latest Deployment
**Deployment Timestamp**: 2025-08-21 16:55:00 UTC
**Status**: Optimized Next.js build with Firebase authentication

## 🏗️ Project Structure

This is a monorepo containing:

- **`apps/web`**: Next.js 14 web application with React Native Web
- **`apps/mobile`**: Expo React Native mobile app
- **`packages/core`**: Shared business logic, types, and Firebase configuration
- **`packages/ui`**: Shared UI components that work on both web and mobile

## 🛠️ Tech Stack

### Web Application
- **Framework**: Next.js 14 with React Native Web
- **Styling**: React Native StyleSheet (cross-platform)
- **Deployment**: Vercel
- **Authentication**: Firebase Auth
- **Database**: Firestore
- **Analytics**: Firebase Analytics

### Mobile Application
- **Framework**: React Native 0.81.0 with Expo
- **Navigation**: Expo Router
- **Deployment**: Expo (iOS/Android)
- **Authentication**: Firebase Auth
- **Database**: Firestore
- **Push Notifications**: Firebase Cloud Messaging

### Shared Infrastructure
- **Monorepo**: npm workspaces
- **TypeScript**: Full type safety across platforms
- **Firebase**: Unified backend services
- **UI Components**: Shared design system

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo CLI (for mobile development)

### Installation
```bash
# Install dependencies
npm install --legacy-peer-deps

# Start development servers
npm run dev          # Both web and mobile
npm run dev:web      # Web only
npm run dev:mobile   # Mobile only
```

### Environment Setup
1. Copy `apps/web/.env.example` to `apps/web/.env.local`
2. Add your Firebase configuration values
3. Start the development server

## 🌐 Web Application

The web app is built with Next.js 14 and includes:
- Firebase Authentication
- Responsive design with React Native Web
- Optimized bundle size
- Server-side rendering
- Shared UI components

## 📱 Mobile Application

The mobile app is built with Expo and includes:
- Cross-platform compatibility (iOS/Android)
- Expo Router for navigation
- Firebase integration
- Push notifications
- Shared UI components

## 🔧 Development

### Available Scripts
- `npm run dev` - Start both web and mobile development servers
- `npm run dev:web` - Start web development server only
- `npm run dev:mobile` - Start mobile development server only
- `npm run build` - Build the web application
- `npm run lint` - Run ESLint

### Monorepo Commands
- `npm run dev -w apps/web` - Start web app from root
- `npm run dev -w apps/mobile` - Start mobile app from root

## 🚀 Deployment

### Web (Vercel)
The web application is automatically deployed to Vercel on push to main branch.

### Mobile (Expo)
```bash
# Build for production
cd apps/mobile
expo build:android
expo build:ios
```

## 📦 Packages

### @boomerang/core
Shared business logic, types, and utilities including:
- Firebase configuration
- Authentication services
- Type definitions
- Utility functions

### @boomerang/ui
Reusable UI components that work on both web and mobile:
- Button, Text, Card components
- Form inputs
- Layout components
- Cross-platform styling

## 🔐 Authentication

Firebase Authentication is used for user management across both platforms with:
- Email/password authentication
- User profile management
- Secure session handling

## 📊 Analytics

Google Analytics 4 and Firebase Analytics are integrated for data collection and insights.

## 🎯 Key Features

- **Cross-platform UI**: Shared components work on web and mobile
- **Type Safety**: Full TypeScript support across the stack
- **Performance**: Optimized bundle sizes and fast loading
- **Scalability**: Monorepo architecture for easy maintenance
- **Modern Stack**: Latest Next.js and React Native versions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test on both web and mobile
5. Submit a pull request

## 📄 License

This project is proprietary software.

## 🔗 Links

- **Web App**: [Deployed on Vercel]
- **Mobile App**: [Available on App Store/Google Play]
- **Documentation**: [Internal docs]
