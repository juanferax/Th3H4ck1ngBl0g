// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdA8OUTq5LvoaqhU2YYWzatR2zmqm5G3M",
  authDomain: "the-hacking-blog.firebaseapp.com",
  projectId: "the-hacking-blog",
  storageBucket: "the-hacking-blog.appspot.com",
  messagingSenderId: "272354451045",
  appId: "1:272354451045:web:948f98a807a2f09133708c",
  measurementId: "G-CKD5FZHHW7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
