import React, { useState, useEffect } from 'react'
import { LeftArrow } from '../../../Icons'
import { useNavigate } from 'react-router-dom'
import { appVersion, auth } from '../../../firebase'
import { motion } from 'framer-motion';

export default function Privacy() {

  const history = useNavigate()
  const SiteTitle = 'Privacy - Simply'
  document.title = SiteTitle
  let viewportWidth = window.innerWidth;


  const [displayAvatar, setDisplayAvatar] = useState(false)
  const [displayPassword, setDisplayPassword] = useState(true)
  
  useEffect(() =>{
    console.log(auth.currentUser)
    if (auth.currentUser.photoURL) setDisplayAvatar(true)
    if (auth.currentUser.providerData[0].providerId == 'google.com') setDisplayPassword(false)
    
  }, [])


  return (
    <motion.div transition={{duration: 0.5, ease: "easeInOut" }} initial={{x: viewportWidth, opacity: 0}} 
    animate={{x: 0, opacity: 1}} exit={{x: viewportWidth, opacity: 0}}
    className='mainContainer w-full h-full relative'>
        <div className='w-full h-full p-8 bg-white flex flex-col justify-between items-center'>
            {/* BackArrow */}
            <div className='w-full h-auto'>
                <button className='' onClick={() => history('/settings')}><LeftArrow/></button>
            </div>
            {/* SettingsContainer */}
            <div className='mb-20 w-full flex flex-col justify-between items-center gap-5 text-secondary'>
                <p className='text-tertiary'>There are no privacy settings available in your country.</p>
                
                <p className='w-full text-[19px] font-lato text-secondary'>Account Data</p>
                
                {/* AccountDataList */}
                <ul className='flex flex-col justify-center items-start w-full'>
                  
                <li className='flex flex-row gap-3'>
                  <p className='text-tertiary'>Login:</p>
                  <p className='text-tertiary'>{auth.currentUser.displayName}</p>
                </li>
                <li className='flex flex-row gap-3'>
                  <p className='text-tertiary'>Email:</p>
                  <p className='text-tertiary'>{auth.currentUser.email}</p>
                </li>
                <li className='flex flex-row gap-3'>
                  <p className='text-tertiary'>Provider:</p>
                  <p className='text-tertiary'>{`${auth.currentUser.providerData[0].providerId}`}</p>
                  
                </li>

                  {
                  displayAvatar
                  ?
                  <li className='flex flex-row gap-10 items-center mt-5'>
                    <p className='text-tertiary'>Avatar:</p>
                    <img src={auth.currentUser.photoURL} alt='User Avatar' className='w-12 h-12 rounded-full'></img>
                  </li>
                  : null
                  }   
                </ul>
     

            {/* ChangePassword */}
              <div className='w-full flex flex-col items-center justify-center gap-5 mt-5'>
              {
                displayPassword 
                ?
                <>
                    <button className='w-[200px] h-11 my-[16px] mt-4 text-lg rounded-full bg-primary font-lato text-white'>Change Password</button> 
                    <p className='text-error'>An email will be send to you to change your password.</p>

                </>
              
              : null
              }
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
