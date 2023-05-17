import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyC5sxW7Kj-F2fW5vdg-bH-IFzcly4FBtJM",
  authDomain: "postatiwith.firebaseapp.com",
  projectId: "postatiwith",
  storageBucket: "postatiwith.appspot.com",
  messagingSenderId: "646245005567",
  appId: "1:646245005567:web:e60790bf561b32b4f7b4ca"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
