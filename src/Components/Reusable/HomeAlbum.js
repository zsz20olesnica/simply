import React from "react";
import { useState } from "react";
import { wrap } from "popmotion";
import { motion } from 'framer-motion';
export default function HomeAlbum({image, time, album_title, title }) {
    
    
   
      

   
    
    return (
        
      <div className='w-full h-[420px] relative'>
            <motion.img transition={{duration: 1}} initial={{opacity: 0.8}} animate={{opacity: 1}} src={image}
             className='absolute z-0 w-full h-full object-cover' />
                <div className='absolute bottom-0 w-full h-[279px] p-8 pt-[85px] z-1 bg-heroGradient'>
                    <div className='flex flex-col gap-3 z-1'>
                        <p className='h-[28px] w-[87px] flex justify-center items-center rounded-full outline outline-offset-[1.5px] outline-1 '>Featured</p>
                        {/* Title */}
                        <motion.h2 transition={{delay: 0.3}} initial={{opacity: 0}} animate={{opacity: 1}} 
                        // Do zrobienia: Ucinanie tytułu jestli jest za dlugi za pomoca js
                        className='text-4xl font-playfair font-extrabold break-words h-20'>{album_title}</motion.h2>
                        {/* Album Title */}
                        <motion.div transition={{delay: 0.5}} initial={{opacity: 0}} animate={{opacity: 1}} className='flex flex-row justify-start items-center gap-2'>
                        <p className='font-lato font-bold text-[14px]'>{title}</p>
                        {/* Dot */}
                        <div className='w-[5px] h-[5px] rounded-full bg-white'></div>
                        {/* Time */}
                        <p className='font-lato font-bold text-[14px]'>{time}</p>
                        </motion.div>
                        <div className='flex flex-row gap-2 self-center'>
                            <div className='w-[11px] h-[11px] rounded-full bg-white'></div>
                            <div className='w-[11px] h-[11px] rounded-full border-2'></div>
                            <div className='w-[11px] h-[11px] rounded-full border-2'></div>
                            <div className='w-[11px] h-[11px] rounded-full border-2'></div>
                        </div>
                    </div>
                </div>
      </div>);
      
    }
  
  