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
    const [Playlist, setPlaylist] = useState('')
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
    
    useEffect(() => {
        console.log('SONG CHANGED')
    }, [currentSong])
    

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
        console.log('Playlist Changed')
    }, [Playlist])
    

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
           console.log(Playlist)
           let currentSongIndex =  Playlist.indexOf(currentSong)
           console.log('CurrentIndex', currentSongIndex)
           
           setCurrentSong(Album.albumSongs[currentSongIndex + 1])
        }
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
        setAudioDuration
    }

  return (
    <AudioContext.Provider value={value}>
        {children}
    </AudioContext.Provider>
  )
}
