import React from 'react'
import '../../../App.css'
import '../../../vanilla.css'
import { useNavigate } from 'react-router-dom'

export default function Home() {

  const history = useNavigate()

  return (
    <div className='homeContainer w-full h-full relative'>
      <div className='homeGradiendContainer w-full h-full absolute top-0 left-0 z-10'></div>
      <div className='homeImageContainer w-full h-full absolute top-0 left-0 z-0'></div>

      <div className='homeContentContainer h-full w-full flex flex-col items-center justify-center absolute top-0 left-0 z-20'>
        <h1 className='logo font-playfair text-[90px] my-[150px] font-medium'>Simply</h1>

        <h4 className='underText font-lato font-bold text-[25px]'>Discover Alternative Music</h4>
        <p className='homeSliderText w-[65%] text-center my-2 mb-[16px]'>Lorem Ipsum is simply dummy text of the printing and typesetting.</p>
        
        <div className='flex flex-row gap-2 my-1'>
          <div className='w-[11px] h-[11px] rounded-full bg-white'></div>
          <div className='w-[11px] h-[11px] rounded-full border-2'></div>
          <div className='w-[11px] h-[11px] rounded-full border-2'></div>
        </div>
    
      
        <button onClick={() => history('/home')} className='w-[180px] h-11 my-[16px] mt-[25px] text-xl rounded-full bg-white font-lato text-primary'>Login</button> 

        <p className='homeSingUpButton w-[65%] text-center mt-0 cursor-pointer'>Sing up</p>
      </div>

      
        
    </div>
  )
}
