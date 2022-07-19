import React from 'react'
import { LeftArrow } from '../../../Icons'
import { useNavigate } from 'react-router-dom'

import SongTile from '../../Reusable/SongTile'

import FeelingArtsy from '../../../Images/playlist1.png'
import PlayImage from '../../../Images/playlist2.png'
import ImageGruby from '../../../Images/playlist3.png'
import ImageColors from '../../../Images/playlist4.png'
import ImageInsomnia from '../../../Images/playlist5.png'
import ImageDinner from '../../../Images/playlist6.png'
import ImageFiesco from '../../../Images/playlist7.png'
import ImageHorror from '../../../Images/playlist8.png'
import ImageSport from '../../../Images/playlist9.png'

import FilteredCategory from '../../Reusable/FilteredCategory'


export default function Filtered() {

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
            
              <FilteredCategory category={'Gym'}/>
              <FilteredCategory category={'Chill'}/>
             
                    
            </div>
             
             {/* KafelkiContainer */}
            <div className='w-full flex flex-row flex-wrap items-start justify-start gap-5  overflow-y-auto'>
             {/* RowKafelkiContainer */}
              <div className='flex flex-row gap-5'>
                  
                  <SongTile title={'Feel Like Dancing'} img={FeelingArtsy} time={'2 hours'} />
                  
                  <SongTile title={'Be active'} img={ImageSport} time={'5 minutes'} />
              </div>
              {/* RowKafelkiContainer */}
              <div className='flex flex-row gap-5'>

                  <SongTile title={'Eat healthy'} img={ImageDinner} time={'4 days'} />
                 
                  <SongTile title={'I feel like a gruby'} img={ImageGruby} time={'2 weeks'} />
              </div>
              {/* RowKafelkiContainer */}
              <div className='flex flex-row gap-5'>
              <SongTile title={'Halloween suko'} img={ImageHorror} time={'3 minutes'} />
              <SongTile title={'Feel like a kid'} img={ImageInsomnia} time={'20 seconds'} />
              </div>
              {/* RowKafelkiContainer */}
              <div className='flex flex-row gap-5'>
              <SongTile title={'Colorful'} img={ImageColors} time={'1 hour'} />
              <SongTile title={'I feel like a gruby'} img={ImageHorror} time={'20 minutes'} />
              </div>
              {/* RowKafelkiContainer */}
              <div className='flex flex-row gap-5'>
              <SongTile title={'Old school times'} img={PlayImage} time={'69 seconds'} />
              <SongTile title={'Bedoes'} img={ImageFiesco} time={'420 minutes'} />
              </div>
              {/* RowKafelkiContainer */}
              <div className='flex flex-row gap-5'>
              <SongTile title={'I feel like a gruby'} img={ImageGruby} time={'20 minutes'} />
              <SongTile title={'I feel like a gruby'} img={ImageColors} time={'420 minutes'} />
                  
              </div>
              </div>    
        </div>       
    </div>
  )
}
