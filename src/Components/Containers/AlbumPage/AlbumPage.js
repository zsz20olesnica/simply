import React, { createContext } from "react";
import { LeftArrow } from '../../../Icons'
import { DownArrow, DownArrowWhite, Prev, Next, Pause, Play, More, CastToDevice, Share, Heart } from '../../../Icons'
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import PlayerHero from '../../../Images/hero_player.png'
import '../../../vanilla.css'
import PlayerNavbar from "../../Reusable/AlbumNavbar";
import Navbar from "../../Reusable/Navbar";
import SongListTile from "../../Reusable/SongListTile";

import { PlayerData } from '../../../firebase'

import { motion, Reorder, useDragControls } from 'framer-motion';

export default function AlbumPage() {

    let viewportWidth = window.innerWidth;
    const history = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const [IsPaused, setIsPaused] = useState(false) 
    const SiteTitle = 'Album - Simply'
    document.title = SiteTitle
    const [TracksCount, setTracksCount] = useState(0)
    const [AlbumDuration, setAlbumDuration] = useState("")
    let AlbumDurationNotState = "00:00"

    useEffect(() => {  
        setTracksCount(0)
        function padTo2Digits(num) {
            return num.toString().padStart(2, '0');
        }

        function CalcAlbumDuration(SongDuration) {
            
            //SplitString
            SongDuration = SongDuration.split(":")
            let AlbumDurationSplitted = AlbumDurationNotState.split(":")

            let SongMinutes = SongDuration[0]
            let SongSeconds = SongDuration[1]

            let AlbumMinutes = AlbumDurationSplitted[0]
            let AlbumSeconds = AlbumDurationSplitted[1]


            //Change String To INT
            AlbumMinutes = parseInt(AlbumMinutes, 10)
            AlbumSeconds = parseInt(AlbumSeconds, 10)
            SongMinutes = parseInt(SongMinutes, 10)
            SongSeconds = parseInt(SongSeconds, 10)
            
          
            
            let AlbumDurationInSeconds = AlbumSeconds + (AlbumMinutes * 60)
            let SongDurationInSeconds = SongMinutes * 60 + SongSeconds

            let TotalSeconds  = AlbumDurationInSeconds+SongDurationInSeconds 

            
            let AlbumMinutesAmount = Math.floor(TotalSeconds / 60)
            let AlbumSecondsAmount = Math.round(TotalSeconds % 60)

            setAlbumDuration(`${padTo2Digits(AlbumMinutesAmount)}:${padTo2Digits(AlbumSecondsAmount)}`)
            AlbumDurationNotState = `${padTo2Digits(AlbumMinutesAmount)}:${padTo2Digits(AlbumSecondsAmount)}`
           
            

            console.log(`Dlugosc trwania albumu: ` + AlbumDuration)
        }
        
        
        PlayerData.albumData.forEach((song) => {
            CalcAlbumDuration(song.duration)
            setTracksCount((prev) => prev+1)
        })
        


        const SongPlaying = document.querySelector('#songplaying').clientHeight
        const root = document.querySelector(':root')
        root.style.setProperty('--mainPadding', `${SongPlaying +10}px`)
    }, [])



    

    // SongsArrayFromDB
    const [items, setItems] = useState([0, 1, 2, 3, 4, 5])

    const controls = useDragControls()
    const HandleMoreOptions = () => {
        setIsOpen(!isOpen)
      }

    

   

    return (
        <>
    <motion.div  transition={{duration: 0.5, ease: "easeInOut" }} initial={{x: viewportWidth, opacity: 0}} 
    animate={{x: 0, opacity: 1}} exit={{x: viewportWidth, opacity: 0}}>
    <div id='maincontainer' className='mainContainer w-full h-full relative'>

        <div className='w-full h-[250px] bg-slate-200 p-8 flex flex-col justify-between items-center'>
            
            {/* HeaderContainer */}
            <div className='w-full h-auto flex flex-row justify-between items-center'>
                {/* BackArrow */}
                <button className=''
                onClick={() => history('/home')}
                ><LeftArrow/></button>
                {/* Author */}
                <span className='h-full min-w-[160px] flex justify-center items-center bg-white opacity-90 rounded-full text-tertiary text-[14px] p-1'>{PlayerData.thumbnailAuthor}</span>
            </div>
            {/* AlbumTitle */}
            <h1 className='font-lato font-extrabold text-[32px] text-center break-normal min-w-[70%] text-secondary'>{PlayerData.albumName}</h1>

            <div className='flex flex-row items-center gap-5'>
                    <p className='text-[14px] text-tertiary font-lato'>{AlbumDuration}</p>  
                    <div className='w-[5px] h-[5px] rounded-full bg-tertiary'></div>
                    <p className='text-[14px] text-tertiary font-lato'>{TracksCount}</p>  
                    <div className='h-[40px] w-[40px] rounded-full bg-primary'
                    onClick={() => {setIsPaused(!IsPaused)}}>
                        {
                        IsPaused
                        ?                 
                        <Pause  className={'h-full w-full scale-[55%]'} first_fill={'#fff'} second_fill={'#fff'}/>               
                        :             
                        <Play className={'h-[40px] w-[40px]'}  second_fill={'#fff'}/>
                        }  
                    </div>
            </div>
            
        </div>
        <Reorder.Group axis="y" onReorder={setItems} values={items}>
             {
                PlayerData.albumData.map((song) => {      
                   return(
                    <SongListTile key={song.title} song={song}/>
                   )
                })
            }     
        </Reorder.Group>
    </div>
    
    <PlayerNavbar/>
   
    </motion.div>
    </>
    )
      
    }
  
  