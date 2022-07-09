import React from 'react'
import { useNavigate } from 'react-router-dom'
export default function SongTile({title, img, time}) {
    const history = useNavigate()
  return (
    <div onClick={() => history('/player')} className='flex flex-col items-start justify-center'>
        <img src={img} alt={img} className='h-[136px] w-[165px] rounded-[12px] object-cover'></img>
        <h4 className='font-lato text-[19px] text-secondary font-bold'>{title}</h4>
        <p className='font-lato text-[14px] text-tertiary'>{time}</p>      
    </div>
  )
}
