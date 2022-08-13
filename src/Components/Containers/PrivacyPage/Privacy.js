import React from 'react'
import { LeftArrow } from '../../../Icons'
import { useNavigate } from 'react-router-dom'
import { appVersion } from '../../../firebase'
export default function Privacy() {

  const history = useNavigate()
  const SiteTitle = 'Privacy - Simply'
  document.title = SiteTitle

  return (
    <div className='mainContainer w-full h-full relative'>
        <div className='w-full h-full p-8 bg-white flex flex-col justify-between items-center'>
            {/* BackArrow */}
            <div className='w-full h-auto'>
                <button className='' onClick={() => history('/settings')}><LeftArrow/></button>
            </div>
            {/* SettingsContainer */}
            <div className='mb-20 w-full flex flex-col justify-between items-center gap-5 text-secondary'>
                <p className='text-tertiary'>There are no privacy settings available in your country.</p>
                

            {/* ChangePassword */}
              <div className='w-full flex flex-col items-center justify-center gap-5 mt-10'>
              <p className='w-full text-[19px] font-lato text-secondary'>Change password</p>
                  {/* OldPassword */}
                  <input placeholder='Type your old password' type='password' className='w-full h-11 rounded-full bg-search px-5 text-secondary focus:outline-error'></input>
                  {/* IfPasswordChangeFailed/To sie powinno pokazywac jak sie zle wpisze haslo w sensie takie poza tymi wymogami */}
                  <p className='text-[14px] font-lato text-error'>Password should be at least 8 characters long and contain special characters.</p>
                  {/* NewPassword */}
                  <input placeholder='Type your new password' type='password' className='w-full h-11 rounded-full bg-search px-5 text-secondary focus:outline-primary'></input>
                  {/* ConfrimButton */}
                  <button className='w-[200px] h-11 my-[16px] mt-[25px] text-lg rounded-full bg-primary font-lato text-white'>Change Password</button> 
              </div>
                

            </div>
            {/* Footer */}
            <div className='w-full flex flex-row justify-between items-center'>
                <p className='text-tertiary'>App version {appVersion}</p>
                <p className='text-primary font-playfair text-2xl'>Simply</p>
              </div>
        </div>  
    </div>
  )
}
