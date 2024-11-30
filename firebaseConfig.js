// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your Firebase Config Object from Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyBMXZ15EPggwrk3WFWaw6Qiwo5GiYZDqSE",
    database: "https://shopsmartapp-2badf.firebaseapp.com",
    authDomain: "shopsmartapp-2badf.firebaseapp.com",
    projectId: "shopsmartapp-2badf",
    storageBucket: "shopsmartapp-2badf.firebasestorage.app",
    messagingSenderId: "647289260015",
    appId: "1:647289260015:web:3ae194ae03cbe79281d81a",
    measurementId: "G-K6BDEB9MM9"
      
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 

// Initialize Firestore Database
const db = getFirestore(app);

export { db };
