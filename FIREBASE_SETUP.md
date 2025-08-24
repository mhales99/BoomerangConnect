# Firebase Setup for BoomerangConnect

## 🔐 Firebase Authentication Setup

### 1. Add Authorized Domains
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `boomerang-connect-cf9a4`
3. Navigate to **Authentication** → **Settings** → **Authorized domains**
4. Add the following domains:
   - `boomerangconnect.vercel.app` (primary domain)
   - `boomerang-connect-web.vercel.app` (default Vercel domain)
   - Any custom domain you're using
   - `localhost` (should already be there)

### 2. Enable Authentication Methods
1. Go to **Authentication** → **Sign-in method**
2. Enable the following methods:
   - **Email/Password**
   - **Google**
   - **Apple** (if needed)
3. For Google Sign-In:
   - Set Project support email
   - Save changes

## ⚙️ Environment Variables

### Required Variables for Vercel
Add these environment variables in Vercel project settings:

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDRiHLC-n3IGQNPPxR71FjXfFdogv00CgI
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=boomerang-connect-cf9a4.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=boomerang-connect-cf9a4
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=boomerang-connect-cf9a4.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=118741245968
NEXT_PUBLIC_FIREBASE_APP_ID=1:118741245968:web:762b3b96117f1a489baa95
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-47XZ2PPFTB
NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA=$VERCEL_GIT_COMMIT_SHA
```

### Local Development
1. Copy `.env.example` to `.env.local` in the `apps/web` directory
2. Add the Firebase configuration values

## 🚀 Vercel Deployment

### Project Settings
1. Set **Root Directory** to `apps/web`
2. Set **Build Command** to `npm run build`
3. Set **Output Directory** to `.next`
4. Set **Install Command** to `npm install --legacy-peer-deps`

### Troubleshooting Authentication Issues
If you encounter authentication issues:

1. **Check Browser Console** for error messages
2. **Verify Environment Variables** are set correctly in Vercel
3. **Confirm Authorized Domains** include your Vercel domain
4. **Clear Browser Cache** or try in incognito mode

### Common Error Messages
- `auth/unauthorized-domain`: Your domain is not authorized in Firebase
- `auth/popup-blocked`: Browser is blocking the authentication popup
- `auth/operation-not-allowed`: Authentication method not enabled in Firebase
