import React from "react";
import { LeftArrow } from '../../../Icons'
import { DownArrow, DownArrowWhite, Prev, Next, Pause, Play, More, CastToDevice, Share, Heart } from '../../../Icons'
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import PlayerHero from '../../../Images/hero_player.png'
import '../../../vanilla.css'
import PlayerNavbar from "../../Reusable/AlbumNavbar";
import Navbar from "../../Reusable/Navbar";
import SongListTile from "../../Reusable/SongListTile";

import { motion, Reorder, useDragControls } from 'framer-motion';

export default function AlbumPage({}) {

    let viewportWidth = window.innerWidth;
    const history = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const [IsPaused, setIsPaused] = useState(false) 
    
    // SongsArrayFromDB
    const [items, setItems] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])

    const controls = useDragControls()
    const HandleMoreOptions = () => {
        setIsOpen(!isOpen)
      }

    //AddPadding
    useEffect(() => {
        const SongPlaying = document.querySelector('#songplaying').clientHeight
        const root = document.querySelector(':root')
        root.style.setProperty('--mainPadding', `${SongPlaying +10}px`)

    }, [])

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
                <span className='h-full min-w-[160px] flex justify-center items-center bg-white opacity-90 rounded-full text-tertiary text-[14px] p-1'>Art by someone</span>
            </div>
            {/* AlbumTitle */}
            <h1 className='font-playfair font-extrabold text-[32px] break-normal min-w-[70%] text-secondary  '>Feeling Arty Farty</h1>

            <div className='flex flex-row items-center gap-5'>
                    <p className='text-[14px] text-tertiary font-lato'>35 min</p>
                    <div className='w-[5px] h-[5px] rounded-full bg-tertiary'></div>
                    <p className='text-[14px] text-tertiary font-lato'>7 tracks</p>  
                    <div className='h-[40px] w-[40px] rounded-full bg-primary'>
                        <Play className={'h-[40px] w-[40px]'}  second_fill={'#fff'}/>    
                    </div>
            </div>
            
        </div>
        <Reorder.Group axis="y" onReorder={setItems} values={items}>
            {items.map(item => (
                <SongListTile key={item} item={item} image={PlayerHero} title={'Grill u Gawrona'} authors={'Białas, Lanek'}/>
            ))}    
        </Reorder.Group>
    </div>
    
    <PlayerNavbar/>
   
    </motion.div>
    </>
    )
      
    }
  
  