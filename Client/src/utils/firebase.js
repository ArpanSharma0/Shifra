import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "shifra-8e988.firebaseapp.com",
  projectId: "shifra-8e988",
  storageBucket: "shifra-8e988.firebasestorage.app",
  messagingSenderId: "28820408484",
  appId: "1:28820408484:web:eaf42bde2719cc2ea0be31"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { auth, provider }

