import {React, useEffect } from 'react'
import { UpArrow, Pause, Play} from '../../../Icons'
import { useNavigate } from 'react-router-dom'


import HorrorImage from '../../../Images/playlist8.png'
import FatImage from '../../../Images/playlist3.png'
import FeelingArtsy from '../../../Images/playlist1.png'
import HeroImage from '../../../Images/home_hero.png'
import NavBar from '../../Reusable/Navbar'
import SongTile from '../../Reusable/SongTile'
import HomeAlbum from '../../Reusable/HomeAlbum'

import SongNavbar from '../../Reusable/SongNavbar'


import { motion } from "framer-motion";
import '../../../vanilla.css'
import { useAudio } from "../../../Contexts/AudioContext"

export default function Main({foryousongs, songs}) {
    
  const {currentSong, setCurrentSong, Album, playPauseSong, IsPaused} = useAudio()

  //Ograniczenie liczby piosenek w for you
  foryousongs.splice(6)

  const history = useNavigate()
  let viewportHeight = window.innerHeight;
  const SiteTitle = 'Home - Simply'
  document.title = SiteTitle
 


//AddPadding
  useEffect(() => {
    if(currentSong)
    {
        const SongPlaying = document.querySelector('#songplaying').clientHeight
        
    }
    else
    {
        const Navbar = document.getElementById('navbar').clientHeight
        const root = document.querySelector(':root')
        root.style.setProperty('--mainPadding', `${Navbar+10 }px`)
    }
    
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

//ScrollAlbums
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
                    <HomeAlbum touchend={(e) => HandleTouchEnd(e.target, 0)}  image={HeroImage} time={'1 hour'} title={'Feel the bass'} album_title={'Funk Gets A Groove'}/>
                    {/* HeroSection */}
                    <HomeAlbum touchend={(e) => HandleTouchEnd(e.target, 1)}  image={FeelingArtsy} time={'2 hours'} title={`Be creative`} album_title={"Let's be creative"}/>
                    {/* HeroSection */}
                    <HomeAlbum touchend={(e) => HandleTouchEnd(e.target, 2)}  image={FatImage} time={'3 hours'} title={`Don't be fat`} album_title={'Go to gym'}/>
                    {/* HeroSection */}
                    <HomeAlbum touchend={(e) => HandleTouchEnd(e.target, 3)}  image={HorrorImage} time={'4 hours'} title={`Are u scared?`} album_title={'Only kids can be scared'}/>
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
              
              {
                foryousongs.map((song) => {

                    return(
                        <SongTile 
                        song={song}
                       />      
                    )
                })
              }
          </div>
      </motion.div>

    {
        
        songs.map((Category) => {
            if(!Category[1].length == 0)
            {
                return(
                <>
                    <motion.div initial={{opacity: 0}}  whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.8 }}
                    className='w-full flex flex-col px-4'>
                        <motion.h3 transition={{delay: 0.1, duration: 0.5}} initial={{x: -120}} animate={{x: 0}}
                        className='w-full text-[30px] text-secondary font-playfair font-extrabold my-[18px]'>{Category[0]}</motion.h3>
                        {/* ContainerKafelków */}
                        <div className='w-full bg-white min-w-full overflow-x-scroll flex flex-row gap-2'>
                            
                        {
                            Category[1].map((song) => {
                                return(
                                <>
                                <SongTile song={song}/>   
                                </>
                            )
                            })
                        }          
                        </div>
                    </motion.div>
                </>
            )
            }    
    })
}
      

        {/* SongPlaying */}
        <SongNavbar isFromMain={true}/>

        <NavBar/>

    </motion.div>
  )
}
