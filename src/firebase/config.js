// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0Ecmt9eRj7Tnd1HTeCXuv0AtNw7HIPCA",
  authDomain: "post-jobs-afd6e.firebaseapp.com",
  projectId: "post-jobs-afd6e",
  storageBucket: "post-jobs-afd6e.appspot.com",
  messagingSenderId: "141213539431",
  appId: "1:141213539431:web:899afed427105acbb808c2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export default db;
