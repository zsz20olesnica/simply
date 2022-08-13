import React, {useRef, useState, useEffect} from 'react'
import { LeftArrow } from '../../../Icons'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {registerUser, appVersion, auth} from '../../../firebase'
import { onAuthStateChanged } from "firebase/auth";


export default function SingUp() {
  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
    if(res)
    {
      history('/home')
    }
  })
  }, [])

  const history = useNavigate()
  const SiteTitle = 'Sign Up - Simply'
  document.title = SiteTitle

  //ErrorsStates
  const [InvalidEmail, setInvalidEmail] = useState(false)
  const [InvalidLogin, setInvalidLogin] = useState(false)
  const [InvalidPassword, setInvalidPassword] = useState(false)




  //RegisterInputsRef
  const emailRef = useRef()
  const loginRef = useRef()
  const passwordRef = useRef()
  const confirmpasswordRef = useRef()

  //Sumbit
  const CreateAccount = () => {
    let email = emailRef.current.value
    let login = loginRef.current.value
    let password = passwordRef.current.value
    let confirmpassword = confirmpasswordRef.current.value
   


    //IsEmailValid
    if(!email)
    {
      setInvalidEmail(true)
    }
    else
    {
      setInvalidEmail(false)
    }
    
    //IsLoginValid
    if(!login || String(login).length < 4)
    {
      setInvalidLogin(true)
    }
    else
    {
      setInvalidLogin(false)
    }

    //IsPasswordValid  
    if(String(password).length < 8 || !password || password !== confirmpassword)
    {
      setInvalidPassword(true)
    }
    else
    {
      setInvalidPassword(false)
    }


    if(email && login  && password && confirmpassword && password === confirmpassword)
    {
      registerUser(email, login, password)

    }

    
  }
  
  let viewportWidth = window.innerWidth;
  return (
    <motion.div transition={{duration: 0.5, ease: "easeInOut" }} initial={{x: -viewportWidth, opacity: 0}} 
    animate={{x: 0, opacity: 1}} exit={{x: -viewportWidth, opacity: 0}}
     className='mainContainer w-full h-full relative'>
        <div className='w-full h-full p-8 bg-white flex flex-col justify-between items-center'>
            {/* BackArrow */}
            <div className='w-full h-auto'>
                <button className='' onClick={() => history('/signup')}><LeftArrow className={'rotate-180'}/></button>
            </div>
            {/* SettingsContainer */}
            <div className='mb-20 w-full flex flex-col justify-between items-center gap-5 text-secondary'>
                
                

            {/* CreateAccount */}
              <div className='w-full flex flex-col items-center justify-center gap-5 mt-10'>


                  {/* Email */}
                  <p className='w-full text-[19px] font-lato text-secondary'>E-mail</p>
                  <input ref={emailRef} placeholder='Type your email' type='email' className='w-full h-11 rounded-full bg-search px-5 text-secondary focus:outline-primary'></input>
                  {
                  InvalidEmail
                  ? <p className='text-[14px] font-lato text-error self-start'>Email is existing or not valid.</p>
                  : null
                  }


                  {/* Login */}
                  <p className='w-full text-[19px] font-lato text-secondary'>Login</p>
                  <input  ref={loginRef} placeholder='Type your login' type='text' className='w-full h-11 rounded-full bg-search px-5 text-secondary focus:outline-primary'></input>
                  {
                  InvalidLogin
                  ? <p className='text-[14px] font-lato text-error self-start'>Login is existing or not valid or does not cotain 4 characters.</p>
                  : null
                  }


                  {/* Password */}
                  <p className='w-full text-[19px] font-lato text-secondary'>Password</p>
                  <input ref={passwordRef} placeholder='Type your password' type='password' className='w-full h-11 rounded-full bg-search px-5 text-secondary focus:outline-primary'></input>
                  <input ref={confirmpasswordRef} placeholder='Confirm your password' type='password' className='w-full h-11 rounded-full bg-search px-5 text-secondary focus:outline-primary'></input>
                 
                 {
                  InvalidPassword
                  ? <p className='text-[14px] font-lato text-error'>Password should be at least 8 characters long and contain special characters.</p>
                  : null
                 } 
                 


                  {/* ConfirmButton */}
                  <button onClick={CreateAccount} className='w-[200px] h-11 my-[16px] mt-[25px] text-lg rounded-full bg-primary font-lato text-white'>Create Account</button>
              </div>
              
                

            </div>
            {/* Footer */}
            <div className='w-full flex flex-row justify-between items-center'>
                <p className='text-tertiary'>App version {appVersion}</p>
                <p className='text-primary font-playfair text-2xl'>Simply</p>
              </div>
        </div>  
    </motion.div>
  )
}
