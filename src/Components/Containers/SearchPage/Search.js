import React from 'react'
import { Heart, DownArrow } from '../../../Icons'
import { useNavigate } from 'react-router-dom'
import OccasionCategories from '../../Reusable/OccasionCategories'
import MoodCategories from '../../Reusable/MoodCategories'

import {handleDownAnim} from '../../../Utils/Animations'

export default function Search() {

  const history = useNavigate()
  
  return (
    <div id='container' className='animation_container_up mainContainer w-full h-full relative'>

        <div className='w-full h-full p-8 bg-white flex flex-col justify-between items-center gap-4'>
            <div className='w-full h-auto'>
                <button onClick={() => handleDownAnim(()=>{ history('/home')})} className=''><DownArrow/></button>
            </div>

            {/* SearchField */}
            <p className='w-full font-playfair font-extrabold text-secondary text-3xl'>Search</p>
            <input placeholder='Search for artists and moods' type='text' className='w-full h-11 rounded-full bg-search px-5 text-secondary focus:outline-primary'></input>

            
            {/* MoodFilters */}
            <h3 className='w-full font-lato text-[19px] text-secondary font-bold'>Mood</h3>
            <div className='w-full flex flex-row flex-wrap gap-3'>
               <MoodCategories category={'Move'}/>
               <MoodCategories category={'Sad'}/>
               <MoodCategories category={'Chill'}/>
               <MoodCategories category={'Hard porn'}/>
               <MoodCategories category={'Beach time'}/>
               <MoodCategories category={'Reading'}/>
               <MoodCategories category={'For black people'}/>
               <MoodCategories category={'Angry'}/>
            </div>

            
            {/* Occasion filters */}
            <h3 className='w-full font-lato text-[19px] text-secondary font-bold'>Occasion</h3>
                <div className='w-full flex flex-row flex-wrap gap-3 mb-16'>
                    <OccasionCategories category={'Party'}/>
                    <OccasionCategories category={'Chill'}/>
                    <OccasionCategories category={'Breakup'}/>
                    <OccasionCategories category={'Angry'}/>
                    <OccasionCategories category={'Gym'}/>
                    <OccasionCategories category={'Relaxing'}/>
                    <OccasionCategories category={'For the gays'}/>
                    <OccasionCategories category={'Move'}/>
                </div>
            
            

            <button className='text-white rounded-full w-[186px] h-[46px] bg-primary text-2xl' onClick={() => history('/filtered')}>Filter</button>
        </div>       
    </div>
  )
}
