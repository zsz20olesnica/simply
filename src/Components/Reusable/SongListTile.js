import React from 'react'
import PlayerHero from '../../Images/hero_player.png'
import {  More } from '../../Icons'
import { motion, Reorder, useDragControls, useMotionValue } from 'framer-motion';

export default function SongListTile({title, authors, image, item}) {
  const dragControls = useDragControls();
  return (
    <>
    <Reorder.Item key={item} value={item} dragListener={false} dragControls={dragControls}>
    {/* SongContainer */}
    <div className="w-full flex flex-col justify-start items-center my-1 px-2 border-b-2 border-gray">
        <div className="h-14 w-full flex flex-row items-center justify-start">
            {/* SongImage */}
            <img src={image} className={'w-12 h-12 object-cover rounded-md'}/>
            {/* Title&Authors */}
            <div className='flex flex-col justify-center items-start ml-4'>
                <p className='text-secondary font-semibold'>Tytul kurwo</p>
                <p className='text-tertiary'>{authors}</p>
            </div> 

          {/* ReorderHandle  */}
          <div className='ml-36 h-full w-10 flex items-center justify-center'>  
          <More dragControls={dragControls} className={'rotate-90 scale-75 w-7 h-7'}/></div>
          </div>
    </div>
    </Reorder.Item>
    </>
  )
}
