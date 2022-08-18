import React from 'react'
import { useNavigate } from 'react-router-dom'
import { PlayerData } from '../../firebase'
import { motion } from 'framer-motion'


export default function SongTile({title, duration, img, thumbnailAuthor}) {
    const history = useNavigate()

    const HandleClick = () => {
      PlayerData.changeTitle = title
      PlayerData.changeDuration = duration
      PlayerData.changeImg = img
      PlayerData.changeThumbnailAuthor = thumbnailAuthor

      console.log(PlayerData)
      history('/player')
    }
  return (
    <motion.div initial={{opacity: 0}}  whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.2 }}
    onClick={HandleClick} className='flex flex-col items-start justify-center min-w-[165px]'>
        <img src={img} alt={img} className='h-[136px] min-w-[165px] max-w-[165px] rounded-[12px] object-cover'></img>
        {/* Title */}
        <motion.h4 transition={{delay: 0.5}} initial={{opacity: 0}} animate={{opacity: 1}}
         className='font-lato text-[19px] text-secondary font-medium w-full truncate'>{title}</motion.h4>
        {/* Time */}
        <motion.p transition={{delay: 1}} initial={{opacity: 0}} animate={{opacity: 1}}
        className='font-lato text-[14px] text-tertiary'>{duration}</motion.p>      
    </motion.div>
  )
}
