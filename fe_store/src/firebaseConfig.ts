import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDTNKu7whhBYsxLsV_glvTgC-UU8gSFerg",
  authDomain: "foogle-store.firebaseapp.com",
  projectId: "foogle-store",
  storageBucket: "foogle-store.appspot.com",
  messagingSenderId: "461203878447",
  appId: "1:461203878447:web:852d187e1bcfd59362ccda",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const authentication = getAuth(app);
