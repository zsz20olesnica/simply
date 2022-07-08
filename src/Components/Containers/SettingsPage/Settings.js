import React from 'react'
import { Switch, DownArrow } from '../../../Icons'
import { useNavigate } from 'react-router-dom'

export default function Settings() {

  const history = useNavigate()
  
  return (
    <div className='mainContainer w-full h-full relative'>

        <div className='w-full h-full p-8 bg-white flex flex-col justify-between items-cetner'>
            {/* BackArrow */}
            <div className='w-full h-auto'>
                <button className='' onClick={() => history('/home')}><DownArrow/></button>
            </div>
            {/* SettingsContainer */}
            <div className='mb-20 w-full flex flex-col justify-center items-start gap-4 text-secondary'>
              <ul className='w-full'>
                <li className='flex flex-col justify-center items-start mt-10'>
                <p className='text-[19px] font-lato text-secondary'>Push Notifications</p>
                <p className='text-[14px] font-lato text-tertiary'>Currently on</p>
                </li>

                <li className='flex flex-col justify-center items-start mt-10'>
                <p className='text-[19px] font-lato text-secondary'>Account & privacy</p>
                <p className='text-[14px] font-lato text-tertiary'>Manage password and your account</p>
                </li>

                <li className='w-full flex flex-row justify-between items-center mt-10'>
                <div>
                    <p className='text-[19px] font-lato text-secondary'>Dark Mode</p>
                    <p className='text-[14px] font-lato text-tertiary'>Currently off</p>
                </div>
                <Switch className={'scale-[70%]'}/>
                </li>

                <li className='flex flex-coljustify-start items-center mt-10'>
                <p className='text-[19px] font-lato text-secondary'>About</p>       
                </li>

                <li className='flex flex-col justify-center items-start mt-10'>
                <p className='text-[19px] font-lato text-secondary'>Feedback</p>       
                </li>
              </ul>

              <ul className='w-full h-[60px] mt-32 mb-20'>
                <li className='flex flex-col justify-center items-start'>
                <p className='text-[19px] font-lato text-error'>Delete Account</p>
                </li>
                <li className='flex flex-col justify-center items-start mt-5'>
                <p className='text-[19px] font-lato text-secondary'>Sign Out</p>
                </li>
              </ul>
            </div>
            {/* Footer */}
            <div className='w-full flex flex-row justify-between items-center '>
                <p className='text-tertiary'>App version 0.1</p>
                <p className='text-primary font-playfair text-2xl'>Simply</p>
              </div>
        </div>  
    </div>
  )
}
