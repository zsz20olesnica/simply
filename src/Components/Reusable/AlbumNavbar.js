import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UpArrow, Pause, Play} from '../../Icons'
import PlayImage from '../../Images/playlist2.png'
import { PlayerData } from '../../firebase'
export default function PlayerNavbar() {
    const history = useNavigate()
    const [IsPaused, setIsPaused] = useState('false')



    
  return (
    <>
        {/* SongPlaying */}
        <div  id='songplaying' className='songplaying bg-white w-full h-[88px] gap-2 flex justify-center items-center fixed z-10 bottom-0 shadow-inner'>
              {/* DetailsContainer */}
              <div className='w-full h-full flex flex-row gap-3 justify-center items-center mx-3'>

                    {/* Image/Pause Container */}
                    <div className='w-[20%] flex items-center justify-center'>
                        <div onClick={() => {setIsPaused(!IsPaused)}} className='w-[55px] h-[55px] rounded-full ring-4 ring-primary flex flex-col justify-center items-center relative '>
                                <img src={PlayerData.img} className='absolute rounded-full h-full w-full object-cover'/>

                                <div className='absolute rounded-full h-full w-full bg-[#1D1D1D] bg-opacity-[40%]'>

                                    <div className='w-full h-full flex flex-row justify-center items-center'>
                                    {IsPaused? <Pause className={'!fill-white w-6 h-6 '}/>:<Play className={'w-10 h-10'}second_fill='#fff'/>}
                                </div>
                            </div>
                        </div> 
                    </div>
                    
                    {/* Song title/author container */}
                    <div className='w-[60%] flex flex-col justify-center items-start'>
                        {/* Title */}
                        <p className='text-secondary max-w-[90%] truncate'>{PlayerData.title}</p>
                        {/* AlbumName */}
                        <p className='text-tertiary'>{PlayerData.albumName}</p>

                    </div>
                    {/* Arrow */}
                    <div onClick={() => history('/player')} className='w-[10%] flex items-center justify-center'>
                    <UpArrow className={'text-secondary'}/>
                    </div>
              </div>

        </div>
    </>
  )
}
