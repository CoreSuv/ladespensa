// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeFirestore, setLogLevel } from "firebase/firestore";
import Constants from 'expo-constants';

const extra = Constants.expoConfig?.extra || {};
const firebaseConfig = {
  apiKey: extra.apiKey,
  authDomain: extra.authDomain,
  projectId: extra.projectId,
  storageBucket: extra.storageBucket,
  messagingSenderId: extra.messagingSenderId,
  appId: extra.appId
};

// Basic validation and helpful error messages for builds
function validateConfig(cfg) {
  const missing = Object.entries(cfg).filter(([k, v]) => !v).map(([k]) => k);
  if (missing.length) {
    console.error('Firebase config missing keys:', missing);
    console.error('Constants.expoConfig?.extra =', Constants.expoConfig?.extra);
    throw new Error(`Firebase config missing keys: ${missing.join(', ')}.\nMake sure you provided these values via app.config.js (extra) or EAS secrets and rebuilt the native app.`);
  }
}

validateConfig(firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const database = initializeFirestore(app, {
  experimentalForceLongPolling: true,
  useFetchStreams: false,
});

// Debug helpers: log the projectId and run a lightweight network check in dev builds.
try {
  console.log('[fb] Firebase projectId =', firebaseConfig.projectId);
  if (typeof __DEV__ !== 'undefined' && __DEV__) {
    // quick fetch to verify basic outbound networking from the app runtime
    fetch('https://www.google.com', { method: 'HEAD' })
      .then(res => console.log('[fb] network check ok', res.status))
      .catch(err => console.warn('[fb] network check failed', err && err.message));
  }
} catch (e) {
  // swallow any debug errors to avoid crashing the app
  console.warn('[fb] debug log failed', e && e.message);
}

// Enable Firestore debug logging in development so we can see network/transport details.
try {
  if (typeof __DEV__ !== 'undefined' && __DEV__ && setLogLevel) {
    setLogLevel('debug');
    console.log('[fb] Firestore setLogLevel(debug)');
  }
} catch (e) {
  console.warn('[fb] could not set Firestore log level', e && e.message);
}