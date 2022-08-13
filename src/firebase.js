import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
import { collection, doc, setDoc } from "firebase/firestore"; 
import { getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  createUserWithEmailAndPassword, 
  updateProfile, 
  signInWithEmailAndPassword, } from "firebase/auth";





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

//FilteredCategoriesInSearchPanel
export let Categories = []


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const appVersion = '0.5'
//Firestore DB
export const db = getFirestore(app)
//Kto jest zalogowany jego dane itp
export const auth = getAuth(app)
//LoginProvider
const provider = new GoogleAuthProvider()


export const SignInWithGoogle = (history) => {
  console.log('SignedIn')
  signInWithPopup(auth, provider)
  .then((result)=>{
    
    //CreateNewDBForUser CHUJSTWO NIE DZIAŁA
    // db.collection('users').doc(result.user.uid).set({
    //   name: result.user.displayName,
    //   email:  result.user.email
    // })

    const name = result.user.displayName
    const email = result.user.email
    localStorage.setItem('UserName', name)
    localStorage.setItem('UserEmail', email)
    console.log(result)
    history()
  }).catch((error) =>{
    console.log(error)
  })
}



export const SignOut = (history) => {
  signOut(auth)
  history()
  localStorage.removeItem('UserName')
  localStorage.removeItem('UserEmail')
}

export const registerUser = (email, login, password) => {
  createUserWithEmailAndPassword(auth, email, password).then(() =>{
    return updateProfile(auth.currentUser, {
      displayName: login,
    });
  }).then((response) => console.log(response))
  .catch((error) =>console.log(error))
  localStorage.setItem('UserName', login)
  localStorage.setItem('UserEmail', email)
}

export const SingInWithEmail = (email, password, history) => {
  signInWithEmailAndPassword(auth, email, password)
  .then((result) => console.log(result))
  .catch((error) =>console.log(error))
  localStorage.setItem('UserEmail', email)
}


