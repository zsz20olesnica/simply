import React, {useEffect} from 'react'
import { LeftArrow, Google, Facebook, Twitter, CustomApp, Microsoft } from '../../../Icons'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SignInWithGoogle, appVersion, auth} from '../../../firebase'
import { collection, addDoc } from "firebase/firestore"; 
import { onAuthStateChanged } from 'firebase/auth'

export default function SingUp() {

  const history = useNavigate()
  const SiteTitle = 'Sign Up - Simply'
  document.title = SiteTitle
  let viewportWidth = window.innerWidth;
  
  //IfAlreadyLoggedInGoToHome
  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
    if(res)
    {
      history('/home')
    }
  })
  }, [])

  const Login = () => {
    SignInWithGoogle(()=>{history("/home")})
  }
  
  return (
    <motion.div transition={{duration: 0.5, ease: "easeInOut" }} initial={{x: viewportWidth, opacity: 0}} 
    animate={{x: 0, opacity: 1}} exit={{x: viewportWidth, opacity: 0}}
     className='mainContainer w-full h-full relative'>
        <div className='w-full h-full p-8 bg-white flex flex-col justify-between items-center'>
            {/* BackArrow */}
            <div className='w-full h-auto'>
                <button className='' onClick={() => history('/')}><LeftArrow/></button>
            </div>
            {/* SettingsContainer */}
            <div className='mb-20 w-full flex flex-col justify-between items-center gap-5 text-secondary'>
                
                

            {/* CreateAccount */}
              <div className='w-full flex flex-col items-center justify-center gap-5 mt-10'>
              <p className='text-6xl font-playfair text-secondary mb-32 text-center'>Welcome to Simply!</p>
              <p className='text-[20px] font-lato text-secondary'>Sing up with:</p>

              <div className='mx-10 flex flex-row justify-center items-center gap-2'>
                <button onClick={Login} className='h-16 w-16 rounded-lg bg-primary p-3'>
                  <Google className={'h-full w-full fill-white'}/></button>
                {/* <button className='h-16 w-16 rounded-lg bg-primary p-3'>
                  <Facebook className={'h-full w-full fill-white'}/></button>
                <button className='h-16 w-16 rounded-lg bg-primary p-3'>
                  <Microsoft className={'h-full w-full fill-white'}/></button>
                <button className='h-16 w-16 rounded-lg bg-primary p-3'>
                  <Twitter className={'h-full w-full fill-white'}/></button> */}
                <button className='h-16 w-16 rounded-lg bg-primary p-3'>
                  <CustomApp className={'h-full w-full fill-white'}/></button>
              </div>
        
              <p className='text-[20px] font-lato text-secondary'>or</p>

              {/* ConfrimButton */}
              <button onClick={() => {history('/createaccount')}} className='w-[200px] h-11 text-lg rounded-full bg-primary font-lato text-white'>Create Account</button>
                 
                 
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
