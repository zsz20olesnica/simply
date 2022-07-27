import React from 'react'
import '../../../vanilla.css'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
export default function Home() {

  const history = useNavigate()
  const SiteTitle = 'Simply'
  document.title = SiteTitle
  
  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}}
     className='w-full h-full relative'>
      {/* Image with gradient */}
      <div className='homeImageContainer w-full h-full absolute top-0 left-0 z-0'></div>
      {/* MainContainer */}
      <div className='homeContentContainer h-full w-full flex flex-col items-center justify-center absolute top-0 left-0 z-20'>
          {/* Logo */}
          <h1 className='logo font-playfair text-[90px] my-[150px] font-medium'>Simply</h1>
          {/* Paragraph */}
          <h4 className='font-lato font-bold text-[25px]'>Discover Alternative Music</h4>
          <p className='homeSliderText w-[65%] text-center my-2 mb-[16px]'>Lorem Ipsum is simply dummy text of the printing and typesetting.</p>
          {/* 3 dots */}
          <div className='flex flex-row gap-2 my-1'>
            <div className='w-[11px] h-[11px] rounded-full bg-white'></div>
            <div className='w-[11px] h-[11px] rounded-full border-2'></div>
            <div className='w-[11px] h-[11px] rounded-full border-2'></div>
          </div>
          {/* LoginButton */}
          <button onClick={() => history('/home')} className='w-[180px] h-11 my-[16px] mt-[25px] text-xl rounded-full bg-white font-lato text-primary'>Log in</button> 
          {/* SingUp */}
          <p onClick={() => history('/signup')} className='homeSingUpButton w-[65%] text-center mt-0 cursor-pointer'>Sign up</p>
      </div>

    </motion.div>
  )
}
