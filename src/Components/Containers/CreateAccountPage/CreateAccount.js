import React from 'react'
import { LeftArrow } from '../../../Icons'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
export default function SingUp() {

  const history = useNavigate()
  const SiteTitle = 'Sign Up - Simply'
  document.title = SiteTitle
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
                  <input placeholder='Type your email' type='email' className='w-full h-11 rounded-full bg-search px-5 text-secondary focus:outline-primary'></input>
                  <p className='text-[14px] font-lato text-error self-start'>Email is existing.</p>


                  {/* Login */}
                  <p className='w-full text-[19px] font-lato text-secondary'>Login</p>
                  <input placeholder='Type your login' type='text' className='w-full h-11 rounded-full bg-search px-5 text-secondary focus:outline-primary'></input>
                  <p className='text-[14px] font-lato text-error self-start'>Login is existing.</p>


                  {/* Password */}
                  <p className='w-full text-[19px] font-lato text-secondary'>Password</p>
                  <input placeholder='Type your password' type='password' className='w-full h-11 rounded-full bg-search px-5 text-secondary focus:outline-primary'></input>
                  <input placeholder='Confrim your password' type='password' className='w-full h-11 rounded-full bg-search px-5 text-secondary focus:outline-primary'></input>
                  {/* IfPasswordChangeFailed/To sie powinno pokazywac jak sie zle wpisze haslo w sensie takie poza tymi wymogami */}
                  <p className='text-[14px] font-lato text-error'>Password should be at least 8 characters long and contain special characters.</p>


                  {/* ConfrimButton */}
                  <button className='w-[200px] h-11 my-[16px] mt-[25px] text-lg rounded-full bg-primary font-lato text-white'>Create Account</button>
              </div>
              
                

            </div>
            {/* Footer */}
            <div className='w-full flex flex-row justify-between items-center'>
                <p className='text-tertiary'>App version 0.2</p>
                <p className='text-primary font-playfair text-2xl'>Simply</p>
              </div>
        </div>  
    </motion.div>
  )
}
