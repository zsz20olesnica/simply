import React from 'react'
import { useNavigate } from 'react-router-dom'
import FeelingArtsy from '../../Images/playlist1.png'
export default function SongTile() {
    const history = useNavigate()
  return (
    <div onClick={() => history('/player')} className='flex flex-col items-start justify-center'>
        <img src={FeelingArtsy} className='h-[136px] rounded-[12px]'></img>
        <h4 className='font-lato text-[19px] text-secondary font-bold'>Feeling Artsy</h4>
        <p className='font-lato text-[14px] text-tertiary'>2 hours</p>      
    </div>
  )
}
