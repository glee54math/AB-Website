// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDGfP-K5B3Lfr8fuLPKWzzz6zwZYeoJ2Ys",
    authDomain: "automathicallybetterweb.firebaseapp.com",
    projectId: "automathicallybetterweb",
    storageBucket: "automathicallybetterweb.firebasestorage.app",
    messagingSenderId: "800366629672",
    appId: "1:800366629672:web:dbf4d582ef96778fdcf61d",
    measurementId: "G-7KVGTLLF5R"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
