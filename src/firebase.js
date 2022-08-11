import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7THuhoNq09m_VNRSktvGLRgJXmcSMrZk",
  authDomain: "simply-c2c77.firebaseapp.com",
  projectId: "simply-c2c77",
  storageBucket: "simply-c2c77.appspot.com",
  messagingSenderId: "243257117322",
  appId: "1:243257117322:web:c96cb1a0685af675f77b73",
  measurementId: "G-BV9BX83Z7E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app)