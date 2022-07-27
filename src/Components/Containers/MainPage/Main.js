import {React, useState, useRef, useEffect } from 'react'
import { Loupe, Heart, Menu, UpArrow, Pause, Play} from '../../../Icons'
import { useNavigate } from 'react-router-dom'
import HorrorImage from '../../../Images/playlist8.png'
import FatImage from '../../../Images/playlist3.png'
import PlayImage from '../../../Images/playlist2.png'
import FeelingArtsy from '../../../Images/playlist1.png'
import HeroImage from '../../../Images/home_hero.png'

import NavBar from '../../Reusable/Navbar'
import SongTile from '../../Reusable/SongTile'
import HomeAlbum from '../../Reusable/HomeAlbum'

import { motion } from "framer-motion";

import '../../../vanilla.css'
import { ElementFlags } from 'typescript'
import { comment } from 'postcss'

export default function Main() {

  const history = useNavigate()
  let viewportHeight = window.innerHeight;
  const [IsPaused, setIsPaused] = useState('false')
  const SiteTitle = 'Home-Simply'
  document.title = SiteTitle


//AddPadding
  useEffect(() => {
    const SongPlaying = document.querySelector('#songplaying').clientHeight
    const Navbar = document.getElementById('navbar').clientHeight
    const root = document.querySelector(':root')

    root.style.setProperty('--mainPadding', `${SongPlaying + Navbar+10}px`)

  }, [])
  

//Utility
function isInViewport(element) {
    if(element) 
    {
        let myElementHeight = element.offsetHeight;
        let myElementWidth = element.offsetWidth;
        let bounding = element.getBoundingClientRect();
            
            if (bounding.top >= -myElementHeight 
                && bounding.left >= -myElementWidth
                && bounding.right <= (window.innerWidth || document.documentElement.clientWidth) + myElementWidth
                && bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) + myElementHeight) 
                {
                    return true
                } 
                else 
                {
                    return false
                }
    }
    else
    {
        
        return false
    }
}


let dots;
let albums;

useEffect(() => {
    dots  = Array.from(document.getElementsByClassName('dots'))
    albums = Array.from(document.getElementsByClassName('homealbum'))
}, [])


    const HandleTouchEnd = (element, index) => 
    {
        console.log(index)
        let prev = albums[index-1]
        let next = albums[index+1]
        if(isInViewport(prev))
        {
            console.log('Prev is in the viewport!')
            dots[index-1].classList.add('bg-white')
            dots[index].classList.remove('bg-white')
            dots[index+1].classList.remove('bg-white')
        }
        else if (isInViewport(next))
        {
            console.log('Next is in the viewport!')
            dots[index+1].classList.add('bg-white')
            dots[index].classList.remove('bg-white')
            dots[index-1].classList.remove('bg-white')
        }
        else
        {
            console.log('Original is in the viewport!')
            dots[index].classList.add('bg-white')
            dots[index+1].classList.remove('bg-white')
            dots[index-1].classList.remove('bg-white')
        }
    }


  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}}
    id="maincontainer" className='mainContainer w-full relative'>
    <div className='w-full h-[420px] relative'>
            <div className='absolute w-full h-full'>
                <div id={'someid'} className='gallerycontainer min-w-full overflow-x-scroll srcoll whitespace-nowrap flex gap-[1px] flex-row snap-x snap-mandatory'>

                    {/* HeroSection */}
                    <HomeAlbum touchend={(e) => HandleTouchEnd(e.target, 0)}  image={HeroImage} time={'1 hour'} title={'Feel the bass'} album_title={'Funk Gets A Groove Like A Nigger'}/>
                    {/* HeroSection */}
                    <HomeAlbum touchend={(e) => HandleTouchEnd(e.target, 1)}  image={FeelingArtsy} time={'2 hours'} title={`Don't be gay`} album_title={'I hate gays'}/>
                    {/* HeroSection */}
                    <HomeAlbum touchend={(e) => HandleTouchEnd(e.target, 2)}  image={FatImage} time={'3 hours'} title={`Don't be fat David Mat`} album_title={'Go to fucking gym fat David '}/>
                    {/* HeroSection */}
                    <HomeAlbum touchend={(e) => HandleTouchEnd(e.target, 3)}  image={HorrorImage} time={'4 hours'} title={`Are u scared?`} album_title={'Only pussy can be scared'}/>
                </div>
            </div>

            <div className='absolute bottom-0 left-0 w-full pb-[15px]'>
                <div className='w-full flex flex-row justify-center items-center gap-2 self-center'>
                    <div id='dot0' className='dots w-[11px] h-[11px] rounded-full bg-white border-2'></div>
                    <div id='dot1' className='dots w-[11px] h-[11px] rounded-full border-2'></div>
                    <div id='dot2' className='dots w-[11px] h-[11px] rounded-full border-2'></div>
                    <div id='dot3' className='dots w-[11px] h-[11px] rounded-full border-2'></div>
                </div>
            </div>
    </div>

      {/* FORYOU Section */}
      <motion.div initial={{opacity: 0}}  whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.8 }}
      className='w-full flex flex-col px-4'>
          <motion.h3 transition={{delay: 0.1, duration: 0.5}} initial={{x: -120}} animate={{x: 0}}
          className='w-full text-[30px] text-secondary font-playfair font-extrabold my-[18px]'>For you</motion.h3>
          {/* ContainerKafelków */}
          <div className='min-w-full overflow-x-scroll whitespace-nowrap bg-white flex flex-row gap-2 '>
              <SongTile title={'Feeling Artsy'} time={'2 hours'} img={HeroImage}/>
              <SongTile title={'Feel like dancing'}  time={'30 min'} img={FeelingArtsy}/>
              <SongTile title={'Feel like dancing'}  time={'30 min'} img={FeelingArtsy}/>
              <SongTile title={'Feel like dancing'}  time={'30 min'} img={FeelingArtsy}/>
              <SongTile title={'Feel like dancing'}  time={'30 min'} img={FeelingArtsy}/>
          </div>
      </motion.div>

      {/* POPULAR Section */}
      <motion.div initial={{opacity: 0}}  whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.8 }}
      className='w-full flex flex-col px-4'>
          <motion.h3 transition={{delay: 0.1, duration: 0.5}} initial={{x: -120}} animate={{x: 0}}
          className='w-full text-[30px] text-secondary font-playfair font-extrabold my-[18px]'>Popular</motion.h3>
          {/* ContainerKafelków */}
          <div className='w-full bg-white flex flex-row gap-2'>
              <SongTile title={'Feeling Artsy'} time={'2 hours'} img={FeelingArtsy}/>
              <SongTile title={'Feeling Artsy'} time={'2 hours'} img={PlayImage}/>
          </div>
      </motion.div>

      <motion.div initial={{opacity: 0}}  whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.8 }}
      className='w-full flex flex-col px-4'>
          <motion.h3 transition={{delay: 0.1, duration: 0.5}} initial={{x: -120}} animate={{x: 0}}
          className='w-full text-[30px] text-secondary font-playfair font-extrabold my-[18px]'>Popular</motion.h3>
          {/* ContainerKafelków */}
          <div className='w-full bg-white flex flex-row gap-2'>
              <SongTile title={'Feeling Artsy'} time={'2 hours'} img={FeelingArtsy}/>
              <SongTile title={'Feeling Artsy'} time={'2 hours'} img={PlayImage}/>
          </div>
      </motion.div>
      <motion.div initial={{opacity: 0}}  whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.8 }}
      className='w-full flex flex-col px-4'>
          <motion.h3 transition={{delay: 0.1, duration: 0.5}} initial={{x: -120}} animate={{x: 0}}
          className='w-full text-[30px] text-secondary font-playfair font-extrabold my-[18px]'>Popular</motion.h3>
          {/* ContainerKafelków */}
          <div className='w-full bg-white flex flex-row gap-2'>
              <SongTile title={'Feeling Artsy'} time={'2 hours'} img={FeelingArtsy}/>
              <SongTile title={'Feeling Artsy'} time={'2 hours'} img={PlayImage}/>
          </div>
      </motion.div>
      <motion.div initial={{opacity: 0}}  whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.8 }}
      className='w-full flex flex-col px-4'>
          <motion.h3 transition={{delay: 0.1, duration: 0.5}} initial={{x: -120}} animate={{x: 0}}
          className='w-full text-[30px] text-secondary font-playfair font-extrabold my-[18px]'>Popular</motion.h3>
          {/* ContainerKafelków */}
          <div className='w-full bg-white flex flex-row gap-2'>
              <SongTile title={'Feeling Artsy'} time={'2 hours'} img={FeelingArtsy}/>
              <SongTile title={'Feeling Artsy'} time={'2 hours'} img={PlayImage}/>
          </div>
      </motion.div>
      <motion.div initial={{opacity: 0}}  whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.8 }}
      className='w-full flex flex-col px-4'>
          <motion.h3 transition={{delay: 0.1, duration: 0.5}} initial={{x: -120}} animate={{x: 0}}
          className='w-full text-[30px] text-secondary font-playfair font-extrabold my-[18px]'>Popular</motion.h3>
          {/* ContainerKafelków */}
          <div className='w-full bg-white flex flex-row gap-2'>
              <SongTile title={'Feeling Artsy'} time={'2 hours'} img={FeelingArtsy}/>
              <SongTile title={'Feeling Artsy'} time={'2 hours'} img={PlayImage}/>
          </div>
      </motion.div>



        {/* SongPlaying */}
        <div  id='songplaying' className='songplaying bg-white w-full h-[88px] gap-2 flex justify-center items-center fixed z-10 bottom-[56px] shadow-inner'>
              {/* DetailsContainer */}
              <div className='w-full h-full flex flex-row gap-6 justify-center items-center '>

                    {/* Image/Pause Container */}
                    <div onClick={() => {setIsPaused(!IsPaused)}} className='w-[55px] h-[55px] rounded-full ring-4 ring-primary flex flex-col justify-center items-center relative '>
                        <img src={PlayImage} className='absolute rounded-full h-full'/>
                        <div className='absolute rounded-full h-full w-full bg-[#1D1D1D] bg-opacity-[40%]'>
                            <div className='w-full h-full flex flex-row justify-center items-center'>
                            {IsPaused? <Pause className={'!fill-white w-6 h-6 '}/>:<Play className={'w-10 h-10'}second_fill='#fff'/>}
                            </div>
                        </div>


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
