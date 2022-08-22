import React from 'react'
import { useState, useEffect } from 'react'
import { DownArrowWhite, Prev, Next, Pause, Play, More, CastToDevice, Share, Heart } from '../../../Icons'
import { useNavigate } from 'react-router-dom'
import '../../../vanilla.css'
import { collection, query, onSnapshot, where, getDoc } from 'firebase/firestore'
import { PlayerData, AlbumData, PlaylistData, db, auth} from '../../../firebase'
import { doc, setDoc } from "firebase/firestore"; 
import { motion } from 'framer-motion';
import { PlaylistFromFavourites } from '../../../firebase'
import { createBuilderStatusReporter } from 'typescript'




export default function Player() {
    
    let song = PlayerData[0]
    let album = []


    const SiteTitle = 'Player - Simply'
    document.title = SiteTitle

    const history = useNavigate()

    let NextSongIndex = 0
    const [isOpen, setIsOpen] = useState(false)
    const [IsPaused, setIsPaused] = useState(false) 
    const [TracksCount, setTracksCount] = useState(0)
    const [IsFavourites, setIsFavourites] = useState(false)
    const [NextSongTitle, setNextSongTitle] = useState('')
    const [IsTrackCountPlural, setIsTrackCountPlural] = useState(false)
    const [PlaylistCreated, setPlaylistCreated] = useState([])
    const [AlbumCreated, setAlbumCreated] = useState(false)


    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////

    //CreateAlbum
    useEffect(() => {
        
        //FindAlbum
        const q = query(collection(db, 'songs'), where('albumName', '==', `${song.albumName}`))
        
        //QueryDB
        const unsub = onSnapshot(q, (querySnapshot) => {
            let ExistingElementsArray = [];
            querySnapshot.forEach((doc) => {
                ExistingElementsArray.push({...doc.data(), id: doc.id});
            });
            album = ExistingElementsArray

            console.log(`Album to: ` + song.albumName)

            //SaveAlbum
            if(AlbumData[0] != album)
            {
                AlbumData.push(album)
                AlbumData.push(song.albumName)
                AlbumData.push(song.songThumbnailLink)
                AlbumData.push(song.songThumbnailAuthor)
            }
            setTracksCount(AlbumData[0].length)
            console.log('Album Data:')
            console.log(AlbumData)
            setAlbumCreated(true)
        })

        return () => unsub() 
        }, [])
  
        

    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////

    //CreateOrReadPlaylist
    useEffect(() => {       
                  
                  if (PlaylistFromFavourites[0] == true) {
                    console.log('Playlist IS From Favourites'); 
                    //PlaylistIsAlreadyFavourites
                    setPlaylistCreated((current) => [...current, true])
                  }
                   else 
                  {
                    console.log('Playlist IS NOT From Favourites'); 
                    //SaveAlbumAsPlaylist   
                    
                      console.log('Playlist Data before clear', PlaylistData);
                      PlaylistData.splice(0, PlaylistData.length)
                      console.log('Playlist Data after clear', PlaylistData)
                      PlaylistData.push(AlbumData[0])
                      console.log(AlbumData[0])
                      console.log('Playlist Data after push', PlaylistData)

                      setPlaylistCreated((current) => [...current, true])
                   }
    }, [AlbumCreated])





    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////

    //SetNextTitle
     useEffect(() => {
         console.log(PlaylistData[0])
         
         if(PlaylistData[0] != undefined)
         {
            if(PlaylistData[0].length > 1)
            {
                let CurrentSongIndex = 0
                console.log('Playlist Data ma wiecej niż 1')
                PlaylistData[0].forEach((playlist_song, index) => {
                    if(playlist_song.title === song.title)
                    {
                        CurrentSongIndex = index
                    }
                })
                console.log(CurrentSongIndex)
                console.log(PlaylistData[0])

                NextSongIndex = CurrentSongIndex + 1

                if(PlaylistData[0].length != NextSongIndex)
                    {
                        setNextSongTitle(PlaylistData[0][NextSongIndex].title)
                    }
                    else
                    {
                    console.log('Playlist Data ma mniej niż 1')
                    NextSongIndex = 0
                    setNextSongTitle(PlaylistData[0][0].title)
                    }
            }
            else
            {
               console.log('Playlist Data ma mniej niż 1')
               NextSongIndex = 0
               setNextSongTitle(PlaylistData[0][0].title)
            }
         }
         

     }, [PlaylistCreated])


    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////

    // //CheckTracksPlular
    // useEffect(() => {
    //     if(TracksCount > 1)
    //     {
    //         setIsTrackCountPlural(true)
    //     }
    //     else
    //     {
    //         setIsTrackCountPlural(false)
    //     }
    // }, [TracksCount])
    


    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////

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
                if(e == song.title)
                {
                    IsFavourite = true
                }
            })
            
            
            if(!IsFavourite)
            {
                //AddSongToArray
                FavouritesSongs.push(song.title)


                //UpdateDB
                await setDoc(doc(db, 'users', auth.currentUser.uid), {
                    favouritesSongs: FavouritesSongs
                }, {merge: true})

                setIsFavourites(true)

            }
            else
            {
                //RemoveSongFromArray
                let index = FavouritesSongs.indexOf(song.title)
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
    setIsOpen(!isOpen)
  }
  
  let viewportHeight = window.innerHeight;

  return (
    <motion.div  transition={{duration: 0.5, ease: "easeInOut" }} initial={{y: viewportHeight, opacity: 0}} 
    animate={{y: 0, opacity: 1}} exit={{y: viewportHeight, opacity: 0}}>
    <div id='container' className='mainContainer w-full h-screen relative'>

      <div className='absolute z-100 w-full h-full p-8 flex flex-col justify-between items-center'>
            {/* HeaderContainer */}
            <div className='w-full h-auto flex flex-row justify-between items-center'>
                {/* BackArrow */}
                <button className='' 
                onClick={() => history('/home')}
                ><DownArrowWhite/></button>
                {/* Author */}
                <span className='h-full min-w-[160px] flex justify-center items-center bg-white opacity-90 rounded-full text-tertiary text-[14px] p-1'>{song.songThumbnailAuthor}</span>
            </div>

                     </div>
      {/* HeroSection */}
      <div className='w-full h-[60%]'>
            <img src={song.songThumbnailLink} className='top-0 z-0 w-full h-full object-cover'/>
    </div>


    {/* Container */}
    <div className='w-full h-[40%] px-8 flex flex-col items-center justify-between py-10 relative'>
    <MoreOptionss isOpenn={isOpen}/>
            {/* Title/Time Container */}
            <div className='w-full h-[32%] flex flex-col justify-center items-start gap-5'>
            {/* Title */}
                <div className='h-full w-full flex flex-row items-center justify-between'>
                    {/* Trzeba zrobic ze jak jest za dlugi tytuł to sie przesuwa jak slider automatycznie */}
                    <h1 className='w-full font-playfair font-extrabold text-[32px] break-normal min-w-[70%] text-secondary truncate'>{song.title}</h1>
                    <div onClick={() => {HandleMoreOptions()}} className='min-w-[20%] h-full flex flex-col items-center justify-start mt-7'>
                        <More className={'scale-90'}/>
                    </div>
                </div>
            {/* Time and number of items */}
                <div className='flex flex-row items-center gap-2'>
                    <p onClick={() =>  history('/album')} className='text-[14px] text-tertiary font-lato'>{song.albumName}</p>
                    <div className='w-[5px] h-[5px] rounded-full bg-tertiary'></div>
                    <p className='text-[14px] text-tertiary font-lato'>
                    {TracksCount} 
                    {IsTrackCountPlural ? ' tracks' : ' track'}
                    </p>
                </div>
            </div>
            {/* onClick={() => {if(PlayerData.albumName != 'Single') history('/album')}} */}
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
                        <input type="range" id="PlayerSlider" defaultValue="0" className='w-full h-2 bg-search rounded-lg'></input>
                        <p className='font-lato text-[12px] text-tertiary'>{song.duration}</p>
                </div>

                {/* Music controler */}
                <div className='flex flex-row justify-center items-center gap-16'>
                    
                    <Prev className={'!fill-primary'}/>
                    
                    <div className='h-[53.67px] w-[53.67px] rounded-full bg-primary' onClick={() => {setIsPaused(!IsPaused)}}>
                        {
                        IsPaused
                        ?                 
                        <Pause  className={'h-full w-full scale-[55%]'} first_fill={'#fff'} second_fill={'#fff'}/>               
                        :             
                        <Play className={''}  second_fill={'#fff'}/>
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
