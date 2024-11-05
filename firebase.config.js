// lib/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD9QHpbkZf3z8w2nNQGkUH3AljL5Y4l5Bk",
  authDomain: "superdocs-11101.firebaseapp.com",
  projectId: "superdocs-11101",
  storageBucket: "superdocs-11101.firebasestorage.app",
  messagingSenderId: "859668443960",
  appId: "1:859668443960:web:b2771d5c3c059fcc3207cd",
  measurementId: "G-58XDMXVQ4W"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
