import  { React, useEffect, useState } from 'react'
import { DownArrow, Play } from '../../../Icons'
import { useNavigate } from 'react-router-dom'
import '../../../vanilla.css'
import { useAudio } from "../../../Contexts/AudioContext"
import { db, auth } from '../../../firebase'
import { doc, getDoc } from "firebase/firestore"; 

import SongTile from '../../Reusable/SongTile'
import { motion } from 'framer-motion';





export default function Favourites() {

  const { Playlist, currentSong, PlaylistFromFavourites } = useAudio()

  const history = useNavigate()
  let viewportHeight = window.innerHeight;
  const SiteTitle = 'Favourites - Simply'
  document.title = SiteTitle
  const [UserHasFavourites, setUserHasFavourites] = useState(false)
  const [FavouritesSongs, setFavouritesSongs] = useState([])
  const [FavouritesSongsFromDB, setFavouritesSongsFromDB] = useState([])
  let Fav = []
  let PlaylistData = Playlist
  let PlayerData = currentSong
 
  

  useEffect(() => {
    
    const GetData = async () => {
      const docRef = doc(db, "users", auth.currentUser.uid)
      const docSnap = await getDoc(docRef)
      
      if(docSnap.data().favouritesSongs.length > 0)
      {
        console.log('User has favourites')
        setUserHasFavourites(true)
        Fav = docSnap.data().favouritesSongs
        console.log('Fav ==' , Fav)
        setFavouritesSongs(Fav)
      }
      else
      {
        console.log('User has no favourites')
        setUserHasFavourites(false)
      }
    }

    GetData()
  }, []);


  useEffect(() => {
    
    //ClearFavouritesSongsFromDB
    setFavouritesSongsFromDB([])
    let SongsArray = []
    
    const GetSongsFromDB = async () => {
      FavouritesSongs.forEach( async (song) => {
        
        const docReference = doc(db, "songs", song)
        const SongDocSnap =  await getDoc(docReference)
        setFavouritesSongsFromDB((current) => [...current, SongDocSnap.data()])
      })
    }


    console.log(FavouritesSongs)
    if(FavouritesSongs.length > 0)
    {
      GetSongsFromDB()
    }
  }, [FavouritesSongs])


  const CreatePlaylist = () => {
    if(FavouritesSongsFromDB.length > 0) {
      PlaylistData.splice(0, PlaylistData.length)
      PlaylistData.push(FavouritesSongsFromDB)
      
      PlaylistFromFavourites.splice(0, PlaylistFromFavourites.length)
      PlaylistFromFavourites.push(true)
 
      console.log(PlaylistData)
      if(PlayerData[0] && PlayerData[0].length > 0) {
        PlayerData[0].splice(0, PlayerData[0].length)
      }
      PlayerData.push(PlaylistData[0][0])
      console.log(PlayerData)

      history('/player')
    }
  }




  const NoFavourites = () => {
    return(
      <div className='w-full h-full p-8 bg-white flex flex-col justify-start items-center'>
            <div className='w-full h-auto '>
                <button className='' onClick={() =>  history('/home')}><DownArrow/></button>
            </div>
            <div className='mt-40 flex flex-col items-center justify-center gap-6'>
                <svg 
                  className={'scale-[250%] !fill-primary'} width="48" height="43" viewBox="0 0 48 43" fill="none" >
                  <motion.path 
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1, yoyo: Infinity, ease: "easeInOut"  }}
                  d="M33.994 0.197972C30.3687 0.202884 26.8898 1.62809 24.303 4.16797C21.7162 1.62809 18.2372 0.202884 14.612 0.197972C10.9787 0.177492 7.48603 1.60114 4.90236 4.15574C2.31869 6.71035 0.855615 10.1867 0.834987 13.82C0.828108 17.3483 2.19619 20.7406 4.64899 23.277L24.303 42.775L43.568 23.666C44.9009 22.3967 45.9608 20.8689 46.6829 19.1759C47.4051 17.483 47.7743 15.6605 47.768 13.82C47.7474 10.1872 46.2847 6.71133 43.7017 4.15681C41.1187 1.60229 37.6268 0.178291 33.994 0.197972ZM33.994 3.23397C35.3947 3.22264 36.7839 3.48758 38.0821 4.01364C39.3804 4.53971 40.5621 5.31657 41.5598 6.29978C42.5575 7.283 43.3516 8.45328 43.8966 9.74367C44.4416 11.0341 44.7268 12.4192 44.736 13.82C44.7521 15.2547 44.4698 16.6771 43.907 17.9969C43.3443 19.3168 42.5134 20.5053 41.467 21.487L24.303 38.494L6.82499 21.175C4.92081 19.2004 3.85993 16.5621 3.86699 13.819C3.87627 12.4181 4.1617 11.0327 4.70695 9.74228C5.25219 8.4518 6.04654 7.28151 7.04455 6.29836C8.04256 5.31521 9.22464 4.5385 10.5232 4.01268C11.8217 3.48686 13.2111 3.22224 14.612 3.23397C16.624 3.23762 18.5954 3.79996 20.3065 4.85831C22.0176 5.91666 23.4012 7.42942 24.303 9.22797C25.2048 7.42942 26.5884 5.91666 28.2995 4.85831C30.0106 3.79996 31.982 3.23762 33.994 3.23397Z"/>
                </svg>





                <h2 className='font-lato font-bold text-secondary text-[25px] mt-16'>No Favorites</h2>
                <p className='font-lato text-[14px] text-secondary  text-center mx-5'>Start adding moodlists to your favorites by clicking the heart icon</p>
                <motion.h2 initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 1, ease: "easeInOut" }}
                className='font-lato mt-9 font-bold text-primary text-[23px]'>Explore simplylists</motion.h2>
            </div>
        </div>
    )
  }


const ExistingFavorites = () => {
return(
  <div className='w-full h-full p-8 bg-white flex flex-col justify-start items-start gap-4'>
        
        <div className='w-full h-auto'>
                <button className='' onClick={() => history('/home')}><DownArrow/></button>
            </div>

            {/* FilterFields */}
            <div className='flex flex-row justify-center items-start gap-2'>
            <p className='w-full font-playfair font-extrabold text-secondary text-3xl'>Favourites</p>
            <div onClick={CreatePlaylist} className='h-[40px] w-[40px] rounded-full bg-primary'>
                <Play className={'h-[40px] w-[40px]'}  second_fill={'#fff'} />    
            </div>
            </div>
            

             {/* KafelkiContainer */}
            <div className='w-full flex flex-row flex-wrap justify-between gap-4 items-start overflow-y-auto'>
            
              {
                FavouritesSongsFromDB.map((song) => {
                  return(
                      <SongTile key={song.title} song={song} 
                      className={'flex flex-col items-start justify-center w-[47.5%]'}
                      imgClassName={'h-[136px] w-full rounded-[12px] object-cover'}  />
                  )
                })
              }

                  
              </div> 
        </div>       
)
}
  return (
    <motion.div transition={{duration: 0.5, ease: "easeInOut" }} initial={{y: viewportHeight, opacity: 0}} 
    animate={{y: 0, opacity: 1}} exit={{y: viewportHeight, opacity: 0}}
     id='container' className='mainContainer w-full h-full relative'>

      {UserHasFavourites ? ExistingFavorites(): NoFavourites()}   

    </motion.div>
  )
}
