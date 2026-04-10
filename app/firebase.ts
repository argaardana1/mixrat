import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDUGXIMn_trR_GcACdxWq7EP-6gaZn4-Us",
  authDomain: "mixrat-80708.firebaseapp.com",
  projectId: "mixrat-80708",
  storageBucket: "mixrat-80708.firebasestorage.app",
  messagingSenderId: "400722262916",
  appId: "1:400722262916:web:789636fa9087e820ab7bd1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
