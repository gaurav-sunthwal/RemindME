import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByJmOWp5Cflg32gjuxp0BoUJn394lkMPc",
  authDomain: "getmedone-ffa22.firebaseapp.com",
  projectId: "getmedone-ffa22",
  storageBucket: "getmedone-ffa22.appspot.com",
  messagingSenderId: "334211715330",
  appId: "1:334211715330:web:2d364761696e02c75b721b",
  measurementId: "G-Q68FK6PBLV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
export const db = getFirestore(app);
export const auth = getAuth(app);
