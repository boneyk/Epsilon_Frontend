// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBb2c6m_mzGFCuBji0XvszBq1ZcqZGuYKs",
  authDomain: "epsilon-9de99.firebaseapp.com",
  projectId: "epsilon-9de99",
  storageBucket: "epsilon-9de99.appspot.com",
  messagingSenderId: "898159468943",
  appId: "1:898159468943:web:d9f704ebb42b14a4066bfa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);