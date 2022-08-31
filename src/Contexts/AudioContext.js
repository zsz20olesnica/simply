import React from 'react'
import { useContext, useRef, useState, useEffect, forwardRef } from 'react'
import { PlayerData } from '../firebase'

const AudioContext = React.createContext()

export function useAudio() {
    return useContext(AudioContext)
}

export default function AudioProvider({ children }) {
    const [current, setCurrent] = useState(0)
    const [currentSong, setCurrentSong] = useState('')
    const [Playlist, setPlaylist] = useState('')
    const [PlaylistFromFavourites, setPlaylistFromFavourites] = useState(false)
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
    
    useEffect(() => {
        console.log('SONG CHANGED')
    }, [currentSong])
    

    const [IsPaused, setIsPaused] = useState(true) 
    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)

    // useEffect(() => {
    //     console.log(audio.current)
    //     // if(audio.current?.src === currentSong?.songFileLink)
    // }, [audio])
    
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
        if(window.location.pathname === '/player') {
            changeCurrentTime()
            progressBar.current.max = Math.floor(audio.current.duration)
            console.log(Math.floor(audio.current.duration))
        }
      }, []);

    function changePlayerSlider() {
        
        audio.current.currentTime = progressBar.current.value
        changeCurrentTime()
    }

    function changeCurrentTime() {
        setCurrentTime(progressBar.current.value)
        console.log(currentTime)
    }

    const value = {
        audio,
        progressBar,
        duration,
        currentTime,
        IsPaused,
        Album,
        Playlist,
        setPlaylist,
        currentSong,
        setCurrentSong,
        PlaylistFromFavourites,
        setPlaylistFromFavourites,
        playPauseSong,
        changePlayerSlider
    }

  return (
    <AudioContext.Provider value={value}>
        {children}
    </AudioContext.Provider>
  )
}
