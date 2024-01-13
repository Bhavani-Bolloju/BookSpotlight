import "firebase/auth";
// import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCzGmj9H2vsJjUQMpp06Pzl_3PakQSXn2g",
  authDomain: "book-spotlight.firebaseapp.com",
  projectId: "book-spotlight",
  storageBucket: "book-spotlight.appspot.com",
  messagingSenderId: "925241360946",
  appId: "1:925241360946:web:d6d7125aad7128bb38722b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);

// export const auth = firebase.auth();
