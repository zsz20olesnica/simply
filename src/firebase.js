import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  createUserWithEmailAndPassword, 
  updateProfile, 
  signInWithEmailAndPassword, } from "firebase/auth";
import { getStorage, ref ,  uploadBytesResumable, getDownloadURL } from "firebase/storage";




// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7THuhoNq09m_VNRSktvGLRgJXmcSMrZk",
  authDomain: "simply-c2c77.firebaseapp.com",
  projectId: "simply-c2c77",
  storageBucket: "gs://simply-c2c77.appspot.com/",
  messagingSenderId: "243257117322",
  appId: "1:243257117322:web:c96cb1a0685af675f77b73",
  measurementId: "G-BV9BX83Z7E"
};

//FilteredCategoriesInSearchPanel
export let Categories = []
export let PlayerData = {
  title: 'title',
  duration: 'duration',
  img: 'img',
  thumbnailAuthor: 'thumbnailAuthor',
  albumName: 'albumName',
  albumData: [],
  
    
  set changeTitle(newTitle) {
        this.title = newTitle
    },
  set changeDuration(newDuration) {
        this.duration = newDuration
  },
  set changeImg(newImg) {
        this.img = newImg
  },
  set changeThumbnailAuthor(newThumbnailAuthor) {
        this.thumbnailAuthor = newThumbnailAuthor
 },
  set changeAlbumName(newAlbumName) {
        this.albumName = newAlbumName
  },
  set changeAlbumData(newAlbumData) {
    this.albumData = newAlbumData
}

}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const appVersion = '0.6.1'
//Firestore DB
export const db = getFirestore(app)
//Kto jest zalogowany jego dane itp
export const auth = getAuth(app)
//LoginProvider
const provider = new GoogleAuthProvider()
//Storage
export const storage = getStorage();



export const SignInWithGoogle = () => {
  signInWithPopup(auth, provider)
  .then((result) => {
    //GetDocFromFirebase  
    getDoc(doc(db, "users", result.user.uid)).then(docSnap => {
      // CheckIfExists
      if (docSnap.exists()) {
        console.log("User exist")
      } 
      else 
      {
        // IfNotAddNewUserData
        console.log("No such document! Adding new user to database")

        //CreateNewDBForUser
          setDoc(doc(db, "users", result.user.uid), {
            uid: result.user.uid,
            email: result.user.email,
            displayName: result.user.displayName,
            settings: {
              notifications: true
            },
            favouritesSongs:
            {

            },
          });
      }
    })
  })
  .then((result) => {
    // SaveUserDataInLocalStorage
    const name = result.user.displayName
    const email = result.user.email
    localStorage.setItem('UserName', name)
    localStorage.setItem('UserEmail', email)
    console.log(result)
    console.log('SignedIn')
  })
  .catch((error) =>{
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
  }).then((result) => 
  {
  //CreateNewDBForUser
  setDoc(doc(db, "users", auth.currentUser.uid), {
    uid: auth.currentUser.uid,
    email: auth.currentUser.email,
    displayName: auth.currentUser.displayName,
    settings: {
      notifications: true
    }
  });
  localStorage.setItem('UserName', login)
  localStorage.setItem('UserEmail', email)
  console.log(result)
  
  }
  )
  .catch((error) =>console.log(error))
  
}

export const SingInWithEmail = (email, password, errorMessage) => {
  signInWithEmailAndPassword(auth, email, password)
  .then((result) => 
  {
    console.log(result)
    localStorage.setItem('UserEmail', email)
  })
  .catch((error) =>
  {
    console.log(error)
    errorMessage()
  })
}

