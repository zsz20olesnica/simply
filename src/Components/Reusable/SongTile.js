import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PlayerData, PlaylistFromFavourites } from '../../firebase'
import { motion } from 'framer-motion'
import { useAudio } from '../../Contexts/AudioContext'

export default function SongTile({song, className, imgClassName}) {
    const history = useNavigate()
    const { currentSong, setCurrentSong, PlaylistFromFavourites, setPlaylistFromFavourites } = useAudio()
    
    
    
    
    const HandleClick = () => {
      setCurrentSong(song)
      // PlayerData.splice(0, PlayerData.length)
      // PlayerData.push(song)
      setPlaylistFromFavourites(false)
      history('/player')
    }

    let MainClassName = 'flex flex-col items-start justify-center min-w-[165px]'
    let MainImgClassName = 'h-[136px] min-w-[165px] max-w-[165px] rounded-[12px] object-cover'
    if(className)
    {
      MainClassName = className
    }
    if(imgClassName)
    {
      MainImgClassName = imgClassName
    }


    return (
      <motion.div initial={{opacity: 0}}  whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.2 }}
      onClick={HandleClick} className={MainClassName}>
          <img src={song.songThumbnailLink} alt={'Song'} className={MainImgClassName}></img>
          {/* Title */}
          <motion.h4 transition={{delay: 0.5}} initial={{opacity: 0}} animate={{opacity: 1}}
           className='font-lato text-[19px] text-secondary font-medium w-full truncate'>{song.title}</motion.h4>
          {/* Time */}
          <motion.p transition={{delay: 1}} initial={{opacity: 0}} animate={{opacity: 1}}
          className='font-lato text-[14px] text-tertiary'>{song.duration}</motion.p>      
      </motion.div>
    )
  
 
}
