import React from 'react'
import { LeftArrow } from '../../../Icons'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { appVersion } from '../../../firebase' 
import { motion } from 'framer-motion';

export default function About() {

  const history = useNavigate()
  let viewportWidth = window.innerWidth;
  const SiteTitle = 'About - Simply'
  document.title = SiteTitle


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
            <div className='mb-20 w-full flex flex-col justify-center items-center gap-4 text-secondary'>
                <p className='text-primary font-playfair text-6xl'>Simply</p>
                <p className='text-tertiary'>App version {appVersion}</p>
                <p className='text-tertiary text-center'>Created by Kamil Kubiczek, Hubert Kuświk <br></br> & Dawid Matiaszewski</p>
                <p className='text-tertiary text-center'>Tested by Kamila Frysztak</p>

                <p className='text-tertiary'>Designed by <a href='https://fabrx.co'>fabrx.co</a></p>
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
