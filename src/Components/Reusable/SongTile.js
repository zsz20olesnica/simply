import React from 'react'
import { useNavigate } from 'react-router-dom'

import { motion } from 'framer-motion'


export default function SongTile({title, img, time}) {
    const history = useNavigate()
  return (
    <div  onClick={() => history('/player')} className='flex flex-col items-start justify-center'>
        <img src={img} alt={img} className='h-[136px] w-[165px] rounded-[12px] object-cover'></img>
        <motion.h4 transition={{delay: 0.5}} initial={{opacity: 0}} animate={{opacity: 1}}
         className='font-lato text-[19px] text-secondary font-bold'>{title}</motion.h4>
        <motion.p transition={{delay: 1}} initial={{opacity: 0}} animate={{opacity: 1}}
        className='font-lato text-[14px] text-tertiary'>{time}</motion.p>      
    </div>
  )
}
