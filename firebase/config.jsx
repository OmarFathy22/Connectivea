import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBLtRZDf7lr6XWkEK0PZZvysnVSNolVqfE",
  authDomain: "connectiveaa.firebaseapp.com",
  projectId: "connectiveaa",
  storageBucket: "connectiveaa.appspot.com",
  messagingSenderId: "43856456231",
  appId: "1:43856456231:web:82ca93b8cc35c5ab35fc02"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
