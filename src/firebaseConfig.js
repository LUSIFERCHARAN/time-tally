import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDcQ_7V2qQZXdJ5HWIOHKQbGmOnTQbXkhk",
    authDomain: "time-tally-58712.firebaseapp.com",
    projectId: "time-tally-58712",
    storageBucket: "time-tally-58712.firebasestorage.app",
    messagingSenderId: "166814378632",
    appId: "1:166814378632:web:257df52904b6ada7204d3d",
    measurementId: "G-ZVS8CKB122"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
