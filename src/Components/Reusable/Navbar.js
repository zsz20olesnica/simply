import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Loupe, Heart, Menu } from '../../Icons'

import { motion } from 'framer-motion';


export default function Navbar() {
    const history = useNavigate()
    
    return (
    <div id='navbar'
     className='navBar bg-white w-full h-[58px] gap-2 bottom-0  px-[36px] py-[16px]  navbar flex justify-between items-center fixed z-10'>
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => history('/search')}><Loupe className={'h-[30px] w-[30px] !fill-secondary'}/></motion.button>
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => history('/favorites')}><Heart className={'h-[30px] w-[30px] !fill-secondary'} /></motion.button>
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => history('/settings')}><Menu  className={'h-[30px] w-[30px] !fill-secondary '}/></motion.button>
    </div>
  )
}
