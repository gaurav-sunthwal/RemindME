// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import getAuth for authentication
// import { getAnalytics } from "firebase/analytics"; // Only use this if you need analytics

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBc1Bp_t9_YhsTjybYamCFtDB1FvR5zGZ0",
  authDomain: "remindme-9e3b1.firebaseapp.com",
  projectId: "remindme-9e3b1",
  storageBucket: "remindme-9e3b1.appspot.com",
  messagingSenderId: "461350972901",
  appId: "1:461350972901:web:e9ca0e475fc6f27237930c",
  measurementId: "G-14ZB270KHF", // Measurement ID is optional
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize Firebase authentication

// Export auth for use in other files
export { auth };