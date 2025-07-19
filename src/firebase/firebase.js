// Import core SDK
import { initializeApp } from "firebase/app";

// Firebase Services
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBulAQp0y1jBD4nqMVwitTXJmktOE2An1Q",
  authDomain: "law-counsel.firebaseapp.com",
  projectId: "law-counsel",
  storageBucket: "law-counsel.appspot.com",
  messagingSenderId: "883846931977",
  appId: "1:883846931977:web:b0e74bfee8785124427ad8",
  measurementId: "G-VJPTNKW2RB",
};

// Initialize Firebase only once
const app = initializeApp(firebaseConfig);

// Export initialized services
export const db = getFirestore(app); // Firestore
export const auth = getAuth(app); // Auth
export const storage = getStorage(app); // Storage
