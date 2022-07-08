import React from 'react'
import { LeftArrow, Settings } from '../../../Icons'
import { useNavigate } from 'react-router-dom'


import FeelingArtsy from '../../../Images/playlist1.png'
import PlayImage from '../../../Images/playlist2.png'
import ImageGruby from '../../../Images/playlist3.png'
import ImageColors from '../../../Images/playlist4.png'
import ImageInsomnia from '../../../Images/playlist5.png'
import ImageDinner from '../../../Images/playlist6.png'
import ImageFiesco from '../../../Images/playlist7.png'
import ImageHorror from '../../../Images/playlist8.png'
import ImageSport from '../../../Images/playlist9.png'


export default function Search() {

  const history = useNavigate()
  
  return (
    <div className='mainContainer w-full h-full relative'>

        <div className='w-full h-full p-8 bg-white flex flex-col justify-start items-start gap-4'>
        
        <div className='w-full h-auto'>
                <button className='' onClick={() => history('/search')}><LeftArrow/></button>
            </div>

            {/* FilterFields */}
            <p className='w-full font-playfair font-extrabold text-secondary text-3xl'>Search</p>
            
            
            <div className='w-full flex flex-row flex-wrap gap-5'>
            
              <button className='relative text-white font-lato rounded-full ring-[1.5px] ring-primary bg-primary  min-h-[30px] px-3 min-w-[100px]'>Hard porn
              <span className='absolute w-[20px] h-[20px] flex justify-center items-center p-2 rounded-full bg-primary font-bold text-sm top-[-8px] right-[-8px] shadow-lg'>X</span>
              </button>
              
              <button className='relative text-white font-lato rounded-full ring-[1.5px] ring-primary bg-primary  min-h-[30px] px-3 min-w-[100px]'>Gym
              <span className='absolute w-[20px] h-[20px] flex justify-center items-center p-2 rounded-full bg-primary font-bold text-sm top-[-8px] right-[-8px] shadow-lg'>X</span>
              </button>
                    
            </div>
             
             {/* KafelkiContainer */}
            <div className='w-full flex flex-row flex-wrap items-start justify-start gap-5  overflow-y-auto'>
             {/* RowKafelkiContainer */}
              <div className='flex flex-row gap-5'>
                  {/* Kafelek */}
                  <div className='w-fit flex flex-col items-start justify-center'>
                            <img src={PlayImage} className='h-[136px] rounded-[12px]'></img>
                            <h4 className='font-lato text-[19px] text-secondary font-bold'>Feel Like Dancing</h4>
                            <p className='font-lato text-[14px] text-tertiary'>2 hours</p>      
                  </div>
                  {/* Kafelek */}
                  <div className='w-fit flex flex-col items-start justify-center'>
                            <img src={ImageGruby} className='h-[136px] rounded-[12px]'></img>
                            <h4 className='font-lato text-[19px] text-secondary font-bold'>I feel like a gruby</h4>
                            <p className='font-lato text-[14px] text-tertiary'>23 minutes</p>      
                  </div>
              </div>
              {/* RowKafelkiContainer */}
              <div className='flex flex-row gap-5'>
                  {/* Kafelek */}
                  <div className='w-fit flex flex-col items-start justify-center'>
                            <img src={PlayImage} className='h-[136px] rounded-[12px]'></img>
                            <h4 className='font-lato text-[19px] text-secondary font-bold'>Feel Like Dancing</h4>
                            <p className='font-lato text-[14px] text-tertiary'>4 hours</p>      
                  </div>
                  {/* Kafelek */}
                  <div className='w-fit flex flex-col items-start justify-center'>
                            <img src={PlayImage} className='h-[136px] rounded-[12px]'></img>
                            <h4 className='font-lato text-[19px] text-secondary font-bold'>Feel Like Dancing</h4>
                            <p className='font-lato text-[14px] text-tertiary'>2 hours</p>      
                  </div>
              </div>
              {/* RowKafelkiContainer */}
              <div className='flex flex-row gap-5'>
                                {/* Kafelek */}
                                <div className='w-fit flex flex-col items-start justify-center'>
                                          <img src={FeelingArtsy} className='h-[136px] rounded-[12px]'></img>
                                          <h4 className='font-lato text-[19px] text-secondary font-bold'>Feeling Artsy</h4>
                                          <p className='font-lato text-[14px] text-tertiary'>1 hour</p>      
                                </div>
                                {/* Kafelek */}
                                <div className='w-fit flex flex-col items-start justify-center'>
                                          <img src={PlayImage} className='h-[136px] rounded-[12px]'></img>
                                          <h4 className='font-lato text-[19px] text-secondary font-bold'>Feel Like Dancing</h4>
                                          <p className='font-lato text-[14px] text-tertiary'>2 hours</p>      
                                </div>
                            </div>
                            {/* RowKafelkiContainer */}
              <div className='flex flex-row gap-5'>
                  {/* Kafelek */}
                  <div className='w-fit flex flex-col items-start justify-center'>
                            <img src={PlayImage} className='h-[136px] rounded-[12px]'></img>
                            <h4 className='font-lato text-[19px] text-secondary font-bold'>Feel Like Dancing</h4>
                            <p className='font-lato text-[14px] text-tertiary'>2 hours</p>      
                  </div>
                  {/* Kafelek */}
                  <div className='w-fit flex flex-col items-start justify-center'>
                            <img src={ImageGruby} className='h-[136px] rounded-[12px]'></img>
                            <h4 className='font-lato text-[19px] text-secondary font-bold'>I feel like a gruby</h4>
                            <p className='font-lato text-[14px] text-tertiary'>23 minutes</p>      
                  </div>
              </div>
              {/* RowKafelkiContainer */}
              <div className='flex flex-row gap-5'>
                  {/* Kafelek */}
                  <div className='w-fit flex flex-col items-start justify-center'>
                            <img src={PlayImage} className='h-[136px] rounded-[12px]'></img>
                            <h4 className='font-lato text-[19px] text-secondary font-bold'>Feel Like Dancing</h4>
                            <p className='font-lato text-[14px] text-tertiary'>2 hours</p>      
                  </div>
                  {/* Kafelek */}
                  <div className='w-fit flex flex-col items-start justify-center'>
                            <img src={ImageGruby} className='h-[136px] rounded-[12px]'></img>
                            <h4 className='font-lato text-[19px] text-secondary font-bold'>I feel like a gruby</h4>
                            <p className='font-lato text-[14px] text-tertiary'>23 minutes</p>      
                  </div>
              </div>
              {/* RowKafelkiContainer */}
              <div className='flex flex-row gap-5'>
                  {/* Kafelek */}
                  <div className='w-fit flex flex-col items-start justify-center'>
                            <img src={PlayImage} className='h-[136px] rounded-[12px]'></img>
                            <h4 className='font-lato text-[19px] text-secondary font-bold'>Feel Like Dancing</h4>
                            <p className='font-lato text-[14px] text-tertiary'>2 hours</p>      
                  </div>
                  
              </div>
              </div>    
        </div>       
    </div>
  )
}
