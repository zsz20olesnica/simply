import React from 'react'
import { useState, useEffect } from 'react'
import { DownArrowWhite, Prev, Next, Pause, Play, More, CastToDevice, Share, Heart } from '../../../Icons'
import { useNavigate } from 'react-router-dom'
import '../../../vanilla.css'
import { collection, query, onSnapshot, where, getDoc, documentId } from 'firebase/firestore'

import { db, auth} from '../../../firebase'

import { doc, setDoc, getDocs  } from "firebase/firestore"; 
import { motion } from 'framer-motion';
import { createBuilderStatusReporter } from 'typescript'
import Audio from '../../Player/Audio'
import { useRef } from 'react'
import { useAudio } from '../../../Contexts/AudioContext'



export default function Player() {
    const { currentSong, Album, Playlist, setPlaylist, audio, progressBar, duration, currentTime, playPauseSong, changePlayerSlider, IsPaused, PlaylistFromFavourites } = useAudio()
    let album = []

    document.title = `${currentSong.title} - Simply player`

    const history = useNavigate()
    

    let NextSongIndex = 0
    const [isMoreOptionsOpen, setIsMoreOptionsOpen] = useState(false)
    const [TracksCount, setTracksCount] = useState(0)
    const [IsFavourites, setIsFavourites] = useState(false)
    const [NextSongTitle, setNextSongTitle] = useState('')
    const [IsTrackCountPlural, setIsTrackCountPlural] = useState(false)
    const [IsSingle, setIsSingle] = useState(false)


    //CreateAlbum&Playlist
    useEffect(() => {
        
        let SaveAlbum = async () => {

            //ClearData
            setPlaylist('')
            Album.albumSongs.splice(0, Album.albumSongs.length)
            Album.ChangeAlbumName = ''
            Album.ChangeThumbnail = ''
            Album.ChangeAuthor = ''
            console.log('Album clear')
            album = []
            
            //FindAlbum
            const q = query(collection(db, 'songs'), where('albumName', '==', `${currentSong.albumName}`))
            
            
            //QueryDB
            const querySnapshot = await getDocs(q)   
            
            querySnapshot.forEach((doc) => {
                album.push({...doc.data(), id: doc.id});
            });

            console.log(`Album name: ` + currentSong.albumName)
            console.log(`LOCAL ALBUM: `, album)


                //SaveAlbum
                if(Album.albumSongs != album)
                {
                    album.forEach((AlbumSong) => {
                        Album.albumSongs.push(AlbumSong)
                    })

                    Album.ChangeAlbumName = currentSong.albumName
                    Album.ChangeThumbnail = currentSong.songThumbnailLink
                    Album.ChangeAuthor = currentSong.songThumbnailAuthor
                    
                    console.log('ALBUM TO:', Album)
                    setTracksCount(Album.albumSongs.length)
                   
                    //CheckIfSingle
                    if(currentSong.albumName == 'Single') setIsSingle(true)

                
                    if (PlaylistFromFavourites == true) {
                        console.log('Playlist == Favourites') 
                        
                    }
                    else { 
                        console.log('Playlist IS NOT From Favourites'); 

                        //ClearPlaylist
                        setPlaylist('')
                                    
                        //SaveAlbumAsPlaylist 
                        Album.albumSongs.map((albumSong) => {
                            setPlaylist((prev) => [...prev, albumSong])
                        })
                        console.log('Playlist Data after push', Playlist)
                        
                    }
                    console.log(Playlist)
                   
                        
                        if(Playlist && Playlist.length > 1) {
                            
                            console.log('Playlista ma dużo utworów')
                            
                            let CurrentSongIndex = 0
                            Playlist.forEach((playlistSong, index) => {
                                if(playlistSong.title === currentSong.title)
                                    CurrentSongIndex = index
                            })
                            console.log(CurrentSongIndex)
                            
                            
                            NextSongIndex = CurrentSongIndex + 1
                            
                            if(Playlist.length > NextSongIndex) 
                                setNextSongTitle(Playlist[NextSongIndex].title)
                            else{
                                setNextSongTitle('')
                            }
                        }
                        else {
                            console.log('Playlista ma mniej niż 1 utwór')
                            NextSongIndex = 0
                            setNextSongTitle('')
                        }
                   
                        if(TracksCount > 1)
                            setIsTrackCountPlural(true)
                        else
                            setIsTrackCountPlural(false)

                            console.log(Album)
                }
                else
                {
                    console.log('ALBUM IS EXISTING')   
                }
        }
        
        SaveAlbum()
        }, [])

    
    
    //HandleFavourites
    const handleFavourites = async () => {
        
        const docRef = doc(db, "users", auth.currentUser.uid)
        const docSnap = await getDoc(docRef)
        let UserData;
        let FavouritesSongs = []
        let IsFavourite = false

        if (docSnap.exists()) {
            UserData = docSnap.data()
            FavouritesSongs = UserData.favouritesSongs

            //CheckIfIsAlreadyFavourite
            FavouritesSongs.forEach((e) => {
                if(e == currentSong.title)
                {
                    IsFavourite = true
                }
            })
            
            
            if(!IsFavourite)
            {
                //AddSongToArray
                FavouritesSongs.push(currentSong.title)


                //UpdateDB
                await setDoc(doc(db, 'users', auth.currentUser.uid), {
                    favouritesSongs: FavouritesSongs
                }, {merge: true})

                setIsFavourites(true)

            }
            else
            {
                //RemoveSongFromArray
                let index = FavouritesSongs.indexOf(currentSong.title)
                FavouritesSongs.splice(index, 1)

                //UpdateDB
                await setDoc(doc(db, 'users', auth.currentUser.uid), {
                    favouritesSongs: FavouritesSongs
                }, {merge: true})

                setIsFavourites(false)
            }
            
        }
    }

        




const MoreOptionss = ({ isOpenn }) => {
    return(
    <>
        <motion.div transition={{duration: 0.2}} animate={{opacity: 1}} exit={{opacity: 0}} className={`${isOpenn ? 'block' : 'hidden'} absolute h-[147px] w-[226px] rounded-xl bg-white shadow-2xl`}>

            <ul className='w-full  h-full flex flex-col items-start justify-center divide-y divide-solid '>


                {/* AddToFavourites */}
                {
                !IsFavourites
                ? 
                    <motion.li  onClick={handleFavourites} transition={{delay: 0.15, duration: 0.5}} initial={{opacity: 0}} animate={{opacity: 1}}
                        className={'w-full p-6 h-1/3 flex flex-row items-center justify-start gap-6 active:bg-slate-300 active:rounded-t-xl'}>
                        <Heart className={'fill-secondary active:fill-primary w-6 h-6'}/>
                        <p className='text-secondary text-[14px] font-lato '>Add to Favourites</p>
                    </motion.li>
                :
                    <motion.li  onClick={handleFavourites} transition={{delay: 0.15, duration: 0.5}} initial={{opacity: 0}} animate={{opacity: 1}}
                    className={'w-full p-6 h-1/3 flex flex-row items-center justify-start gap-6 active:bg-slate-300 active:rounded-t-xl'}>
                        <Heart className={'fill-error active:fill-error w-6 h-6'}/>
                        <p className='text-secondary text-[14px] font-lato '>Remove from Favourites</p>
                    </motion.li>
                
                }


                



                {/* Share */}
                <motion.li transition={{delay: 0.25, duration: 0.5}} initial={{opacity: 0}} animate={{opacity: 1}} 
                className='w-full  p-6 h-1/3 flex flex-row items-center justify-start gap-6 active:bg-slate-300 '>
                    <Share className={'fill-secondary w-6 h-6'}/>
                    <p className=' text-secondary text-[14px] font-lato'>Share</p>
                </motion.li>




                {/* CastToDevice */}
                <motion.li transition={{delay: 0.35, duration: 0.5}} initial={{opacity: 0}} animate={{opacity: 1}} 
                className='w-full p-6 h-1/3 flex flex-row items-center justify-start gap-6 active:bg-slate-300 active:rounded-b-xl'>
                    <CastToDevice className={'fill-secondary w-6 h-6'}/>
                    <p className=' text-secondary text-[14px] font-lato'>Cast to Device</p>
                </motion.li>
            </ul>

        </motion.div>

    </>)
  }

  const HandleMoreOptions = () => {
    setIsMoreOptionsOpen(!isMoreOptionsOpen)
  }
  

  return (
    <motion.div  transition={{duration: 0.5, ease: "easeInOut" }} initial={{y: window.innerHeight, opacity: 0}} 
    animate={{y: 0, opacity: 1}} exit={{y: window.innerHeight, opacity: 0}}>
    <div id='container' className='mainContainer w-full h-screen relative'>

      <div className='absolute z-100 w-full h-full p-8 flex flex-col justify-between items-center'>
            {/* HeaderContainer */}
            <div className='w-full h-auto flex flex-row justify-between items-center'>
                {/* BackArrow */}
                <button className='' 
                onClick={() => history('/home')}
                ><DownArrowWhite/></button>
                {/* Author */}
                <span className='h-full min-w-[160px] flex justify-center items-center bg-white opacity-90 rounded-full text-tertiary text-[14px] p-1'>{currentSong.songThumbnailAuthor}</span>
            </div>

                     </div>
      {/* HeroSection */}
      <div className='w-full h-[60%]'>
            <img src={currentSong.songThumbnailLink} className='top-0 z-0 w-full h-full object-cover'/>
    </div>


    {/* Container */}
    <div className='w-full h-[40%] px-8 flex flex-col items-center justify-between py-10 relative'>
    <MoreOptionss isOpenn={isMoreOptionsOpen}/>
            {/* Title/Time Container */}
            <div className='w-full h-[32%] flex flex-col justify-center items-start gap-5'>
            {/* Title */}
                <div className='h-full w-full flex flex-row items-center justify-between'>
                    {/* Trzeba zrobic ze jak jest za dlugi tytuł to sie przesuwa jak slider automatycznie */}
                    <h1 className='w-full font-playfair font-extrabold text-[32px] break-normal min-w-[70%] text-secondary truncate'>{currentSong.title}</h1>
                    <div onClick={() => {HandleMoreOptions()}} className='min-w-[20%] h-full flex flex-col items-center justify-start mt-7'>
                        <More className={'scale-90'}/>
                    </div>
                </div>
            {/* Time and number of items */}
                <div className='flex flex-row items-center gap-2'>
                    <p onClick={() => {if(currentSong.albumName !== 'Single') history('/album')}} className='text-[14px] text-tertiary font-lato'>{currentSong.albumName}</p>
                    
                    {
                        IsSingle?
                        null
                        : <div className='w-[5px] h-[5px] rounded-full bg-tertiary'></div>
                    }
                    

                    <p className='text-[14px] text-tertiary font-lato'>       
                        {
                            IsSingle?
                            null
                            : TracksCount
                        }
                        {
                            IsSingle?
                            null
                            : (IsTrackCountPlural? ' tracks' : ' track')
                        }
                        {/* {TracksCount}{IsTrackCountPlural ? ' tracks' : ' track'} */}
                    </p>
                </div>
            </div>
            
            {/* Next Container */}
            <div className='w-full flex flex-col gap-3'>
                <div className='flex flex-row'>
                    <p className='text-[14px] text-tertiary font-lato w-24'>Playing next</p>
                    <p className='text-[14px] text-secondary font-lato font-bold ml-5 truncate'>
                        {NextSongTitle}
                    </p>
                </div>

                {/* Time and slider */}
                <div className='w-full '>
                        <input ref={progressBar} onChange={changePlayerSlider} type="range" id="PlayerSlider" defaultValue="0" className='w-full h-2 bg-search rounded-lg'></input>
                        <div className='flex items-start justify-between'>
                            <p className='font-lato text-[12px] text-tertiary'>{currentTime}</p>
                            <p className='font-lato text-[12px] text-tertiary'>{currentSong.duration}</p>
                        </div>
                </div>

                {/* Music controler */}
                <div className='flex flex-row justify-center items-center gap-16'>
                    
                    <Prev className={'!fill-primary'}/>
                    
                    <div className='h-[53.67px] w-[53.67px] rounded-full bg-primary' onClick={playPauseSong}>
                        {
                        IsPaused
                        ? 
                        <Play className={''}  second_fill={'#fff'}/>              
                        :             
                        <Pause  className={'h-full w-full scale-[55%]'} first_fill={'#fff'} second_fill={'#fff'}/> 
                        } 
                    </div>
                    <Next className={'!fill-primary'}/>
                    
                    
                </div>
            </div>
          </div>
    </div>
    </motion.div>
  )
}
