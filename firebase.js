// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBulAQp0y1jBD4nqMVwitTXJmktOE2An1Q",
  authDomain: "law-counsel.firebaseapp.com",
  projectId: "law-counsel",
  storageBucket: "law-counsel.firebasestorage.app",
  messagingSenderId: "883846931977",
  appId: "1:883846931977:web:b0e74bfee8785124427ad8",
  measurementId: "G-VJPTNKW2RB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);