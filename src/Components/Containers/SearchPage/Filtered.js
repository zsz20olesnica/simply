import React from 'react'
import { Heart, DownArrow } from '../../../Icons'
import { useNavigate } from 'react-router-dom'

export default function Search() {

  const history = useNavigate()
  
  return (
    <div className='mainContainer w-full h-full relative'>

        <div className='w-full h-full p-8 bg-white flex flex-col justify-start items-start gap-4'>
        <h3 className='font-lato text-[19px] text-secondary font-bold'>Filtered</h3>
          
        </div>       
    </div>
  )
}
