// firebase.js — Firebase initialization for HourlyRecruit
// No changes needed here. This file is correct as-is.

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey:            "AIzaSyC-b6w7KTYUHD0wNLvpbfH2C9n5kxj4kQE",
  authDomain:        "hourlyrecruitwebsite.firebaseapp.com",
  projectId:         "hourlyrecruitwebsite",
  storageBucket:     "hourlyrecruitwebsite.firebasestorage.app",
  messagingSenderId: "335004556566",
  appId:             "1:335004556566:web:9c0b8350264fa41e9d0437",
};

const app = initializeApp(firebaseConfig);

export const db   = getFirestore(app);
export const auth = getAuth(app);

export default app;