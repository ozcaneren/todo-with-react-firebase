// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_zW1OLPHXc47pu4gXW6LgyRzCNk8HeJ0",
  authDomain: "todo-app-with-react-fire-c2095.firebaseapp.com",
  projectId: "todo-app-with-react-fire-c2095",
  storageBucket: "todo-app-with-react-fire-c2095.appspot.com",
  messagingSenderId: "770265729938",
  appId: "1:770265729938:web:71c89752c1f45c389d8f4b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);