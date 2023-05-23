import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDO3Kn3pm5LWitLc2fcxv2QaTNCt7q3LiQ",
  authDomain: "connnectivea.firebaseapp.com",
  projectId: "connnectivea",
  storageBucket: "connnectivea.appspot.com",
  messagingSenderId: "719946474813",
  appId: "1:719946474813:web:faf61e73a2512c34c1d154"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
