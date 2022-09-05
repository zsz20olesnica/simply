import React from 'react'
import PlayerHero from '../../Images/hero_player.png'
import {  More } from '../../Icons'
import { motion, Reorder, useDragControls, useMotionValue } from 'framer-motion';
import { PlayerData } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { useAudio } from '../../Contexts/AudioContext';
export default function SongListTile({song, item}) {
  const dragControls = useDragControls();
  const history = useNavigate()
  const { currentSong, setCurrentSong, PlaylistFromFavourites, setPlaylistFromFavourites } = useAudio()
  
  const HandleClick = () => {
    setCurrentSong(song)
    // PlayerData.splice(0, PlayerData.length)
    // PlayerData.push(song)
    setPlaylistFromFavourites(false)
    history('/player')
  }


  return (
    <>

    {/* SongContainer */}
    <div className="w-full h-14 flex flex-row justify-start items-center my-1 px-2 border-b-2 border-gray">
    
            {/* SongImage */}
            <div onClick={HandleClick} className='h-full w-[15%] flex flex-col items-center justify-center'>
              <img src={song.songThumbnailLink} className={'w-12 h-12 object-cover rounded-md'}/>
            </div>
            {/* Title&Authors */}
            <div onClick={HandleClick} className='max-w-[70%] min-w-[70%] flex flex-col justify-center items-start mx-2'>
                <p className='text-secondary font-semibold truncate w-full'>{song.title}</p>
                <p className='text-tertiary'>{song.author}</p>
            </div> 

            {/* ReorderHandle  */}
            <div className='w-[15%] h-full flex items-center justify-center'>  
            <More dragControls={dragControls} className={'rotate-90 scale-[80%] w-7 h-7'}/>
            </div>
    </div>
    </>
  )
}
