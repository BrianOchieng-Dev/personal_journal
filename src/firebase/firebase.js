

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDXoSPVLkTi3EaTr-SN80LoevK4WJIAVo0",
  authDomain: "personal-journal-2026.firebaseapp.com",
  projectId: "personal-journal-2026",
  storageBucket: "personal-journal-2026.firebasestorage.app",
  messagingSenderId: "323966265914",
  appId: "1:323966265914:web:73efc5add5cf6dbbebe303",
  measurementId: "G-XCBSCYB89D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth= getAuth(app);