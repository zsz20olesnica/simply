import React from 'react'
import { Heart, DownArrow } from '../../../Icons'
import { useNavigate } from 'react-router-dom'

export default function Favorites() {

  const history = useNavigate()
  
  return (
    <div className='mainContainer w-full h-full relative'>

        <div className='w-full h-full p-8 bg-white flex flex-col justify-start items-center'>
            <div className='w-full h-auto '>
                <button className='' onClick={() => history('/home')}><DownArrow/></button>
            </div>
            <div className='mt-40 flex flex-col items-center justify-center gap-6'>
                <Heart className={'scale-[250%] !fill-primary'}/>
                <h2 className='font-lato font-bold text-secondary text-[25px] mt-16'>No Favorites</h2>
                <p className='font-lato text-[14px] text-secondary  text-center mx-5'>Start adding moodlists to your favorites by clicking the heart icon</p>
                <h2 className='font-lato mt-9 font-bold text-primary text-[23px]'>Explore simplylists</h2>
            </div>
           
        </div>




        
    </div>
  )
}
