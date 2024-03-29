import React from "react";
import { useState } from "react";
import { wrap } from "popmotion";
import { motion } from 'framer-motion';


export default function HomeAlbum({image, time, album_title, title, reference, touchend}) {
    
    return (
        
      <div ref={reference} onTouchEnd={touchend}  className={`homealbum min-w-full h-[420px] relative snap-center snap-always scroll-auto`}>
            <motion.img transition={{duration: 1}} initial={{opacity: 0.8}} animate={{opacity: 1}} src={image}
             className='pointer-events-none absolute z-0 min-w-full h-full object-cover' />
                <div className='pointer-events-none absolute bottom-0 w-full h-[279px] p-8 pt-[85px] z-1 bg-heroGradient'>
                    <div className='flex flex-col gap-3 z-1'>
                        <p className='h-[28px] w-[87px] flex justify-center items-center rounded-full outline outline-offset-[1.5px] outline-1 '>Featured</p>
                        {/* Title */}
                        <motion.h2 transition={{delay: 0.3}} initial={{opacity: 0}} animate={{opacity: 1}} 
                        // Do zrobienia: Ucinanie tytułu jestli jest za dlugi za pomoca js
                        className='w-full text-4xl font-playfair font-extrabold h-[82px] whitespace-normal break-words truncate'>
                        {album_title}
                        </motion.h2>
                        {/* Album Title */}
                        <motion.div transition={{delay: 0.5}} initial={{opacity: 0}} animate={{opacity: 1}} className='flex flex-row justify-start items-center gap-2'>
                        <p className='font-lato font-bold text-[14px]'>{title}</p>
                        {/* Dot */}
                        <div className='w-[5px] h-[5px] rounded-full bg-white'></div>
                        {/* Time */}
                        <p className='font-lato font-bold text-[14px]'>{time}</p>
                        </motion.div>
                        
                    </div>
                </div>
      </div>);
      
    }
  
  