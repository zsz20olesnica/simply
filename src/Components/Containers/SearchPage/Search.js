import React from 'react'
import { Heart, DownArrow } from '../../../Icons'
import { useNavigate } from 'react-router-dom'

export default function Search() {

  const history = useNavigate()
  
  return (
    <div className='mainContainer w-full h-full relative'>

        <div className='w-full h-full p-8 bg-white flex flex-col justify-between items-center gap-4'>
            <div className='w-full h-auto'>
                <button className='' onClick={() => history('/home')}><DownArrow/></button>
            </div>

            {/* SearchField */}
            <p className='w-full font-playfair font-extrabold text-secondary text-3xl'>Search</p>
            <input placeholder='Search for artists and moods' type='text' className='w-full h-11 rounded-full bg-search px-5 text-secondary'></input>

            
            {/* MoodFilters */}
            <h3 className='w-full font-lato text-[19px] text-secondary font-bold'>Mood</h3>
            <div className='w-full flex flex-row flex-wrap gap-5'>
               <button className='text-primary font-lato rounded-full ring-[1.5px] ring-primary  min-h-[30px] px-3 min-w-[100px]'>Move</button>
               <button className='text-primary font-lato rounded-full ring-[1.5px] ring-primary  min-h-[30px] px-3 min-w-[100px]'>Chill</button>
               <button className='text-primary font-lato rounded-full ring-[1.5px] ring-primary  min-h-[30px] px-3 min-w-[100px]'>Relaxing</button>
               <button className='text-primary font-lato rounded-full ring-[1.5px] ring-primary  min-h-[30px] px-3 min-w-[100px]'>Hard porn</button>
               <button className='text-primary font-lato rounded-full ring-[1.5px] ring-primary  min-h-[30px] px-3 min-w-[100px]'>Beach time</button>
               <button className='text-primary font-lato rounded-full ring-[1.5px] ring-primary  min-h-[30px] px-3 min-w-[100px]'>Move</button>
               <button className='text-primary font-lato rounded-full ring-[1.5px] ring-primary  min-h-[30px] px-3 min-w-[100px]'>For the Anxious</button>
               <button className='text-primary font-lato rounded-full ring-[1.5px] ring-primary  min-h-[30px] px-3 min-w-[100px]'>Move</button>
            </div>

            
            {/* Occasion filters */}
            <h3 className='w-full font-lato text-[19px] text-secondary font-bold'>Occasion</h3>
                <div className='w-full flex flex-row flex-wrap gap-5 mb-16'>
                    <button className='text-primary font-lato rounded-full ring-[1.5px] ring-primary  min-h-[30px] px-3 min-w-[100px]'>Party</button>
                    <button className='text-primary font-lato rounded-full ring-[1.5px] ring-primary  min-h-[30px] px-3 min-w-[100px]'>Breakup</button>
                    <button className='text-primary font-lato rounded-full ring-[1.5px] ring-primary  min-h-[30px] px-3 min-w-[100px]'>Valentine's</button>
                    <button className='text-primary font-lato rounded-full ring-[1.5px] ring-primary  min-h-[30px] px-3 min-w-[100px]'>Angry</button>
                    <button className='text-primary font-lato rounded-full ring-[1.5px] ring-primary  min-h-[30px] px-3 min-w-[100px]'>Gym</button>
                    <button className='text-primary font-lato rounded-full ring-[1.5px] ring-primary  min-h-[30px] px-3 min-w-[100px]'>Relaxing</button>
                    <button className='text-primary font-lato rounded-full ring-[1.5px] ring-primary  min-h-[30px] px-3 min-w-[100px]'>For the Anxious</button>
                    <button className='text-primary font-lato rounded-full ring-[1.5px] ring-primary  min-h-[30px] px-3 min-w-[100px]'>Move</button>
                </div>
            
            

            <button className='text-white rounded-full w-[186px] h-[46px] bg-primary text-2xl' onClick={() => history('/filtered')}>Filter</button>
        </div>       
    </div>
  )
}
