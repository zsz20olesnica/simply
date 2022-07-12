import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import { DownArrow, DownArrowWhite, Prev, Next, Pause, Play, More, CastToDevice, Share, Heart } from '../../../Icons'
import { useNavigate } from 'react-router-dom'
import PlayerHero from '../../../Images/hero_player.png'
import '../../../vanilla.css'

import {handleDownAnim} from '../../../Utils/Animations'


export default function Player() {

    const history = useNavigate()
    const [isOpen, setIsOpen] = useState(false)



  const MoreOptionss = ({ isOpenn }) => {
    return(
    <>
        <div className={`${isOpenn ? 'block' : 'hidden'} absolute h-[147px] w-[226px] rounded-xl bg-white shadow-2xl`}>

            <ul className='w-full  h-full flex flex-col items-start justify-center divide-y divide-solid'>
                <li className='w-full p-6 h-1/3 flex flex-row items-center justify-start gap-6'>
                    <Heart className={'fill-secondary w-6 h-6'}/>
                    <p className='text-secondary text-[14px] font-lato'>Add to Favorites</p>
                </li>
                <li className='w-full  p-6 h-1/3 flex flex-row items-center justify-start gap-6'>
                    <Share className={'fill-secondary w-6 h-6'}/>
                    <p className=' text-secondary text-[14px] font-lato'>Share</p>
                </li>
                <li className='w-full p-6 h-1/3 flex flex-row items-center justify-start gap-6'>
                    <CastToDevice className={'fill-secondary w-6 h-6'}/>
                    <p className=' text-secondary text-[14px] font-lato'>Cast to Device</p>
                </li>
            </ul>

        </div>
    </>)
  }

  const HandleMoreOptions = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div id='container' className='animation_container_up mainContainer w-full h-full relative'>

      <div className='absolute z-100 w-full h-full p-8 flex flex-col justify-between items-center'>
            {/* HeaderContainer */}
            <div className='w-full h-auto flex flex-row justify-between items-center'>
                {/* BackArrow */}
                <button className='' onClick={() => handleDownAnim(()=>{ history('/home')})}><DownArrowWhite/></button>
                {/* Author */}
                <span className='h-full min-w-[160px] flex justify-center items-center bg-white opacity-90 rounded-full text-tertiary text-[14px] p-1'>Art by someone</span>
            </div>

                     </div>
      {/* HeroSection */}
      <div className='w-full h-[60%]'>
            <img src={PlayerHero} className='top-0 z-0 w-full h-full object-cover'/>
    </div>


    {/* Container */}
    <div className='w-full h-[40%] px-8 flex flex-col items-center justify-between py-10 relative'>
    <MoreOptionss isOpenn={isOpen}/>
            {/* Title/Time Container */}
            <div className='w-full h-[32%] flex flex-col justify-center items-start gap-5'>
            {/* Title */}
                <div className='h-full w-full flex flex-row items-center justify-between'>
                    {/* Trzeba zrobic ze jak jest za dlugi tytuł to sie przesuwa jak slider automatycznie */}
                    <h1 className='font-playfair font-extrabold text-[32px] break-normal min-w-[70%] text-secondary '>Feeling Arty Farty</h1>
                    <div onClick={() => {HandleMoreOptions()}} className='min-w-[20%] h-full flex flex-col items-center justify-start mt-7'>
                        <More className={'scale-90'}/>
                    </div>
                </div>
            {/* Time and number of items */}
                <div className='flex flex-row items-center gap-2'>
                    <p className='text-[14px] text-tertiary font-lato'>35 min</p>
                    <div className='w-[5px] h-[5px] rounded-full bg-tertiary'></div>
                    <p className='text-[14px] text-tertiary font-lato'>7 tracks</p>
                </div>
            </div>

            {/* Next Container */}
            <div className='w-full flex flex-col gap-3'>
                <div className='flex flex-row'>
                    <p className='text-[14px] text-tertiary font-lato'>Playing next</p>
                    <p className='text-[14px] text-secondary font-lato font-bold ml-5'>David Manson - The ways to live</p>
                </div>

                {/* Time and slider */}
                <div className='w-full '>
                        <input type="range" id="PlayerSlider" defaultValue="0" className='w-full h-2'></input>
                        <p className='font-lato text-[12px] text-tertiary'>00:00</p>
                </div>

                {/* Music controler */}
                <div className='flex flex-row justify-center items-center gap-16'>
                    <Prev className={'!fill-primary'}/>
                    <Play className={'!fill-primary'}/>
                    <Next className={'!fill-primary'}/>
                </div>
            </div>
          </div>
    </div>
  )
}
