// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwc4qUAsqGHCHUDNQSDWfKWWH5W3bF5zY",
  authDomain: "journal-db-a1826.firebaseapp.com",
  projectId: "journal-db-a1826",
  storageBucket: "journal-db-a1826.appspot.com",
  messagingSenderId: "159519524427",
  appId: "1:159519524427:web:7cf68b47e01312ccc52fce"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp)
export const FirebaseDB = getFirestore(FirebaseApp)