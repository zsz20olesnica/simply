import React from "react";
import { useState } from "react";
import { wrap } from "popmotion";
import { motion } from 'framer-motion';


export default function HomeInfo({title, paragraph, reference, touchend}) {
    
    return (
        
      <div ref={reference} onTouchEnd={touchend}  className={`homeinfo min-w-full h-[420px] relative snap-center snap-always scroll-auto`}>
            
                <div className='pointer-events-none absolute bottom-0 w-full h-[279px] p-8 pt-[85px] z-1 bg-heroGradient'>
                    <div className='flex flex-col justify-center items-center gap-3 z-1'>
                        
                        {/* Title */}
                        <motion.h2 transition={{delay: 0.3}} initial={{opacity: 0}} animate={{opacity: 1}} 
                        // Do zrobienia: Ucinanie tytułu jestli jest za dlugi za pomoca js
                        className='w-full text-[25px] font-lato font-semibold h-[30px] flex flex-row justify-center'>
                        {title}
                        </motion.h2>
                        {/* Album Title */}
                        <motion.div transition={{delay: 0.5}} initial={{opacity: 0}} animate={{opacity: 1}} className='w-[320px] flex flex-row justify-center items-center gap-2 '>
                        <p className='font-lato text-center text-[16px]'>{paragraph}</p> 
                        </motion.div>
                        
                    </div>
                </div>
      </div>);
      
    }
  
  