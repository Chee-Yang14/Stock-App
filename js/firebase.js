// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCA_2F27rpNONcZbIZzVwwmf_iGKRVwfd4",
  authDomain: "stock-app-3ef83.firebaseapp.com",
  projectId: "stock-app-3ef83",
  storageBucket: "stock-app-3ef83.appspot.com",
  messagingSenderId: "97376314996",
  appId: "1:97376314996:web:a8c3d8b81522889b169321",
  measurementId: "G-G8048NWSL5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);