
import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getMessaging, isSupported } from 'firebase/messaging';

const firebaseConfig = {
  // Demo configuration - replace with your actual Firebase config
  apiKey: "demo-api-key",
  authDomain: "waitrix-demo.firebaseapp.com",
  projectId: "waitrix-demo",
  storageBucket: "waitrix-demo.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);

// Initialize messaging for push notifications (only if supported)
let messaging: any = null;
isSupported().then((supported) => {
  if (supported) {
    messaging = getMessaging(app);
  }
});

export { messaging };

// For development, you can uncomment these to use Firebase emulators
// connectFirestoreEmulator(db, 'localhost', 8080);
// connectAuthEmulator(auth, 'http://localhost:9099');

export default app;
