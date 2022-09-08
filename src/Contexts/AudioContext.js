import React from 'react'
import { useContext, useRef, useState, useEffect, forwardRef } from 'react'
import { PlayerData, registerUser } from '../firebase'

const AudioContext = React.createContext()

export function useAudio() {
    return useContext(AudioContext)
}

export default function AudioProvider({ children }) {
    const [current, setCurrent] = useState(0)
    const [currentSong, setCurrentSong] = useState('')
    const [Playlist, setPlaylist] = useState([])
    const [PlaylistFromFavourites, setPlaylistFromFavourites] = useState(false)
    const [AudioDuration, setAudioDuration] = useState(0)

    const audio = useRef(null)
    const progressBar = useRef(null)

    


    const [Album, setAlbum] = useState({
        albumSongs: [],
        albumName: '',
        thumbnail: '',
        author: '',

        set ChangeAlbumName(name) {
            this.albumName = name
          },
        set ChangeThumbnail(newthumbnail) {
          this.thumbnail = newthumbnail
        },
        set ChangeAuthor(newauthor) {
          this.author = newauthor
        }
    }) 

    

    const [IsPaused, setIsPaused] = useState(true) 
    const [duration, setDuration] = useState(0)
    
    
    //String 00:00
    const [currentTime, setCurrentTime] = useState(0)

    
    function playPauseSong() {
        if(audio.current.src !== currentSong.songFileLink)
            audio.current.src = currentSong.songFileLink
        if(IsPaused)
            audio.current.play()
        if(!IsPaused)
            audio.current.pause()
        setIsPaused(!IsPaused)
    }

    

    useEffect(() => {
        //EveryTimeAudioPlayUpdateTime
        audio.current.addEventListener('timeupdate', (event) => {
            changeCurrentTime()
        }, false);
    }, [])
    

    function changePlayerSlider() {

        //In%%
        let percent = progressBar.current.value

        
        audio.current.currentTime = audio.current.duration * (percent/100)
    }

    function changeCurrentTime() {    
        //Change Time String
        setCurrentTime(CalcSongDuration(audio.current.currentTime))

        
        if(audio.current.currentTime == audio.current.duration)
        {
           

        //    nextSong ()
        }
    }


    function nextSong () {
        
        let currentSongIndex =  Playlist.indexOf(currentSong)
        let nextSongIndex = 0
        if((Playlist.length - 1) > currentSongIndex)
        {
            //NextIndex
            nextSongIndex = currentSongIndex + 1
        }
        else
        {
            //FirstIndex
            nextSongIndex = 0
        }
        console.log('CurrentIndex', currentSongIndex)
        setCurrentSong(Playlist[nextSongIndex])

    }

    function prevSong () {
        
        let currentSongIndex =  Playlist.indexOf(currentSong)
        let nextSongIndex = 0
        if(0 < currentSongIndex)
        {
            //PrevIndex
            nextSongIndex = currentSongIndex - 1
        }
        console.log('CurrentIndex', currentSongIndex)
        setCurrentSong(Playlist[nextSongIndex])

    }


//Utils

function CalcSongDuration(SongDuration) {
    let CurrentSongDuration
    let MinutesAmount = Math.floor(parseInt(SongDuration) / 60)
    let SecondsAmount = Math.round(parseInt(SongDuration) % 60)
    
    //ToString
    CurrentSongDuration = `${padTo2Digits(MinutesAmount)}:${padTo2Digits(SecondsAmount)}`
    
    //CalculateProgressBarPercent
    progressBar.current.value = (audio.current.currentTime / audio.current.duration) * 100
    return CurrentSongDuration
}


function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
}






    const value = {
        audio,
        progressBar,
        duration,
        currentTime,
        setCurrentTime,
        IsPaused,
        Album,
        Playlist,
        setPlaylist,
        currentSong,
        setCurrentSong,
        PlaylistFromFavourites,
        setPlaylistFromFavourites,
        playPauseSong,
        changePlayerSlider,
        AudioDuration, 
        setAudioDuration,
        nextSong,
        prevSong
    }

  return (
    <AudioContext.Provider value={value}>
        {children}
    </AudioContext.Provider>
  )
}
