import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { onAuthStateChanged, signOut, signInWithEmailAndPassword, getAuth } from 'firebase/auth';
// import { useAuth } from '../../Contexts/AuthContext'

export default function LoginOkAccounts() {
  const [loading, setLoading] = useState(false)

  return(
    <div className='w-full h-full flex justify-start'>
      {loading ? '' : ''}
      <iframe name='okaccounts' onLoad={() => setLoading(false)} className='w-full h-full border-none' src="http://localhost:3000/existing-users"></iframe>   
    </div>
  )
}



const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}


export function AuthProvider({ children }) {
  const history = useNavigate()
  const [currentUser, setCurrentUser] = useState()
  // // const currentUser = undefined
  const app = initializeApp({
    apiKey: "AIzaSyDuBbE9nCqADyQiSqbvvZACqBGvoTZtC2Y",
    authDomain: "account-system-fccba.firebaseapp.com",
    projectId: "account-system-fccba",
    storageBucket: "account-system-fccba.appspot.com",
    messagingSenderId: "1093658234919",
    appId: "1:1093658234919:web:0075b6538fbc2b60ed3e02",
    databaseURL: "https://account-system-fccba-default-rtdb.europe-west1.firebasedatabase.app"
  }, 'auth');
  const auth = getAuth(app)

    
  window.addEventListener('message', ({data}) => {
    if(data.type === 'auth')
      signInWithEmailAndPassword(auth, data.email, data.password).then((userCredential) => {
        const user = userCredential.user
        setCurrentUser(user)
      }).then(() => {
        console.log(currentUser)
      })
  }) 

  function logOut() {
    signOut(auth).then(() => {
      window.location.pathname = '/okaccounts'
    })
  }

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if(user)
        setCurrentUser(user) 
        history('/home')
    })
  }, [])

  const value = {
    currentUser,
    logOut
  }
    
    window.addEventListener('click', () => console.log(currentUser))

  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}

