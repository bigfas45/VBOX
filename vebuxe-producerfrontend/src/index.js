// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYocitPK8KlaEyyHjCHmg9_Pg0JedsynA",
  authDomain: "vebuxe-backoffice.firebaseapp.com",
  projectId: "vebuxe-backoffice",
  storageBucket: "vebuxe-backoffice.appspot.com",
  messagingSenderId: "851743537700",
  appId: "1:851743537700:web:dcf27799189b07f1c536b1",
  measurementId: "G-CNEPT3KKWY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
