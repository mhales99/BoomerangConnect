# BoomerangConnect

A cross-platform mobile and web application for connecting users.

## Testing Overview

BoomerangConnect includes a comprehensive testing suite with unit tests, integration tests, and end-to-end tests for both mobile and web platforms.

### Unit and Integration Tests

Unit and integration tests are implemented using Jest and React Testing Library.

```bash
# Run all tests
npm test

# Run tests with coverage report
npm run test:coverage

# Run tests in watch mode
npm run test:watch

# Run tests in CI mode
npm run test:ci
```

Test coverage reports are generated in HTML, JUnit XML, and Sonar formats.

### End-to-End Tests

#### Mobile E2E Tests (Detox)

For mobile end-to-end testing, we use Detox.

```bash
# iOS
npm run e2e:build:ios  # Build the iOS app for testing
npm run e2e:test:ios   # Run E2E tests on iOS

# Android
npm run e2e:build:android  # Build the Android app for testing
npm run e2e:test:android   # Run E2E tests on Android
```

#### Web E2E Tests (WebdriverIO)

For web end-to-end testing, we use WebdriverIO.

```bash
# Start the web app
npm run web

# In another terminal, run the E2E tests
npm run e2e:web
```

### Test Structure

- `__tests__/` - Unit and integration tests
  - `components/` - Component tests
  - `screens/` - Screen tests
  - `navigation/` - Navigation tests
  - `services/` - Service/API tests
  - `utils/` - Utility function tests
  - `setup.js` - Jest setup file

- `e2e/` - End-to-end tests
  - Mobile tests (Detox)
  - `web/` - Web tests (WebdriverIO)

### Coverage Requirements

The project has the following test coverage requirements:
- Statements: 80%
- Branches: 70%
- Functions: 80%
- Lines: 80%

## Development

```bash
# Install dependencies
npm install

# Start the Metro bundler
npx react-native start

# Run on Android
npx react-native run-android

# Run on iOS
npx react-native run-ios

# Run web version
npm run web
```

## Building for Production

```bash
# Build for Android
npx react-native run-android --variant=release

# Build for iOS
npx react-native run-ios --configuration=Release

# Build for web
npm run build-web
```

## Deployment

The app can be deployed to various platforms:

- iOS: App Store
- Android: Google Play Store
- Web: Vercel (see SETUP_GUIDE.md)

For more information on setup and deployment, please refer to the SETUP_GUIDE.md file.