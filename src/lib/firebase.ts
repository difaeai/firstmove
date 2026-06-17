// ----------------------------------------------------------------------------
// Firebase initialization
//
// Two ways to run:
//   1. PRODUCTION  — uses the First Option Worldwide project config below
//      (overridable via .env, see .env.example).
//   2. LOCAL DEMO  — set VITE_USE_EMULATORS=true to run entirely against the
//      Firebase Emulator Suite, with NO cloud project required.
//
// NOTE: Firebase web config values are PUBLIC by design (they ship in the
// browser bundle). They are not secrets — access is enforced by the Firestore
// and Storage security rules, which restrict all reads to the admin account.
// ----------------------------------------------------------------------------
import { initializeApp, type FirebaseApp } from 'firebase/app'
import { connectFirestoreEmulator, getFirestore, type Firestore } from 'firebase/firestore'
import { connectAuthEmulator, getAuth, type Auth } from 'firebase/auth'
import { connectStorageEmulator, getStorage, type FirebaseStorage } from 'firebase/storage'

export const useEmulators = import.meta.env.VITE_USE_EMULATORS === 'true'

// The single email allowed into the admin panel. MUST match the address used
// in firestore.rules / storage.rules. Create this user in Firebase
// Authentication. Override in the browser via VITE_ADMIN_EMAIL if needed.
export const adminEmail = (
  import.meta.env.VITE_ADMIN_EMAIL || 'firstoptionworldwide@gmail.com'
)
  .trim()
  .toLowerCase()

// Production project config (public client keys — safe to commit).
const defaultConfig = {
  apiKey: 'AIzaSyAEcTOj9AdM39IehbKNgy5tzgacuSvD8yw',
  authDomain: 'firstmove-ff051.firebaseapp.com',
  projectId: 'firstmove-ff051',
  storageBucket: 'firstmove-ff051.firebasestorage.app',
  messagingSenderId: '888409125750',
  appId: '1:888409125750:web:0ab0de38060ffa98be8057',
  measurementId: 'G-JPF5XE8Y5N',
}

// Dummy config used only when talking to the local emulators.
const demoConfig = {
  apiKey: 'demo-api-key',
  authDomain: 'demo-first-option.firebaseapp.com',
  projectId: 'demo-first-option',
  storageBucket: 'demo-first-option.appspot.com',
  messagingSenderId: '000000000000',
  appId: '1:000000000000:web:demo',
}

// Allow per-environment overrides via .env, falling back to the project config.
const realConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || defaultConfig.apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || defaultConfig.authDomain,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || defaultConfig.projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || defaultConfig.storageBucket,
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || defaultConfig.messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || defaultConfig.appId,
  measurementId: defaultConfig.measurementId,
}

const hasRealKeys = Boolean(
  realConfig.apiKey &&
    realConfig.projectId &&
    !String(realConfig.apiKey).includes('your-api-key'),
)

export const isFirebaseConfigured = useEmulators || hasRealKeys

let app: FirebaseApp | undefined
let db: Firestore | undefined
let auth: Auth | undefined
let storage: FirebaseStorage | undefined

if (isFirebaseConfigured) {
  app = initializeApp(useEmulators ? demoConfig : realConfig)
  db = getFirestore(app)
  auth = getAuth(app)
  storage = getStorage(app)

  if (useEmulators) {
    const host = '127.0.0.1'
    connectAuthEmulator(auth, `http://${host}:9099`, { disableWarnings: true })
    connectFirestoreEmulator(db, host, 8080)
    connectStorageEmulator(storage, host, 9199)
  } else if (import.meta.env.PROD && typeof window !== 'undefined' && realConfig.measurementId) {
    // Google Analytics — production browsers only, lazily and safely loaded.
    import('firebase/analytics')
      .then(async ({ getAnalytics, isSupported }) => {
        if (await isSupported()) getAnalytics(app!)
      })
      .catch(() => {})
  }
}

export { app, db, auth, storage }
