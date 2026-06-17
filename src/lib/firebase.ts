// ----------------------------------------------------------------------------
// Firebase initialization
//
// Two ways to run:
//   1. PRODUCTION  — set your real Firebase web keys in .env (see .env.example).
//   2. LOCAL DEMO  — set VITE_USE_EMULATORS=true to run entirely against the
//      Firebase Emulator Suite, with NO cloud project or keys required.
//
// If neither is set, `isFirebaseConfigured` is false and the forms / admin
// show a friendly "not connected yet" message instead of crashing.
// ----------------------------------------------------------------------------
import { initializeApp, type FirebaseApp } from 'firebase/app'
import { connectFirestoreEmulator, getFirestore, type Firestore } from 'firebase/firestore'
import { connectAuthEmulator, getAuth, type Auth } from 'firebase/auth'
import { connectStorageEmulator, getStorage, type FirebaseStorage } from 'firebase/storage'

export const useEmulators = import.meta.env.VITE_USE_EMULATORS === 'true'

// Demo config used only when talking to the local emulators (values are dummy).
const demoConfig = {
  apiKey: 'demo-api-key',
  authDomain: 'demo-first-option.firebaseapp.com',
  projectId: 'demo-first-option',
  storageBucket: 'demo-first-option.appspot.com',
  messagingSenderId: '000000000000',
  appId: '1:000000000000:web:demo',
}

const realConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const hasRealKeys = Boolean(
  realConfig.apiKey &&
    realConfig.projectId &&
    !String(realConfig.apiKey).includes('your-api-key'),
)

export const isFirebaseConfigured = useEmulators || hasRealKeys

// The email allowed into the admin panel (optional). Empty = any signed-in user.
export const adminEmail = (import.meta.env.VITE_ADMIN_EMAIL || '').trim().toLowerCase()

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
  }
}

export { app, db, auth, storage }
