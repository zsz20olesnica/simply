import React from 'react'
import PlayerHero from '../../Images/hero_player.png'
import {  More } from '../../Icons'
export default function SongListTile({title, authors, image}) {
  return (
    <>
    {/* SongContainer */}
    <div className="w-full flex flex-col justify-start items-center my-3 mx-4">
        <div className="h-14 w-full flex flex-row items-center justify-start">
            <img src={image} className={'w-14 h-14 object-cover'}/>
            <div className='flex flex-col justify-center items-start ml-5'>
                <p className='text-secondary font-semibold'>{title}</p>
                <p className='text-tertiary'>{authors}</p>
            </div> 
            <More className={'rotate-90 absolute right-5 scale-75'}/>
        </div>
    </div>
    </>
  )
}
