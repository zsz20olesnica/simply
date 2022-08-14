import React, {useRef, useEffect, useState} from 'react'
import { LeftArrow } from '../../../Icons'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { onAuthStateChanged } from 'firebase/auth'
import {appVersion, SingInWithEmail, auth} from '../../../firebase'
export default function SingUp() {

  
//IfAlreadyLoggedInGoToHome
  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
    if(res)
    {
      history('/home')
    }
  })
  }, [])



  const history = useNavigate()
  const SiteTitle = 'Log In with Simply Account - Simply'
  document.title = SiteTitle

  const [InvalidData, setInvalidData] = useState(false)

  //RegisterInputsRef
  const emailRef = useRef()
  const passwordRef = useRef()

  //Sumbit
  const LogIn = () => {
    let email = emailRef.current.value
    let password = passwordRef.current.value
  

    if(email && password)
    {
      SingInWithEmail(email, password, ()=>setInvalidData(true))
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
                <button className='' onClick={() => history('/login')}><LeftArrow className={'rotate-180'}/></button>
            </div>
            {/* SettingsContainer */}
            <div className='mb-20 w-full flex flex-col justify-between items-center gap-5 text-secondary'>
                
                

            {/* LogInToSimplyAccount */}
              <div className='w-full flex flex-col items-center justify-center gap-5 mt-10'>


                  {/* Email */}
                  <p className='w-full text-[19px] font-lato text-secondary'>E-mail</p>
                  <input ref={emailRef} placeholder='Type your email' type='email' className='w-full h-11 rounded-full bg-search px-5 text-secondary focus:outline-primary'></input>


                  {/* Password */}
                  <p className='w-full text-[19px] font-lato text-secondary'>Password</p>
                  <input ref={passwordRef} placeholder='Type your password' type='password' className='w-full h-11 rounded-full bg-search px-5 text-secondary focus:outline-primary'></input>
                  {
                  InvalidData
                  ? <p className='text-[14px] font-lato text-error self-start'>Something went wrong, check if data is correct.</p>
                  : null
                  }

                  {/* ConfirmButton */}
                  <button onClick={LogIn} className='w-[200px] h-11 my-[16px] mt-[25px] text-lg rounded-full bg-primary font-lato text-white'>Log In</button>

                  <p onClick={() => history('/signup')} className='text-[14px] font-lato text-tertiary self-center'>You don't have account, Sign Up now!</p>

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
