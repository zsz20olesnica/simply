import React, { useEffect } from 'react'
import { DownArrow } from '../../../Icons'
import { useNavigate } from 'react-router-dom'
import OccasionCategories from '../../Reusable/OccasionCategories'
import MoodCategories from '../../Reusable/MoodCategories'

import { motion } from 'framer-motion';
import { Categories } from '../../../firebase'


export default function Search() {

  const history = useNavigate()
  let viewportHeight = window.innerHeight;
  const SiteTitle = 'Search - Simply'
  document.title = SiteTitle
  
  
  useEffect(() => {
    //Clear Array
    Categories.splice(0, Categories.length)
    console.log(Categories)
  }, [])
  
  

  return (
    <motion.div transition={{duration: 0.5, ease: "easeInOut" }} initial={{y: viewportHeight, opacity: 0}} 
    animate={{y: 0, opacity: 1}} exit={{y: viewportHeight, opacity: 0}} 
    id='container' className='mainContainer w-full h-full relative'>

        <div className='w-full h-full p-8 bg-white flex flex-col justify-between items-center gap-4'>
            <div className='w-full h-auto'>
                <button onClick={() => history('/home')} className=''><DownArrow/></button>
            </div>

            {/* SearchField */}
            <p className='w-full font-playfair font-extrabold text-secondary text-3xl'>Search</p>
            <input placeholder='Search for artists and moods' type='text' className='w-full h-11 rounded-full bg-search px-5 text-secondary focus:outline-primary'></input>

            
            {/* MoodFilters */}
            <h3 className='w-full font-lato text-[19px] text-secondary font-bold'>Mood</h3>
            <div className='w-full flex flex-row flex-wrap gap-3'>
                  <MoodCategories category={'Calm'} />
                  <MoodCategories category={'Chill'} />
                  <MoodCategories category={'Happy'} />
                  <MoodCategories category={'Sad'} />
                  <MoodCategories category={'Angry'} />
                  <MoodCategories category={'Lonely'} />
                  <MoodCategories category={'Gloomy'} />
                  <MoodCategories category={'Hopeful'} />
                  <MoodCategories category={'Romantic'} />
            </div>

            
            {/* Occasion filters */}
            <h3 className='w-full font-lato text-[19px] text-secondary font-bold'>Occasion</h3>
            <div className='w-full flex flex-row flex-wrap gap-3 mb-16'>
                  <OccasionCategories category={'Party'} />
                  <OccasionCategories category={'Reading'} />
                  <OccasionCategories category={'Dancing'} />
                  <OccasionCategories category={'Christmas'} />
                  <OccasionCategories category={'Gym'} />
                  <OccasionCategories category={'Date'} />
                  <OccasionCategories category={'Car'} />
                  <OccasionCategories category={'Learning'} />
            </div>
            
            

            <button className='text-white rounded-full w-[186px] h-[46px] bg-primary text-2xl' onClick={() => history('/filtered')}>Filter</button>
        </div>       
    </motion.div>
  )
}
