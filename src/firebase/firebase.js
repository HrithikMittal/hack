import firebase from "firebase/app";
import "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQFyEXoKfOjEST0hyCMXkkgZi1ofwgzRs",
  authDomain: "august-monument-295713.firebaseapp.com",
  databaseURL: "https://august-monument-295713.firebaseio.com",
  projectId: "august-monument-295713",
  storageBucket: "august-monument-295713.appspot.com",
  messagingSenderId: "863593475822",
  appId: "1:863593475822:web:3fcef9b755686aad350dff",
  measurementId: "G-3F4FB4ZF59",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const storage = firebase.storage();

export { storage, firebase as default };
