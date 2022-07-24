import React from 'react'
import { Loupe, Heart, Menu, UpArrow, Pause } from '../../../Icons'
import { useNavigate } from 'react-router-dom'
import PlayImage from '../../../Images/playlist2.png'
import FeelingArtsy from '../../../Images/playlist1.png'
import HomeHero from '../../../Images/home_hero.png'
import NavBar from '../../Reusable/Navbar'
import SongTile from '../../Reusable/SongTile'

import { motion } from 'framer-motion';

export default function Main() {

  const history = useNavigate()
  let viewportHeight = window.innerHeight;
  return (
    <motion.div transition={{duration: 0.5, ease: "easeInOut" }} initial={{y: -viewportHeight}} animate={{y: 0}} exit={{y: -viewportHeight}}
    id="maincontainer" className='mainContainer w-full relative'>

      {/* HeroSection */}
      <div className='w-full h-[410px] relative'>
            <img src={HomeHero} className='absolute z-0 w-full h-full'/>
                <div className='absolute bottom-0 w-full h-[279px] p-8 pt-24 z-1 bg-heroGradient'>
                    <div className='flex flex-col gap-3 z-1'>
                        <p className='h-[28px] w-[87px] flex justify-center items-center rounded-full outline outline-offset-[1.5px] outline-1 '>Featured</p>
                        {/* Title */}
                        <h2 className='text-4xl font-playfair font-extrabold'>Funk Gets<br></br> A Groove</h2>
                        {/* Album Title */}
                        <div className='flex flex-row justify-start items-center gap-2'>
                        <p className='font-lato font-bold text-[14px]'>Fell the Bass</p>
                        {/* Dot */}
                        <div className='w-[5px] h-[5px] rounded-full bg-white'></div>
                        {/* Time */}
                        <p className='font-lato font-bold text-[14px]'>1 hour</p>
                        </div>
                    </div>
            </div>
      </div>
      
      {/* FORYOU Section */}
      <div className='w-full flex flex-col px-4'>
          <h3 className='w-full text-[30px] text-secondary font-playfair font-extrabold my-[18px]'>For you</h3>
          {/* ContainerKafelków */}
          <div className='w-full bg-white flex flex-row gap-2 '>
              <SongTile title={'Feeling Artsy'} time={'2 hours'} img={HomeHero}/>
              <SongTile title={'Feel like dancing'}  time={'30 min'} img={FeelingArtsy}/>
          </div>
      </div>

      {/* POPULAR Section */}
      <div className='w-full flex flex-col px-4'>
          <h3 className='w-full text-[30px] text-secondary font-playfair font-extrabold my-[18px]'>Popular</h3>
          {/* ContainerKafelków */}
          <div className='w-full bg-white flex flex-row gap-2 '>
              <SongTile title={'Feeling Artsy'} time={'2 hours'} img={FeelingArtsy}/>
              <SongTile title={'Feeling Artsy'} time={'2 hours'} img={PlayImage}/>   
          </div>
      </div>
     
        








        {/* SongPlaying */}
        <div className='songplaying bg-white w-full h-[88px] gap-2 flex justify-center items-center fixed z-10 bottom-[56px] shadow-inner'>
              {/* DetailsContainer */}
              <div className='w-full h-full flex flex-row gap-6 justify-center items-center '>
                    
                    {/* Image/Pause Container */}
                    <div className='w-[55px] h-[55px] rounded-full ring-4 ring-primary flex flex-col justify-center items-center relative '>
                        <img src={PlayImage} className='absolute rounded-full h-full'/>
                        <div className='absolute rounded-full h-full w-full bg-[#1D1D1D] opacity-[27%]'></div>
                        <Pause className={'h-[22px] w-[14px] !fill-white bg-transparent absolute'}/>
                    </div>
                    {/* Song title/author container */}
                    <div className='flex flex-col justify-center items-start'>
                        <p className='text-secondary'>Tunes For The Anxious</p>
                        <p className='text-tertiary'>David Manson - The ways to live</p>
                        
                    </div>
                    {/* Arrow */}
                    <div onClick={() => history('/player')}>
                    <UpArrow className={'text-secondary'}/>
                    </div>
              </div>
                  
          </div>

        <NavBar/>
        
    </motion.div>
  )
}
