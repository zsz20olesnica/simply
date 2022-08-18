import React, {useRef, useState, useEffect} from 'react'
import { LeftArrow } from '../../../Icons'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {db, appVersion, storage, Categories} from '../../../firebase'
import { doc, setDoc, updateDoc } from "firebase/firestore"; 
import { ref , uploadBytesResumable, getDownloadURL } from "firebase/storage";

import OccasionCategories from '../../Reusable/OccasionCategories'
import MoodCategories from '../../Reusable/MoodCategories'



export default function SingUp() {

  const SiteTitle = 'Add Song - Simply'
  document.title = SiteTitle
  const history = useNavigate()

  //RegisterInputsRef
  const titleRef = useRef()
  const authorRef = useRef()
  const albumNameRef = useRef()
  const SongCategoryRef = useRef() 
  const SongThumbnailRef = useRef()
  const SongThumbnailAuthorRef = useRef()
  const SongFileRef = useRef()

  //RegisterUIValuesRef
  const [LoadingPercent, setLoadingPercent] = useState(50)
  const [IsUploading, setIsUploading] = useState(false)


  let SongDuration;

  useEffect(() => {
    //Clear Array
    Categories.splice(0, Categories.length)
    console.log(Categories)
  }, [])
  

  //IsDataValid
  const [IsDataValid, setIsDataValid] = useState(true)

 
  //Upload files function
  const UploadFiles = (file, path, afterUrl, collectionName, fileName) => {
    if (!file) {
      alert("Please choose a file first!")
  }
  //Reference to Firebase Storage
  const storageRef = ref(storage, path)
  //UploadFunction
  const uploadTask = uploadBytesResumable(storageRef, file)
  
  //OnUploadStateChanged
  uploadTask.on(
    "state_changed",
    (snapshot) => {
        const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log(`Uploading file...${percent}%`)
        setLoadingPercent(percent)
        setIsUploading(true)
        
    },
    //OnError
    (err) => console.log(err),
    //AtTheEnd
    () => {
        setIsUploading(false)
        //Download URL from Storage
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log(url)
            //Run Custom Function
            afterUrl(collectionName, url, fileName)
        });
    }
  ); 
  }

//CalculateSongDuration
const CalcDuration = (e) => {
  var file = e.target.files[0]
  var reader = new FileReader()
  reader.onload = function (event) {
      var audioContext = new (window.AudioContext || window.webkitAudioContext)();
      audioContext.decodeAudioData(event.target.result, function(buffer) {
          var duration = buffer.duration;
          let minutesAmount;
          let secondsAmount;
          
          minutesAmount = Math.floor( duration / 60 )
          secondsAmount = Math.round( duration % 60 )

          function padTo2Digits(num) {
            return num.toString().padStart(2, '0');
          }
          
          SongDuration = `${padTo2Digits(minutesAmount)}:${padTo2Digits(secondsAmount)}`;
          console.log(file.name+'   is   '+SongDuration)
      });
  };
  reader.onerror = function (event) {
      console.error("An error ocurred reading the file")
  }
  reader.readAsArrayBuffer(file)
}



  //SUBMIT
  const AddSong = () => {

    //Inputs Values
    let title = titleRef.current.value
    let author = authorRef.current.value
    let albumName = albumNameRef.current.value
    let SongThumbnail = SongThumbnailRef.current.value
    let SongThumbnailAuthor = SongThumbnailAuthorRef.current.value  
    let SongFile = SongFileRef.current.value  
    
    //Data Array
    let Data = [title, author, albumName, SongThumbnail, SongThumbnailAuthor, SongFile, Categories]
  
    //AllInputs
    let InputFields = [titleRef, authorRef, albumNameRef, SongThumbnailRef, SongThumbnailAuthorRef, SongFileRef]

    //Clear Inputs
    const ClearInputs = () => {
        //ClearInputFields
      InputFields.forEach((element) => {
            element.current.value = ''
        })

        //Clear Array
        Categories.splice(0, Categories.length)   
    }


   


    Data.forEach((element, index) => {
        if(!element || element.length == 0) 
        {
            setIsDataValid(false)
            console.log(`Field ${index} is empty`)
        }
        else
        {
            setIsDataValid(true)
        }
    })


    if(IsDataValid)
    {
        
        //ConsoleLogAllData
        console.log(`Data: 
        Title: ${title}
        Author: ${author}
        AlbumName: ${albumName}
        SongCategories: ${Categories}
        SongThumbnail: ${SongThumbnailRef.current.files[0].name}
        SongThumbnailAuthor: ${SongThumbnailAuthor}
        SongFile: ${SongFileRef.current.files[0].name}
        `)




        //SendSongDataToServer
        setDoc(doc(db, "songs", title), {
            title: title,
            author: author,
            albumName: albumName,
            duration: SongDuration,
            songCategories: Categories,
            songThumbnailAuthor: SongThumbnailAuthor,
            })
        console.log('Sending Data to Server')

        //UpdateURLs
        const AddThumbnailUrlToFirestore = (collectionName, url, fileName) => {
            const collectionRef = doc(db, collectionName, fileName)

            updateDoc(collectionRef, {
              songThumbnailLink: url,
              })
        }
        
        
        const AddSongFileUrlToFirestore = (collectionName, url, fileName) => {
            const collectionRef = doc(db, collectionName, fileName)

              updateDoc(collectionRef, {
              songFileLink: url
              })
        }

        
        //Upload Thumbnail
        UploadFiles(SongThumbnailRef.current.files[0], `/songs/${title}/${SongThumbnailRef.current.files[0].name}`, AddThumbnailUrlToFirestore, 'songs', title)

        //Upload SongFile
        UploadFiles(SongFileRef.current.files[0], `/songs/${title}/${SongFileRef.current.files[0].name}`, AddSongFileUrlToFirestore, 'songs', title)



        ClearInputs()
    }


  }
  
  let viewportWidth = window.innerWidth;
  return (
    <motion.div transition={{duration: 0.5, ease: "easeInOut" }} initial={{x: -viewportWidth, opacity: 0}} 
    animate={{x: 0, opacity: 1}} exit={{x: -viewportWidth, opacity: 0}}
     className='mainContainer w-full h-full relative'>
        <div className='w-full h-full p-8 bg-white flex flex-col justify-between items-center'>
            {/* BackArrow */}
            <div className='w-full h-auto'>
                <button className='' onClick={() => history('/')}><LeftArrow className={'rotate-180'}/></button>
            </div>
            {/* SettingsContainer */}
            <div className='mb-20 w-full flex flex-col justify-between items-center gap-5 text-secondary'>
            <p className='text-[18px] font-lato text-error self-start mt-5'>Creator Panel</p>
            <p className='w-full text-[19px] font-lato text-secondary'>Add Song</p>
                
                

            {/* CreateAccount */}
              <div className='w-full flex flex-col items-center justify-center gap-5 mt-10'>


                  {/* Title */}
                  <p className='w-full text-[19px] font-lato text-secondary'>Title</p>
                  <input ref={titleRef} placeholder='Type song title' type='text' className='w-full h-11 rounded-full bg-search px-5 text-secondary focus:outline-primary'></input>
                  


                  {/* Author */}
                  <p className='w-full text-[19px] font-lato text-secondary'>Author</p>
                  <input  ref={authorRef} placeholder='Type song author' type='text' className='w-full h-11 rounded-full bg-search px-5 text-secondary focus:outline-primary'></input>
                  
                  
                  {/* SongFile */}
                  <p className='w-full text-[19px] font-lato text-secondary'>Song File</p>
                  <div className='w-full h-11 rounded-full bg-search px-5 text-secondary focus:outline-primary text-center flex items-center justify-center'>
                  <input ref={SongFileRef} onChange={(e) => CalcDuration(e)} placeholder='Type album name' type='file' accept=".mp3, .ova, .ogg"></input>
                  </div>
                  


                  {/* AlbumName */}
                  <p className='w-full text-[19px] font-lato text-secondary'>Album Name</p>
                  <input ref={albumNameRef} placeholder='Type album name' type='text' className='w-full h-11 rounded-full bg-search px-5 text-secondary focus:outline-primary '></input>
                  
                  {/* SongCategory */}
                  {/* <p className='w-full text-[19px] font-lato text-secondary'>Song Category</p>
                  <input ref={SongCategoryRef} placeholder='Type song category' type='text' className='w-full h-11 rounded-full bg-search px-5 text-secondary focus:outline-primary'></input> */}


                  {/* MoodFilters */}
                  <h3 className='w-full font-lato text-[19px] text-secondary '>Mood</h3>
                          <div className='w-full flex flex-row flex-wrap gap-3'>
                              <MoodCategories category={'Calm'}  key={'Calm'} />
                              <MoodCategories category={'Chill'}  key={'Chill'} />
                              <MoodCategories category={'Happy'}  key={'Happy'} />
                              <MoodCategories category={'Sad'}  key={'Sad'}/>
                              <MoodCategories category={'Angry'}  key={'Angry'}/>
                              <MoodCategories category={'Lonely'}  key={'Lonely'}/>
                              <MoodCategories category={'Gloomy'}  key={'Gloomy'}/>
                              <MoodCategories category={'Hopeful'}  key={'Hopeful'}/>
                              <MoodCategories category={'Romantic'}  key={'Romantic'}/>
                          </div>

            
                  {/* Occasion filters */}
                  <h3 className='w-full font-lato text-[19px] text-secondary '>Occasion</h3>
                      <div className='w-full flex flex-row flex-wrap gap-3'>
                          <OccasionCategories category={'Party'} key={'Party'}/>
                          <OccasionCategories category={'Reading'} key={'Reading'}/>
                          <OccasionCategories category={'Dancing'} key={'Dancing'}/>
                          <OccasionCategories category={'Christmas'} key={'Christmas'}/>
                          <OccasionCategories category={'Gym'} key={'Gym'}/>
                          <OccasionCategories category={'Date'} key={'Date'}/>        
                          <OccasionCategories category={'Car'} key={'Car'}/>
                          <OccasionCategories category={'Learning'} key={'Learning'}/>
                      </div>



                  {/* SongThumbnail */}
                  <p className='w-full text-[19px] font-lato text-secondary'>Song Thumbnail</p>
                  <div className='w-full h-11 rounded-full bg-search px-5 text-secondary focus:outline-primary text-center flex items-center justify-center'>
                  <input ref={SongThumbnailRef} placeholder='Type album name' type='file' max-size="6000" accept=".jpg, .png, .jpeg" ></input>
                  </div>

                  {/* ThumbnailAuthor */}
                  <p className='w-full text-[19px] font-lato text-secondary'>Thumbnail Author</p>
                  <input  ref={SongThumbnailAuthorRef} placeholder='Type thumbnail author' type='text' className='w-full h-11 rounded-full bg-search px-5 text-secondary focus:outline-primary'></input>
                                   

                  {/* ConfirmButton */}
                  {
                  !IsDataValid
                  ? <p className='text-[14px] font-lato text-error self-start'>Some fields are empty!</p>
                  : null
                  }
                  
                  
                  {/* LoadingSliderAndInfo */}
                  
                  
                  {
                  IsUploading
                  ? <>
                    <p className='text-[14px] font-lato text-warning self-start'>Uploading files, please wait!</p>
                    {/* Slider */}
                    <div className='w-full'>
                        <input type="range" id="PlayerSlider" value={LoadingPercent} min="0" max="100" disabled className='w-full h-2 bg-search rounded-lg'></input>
                        <p className='font-lato text-[12px] text-tertiary'>{LoadingPercent} %</p>
                    </div>

                    </>
                  : null
                  }
                  

                  <button onClick={AddSong} className='w-[200px] h-11 mt-[5px] text-lg rounded-full bg-primary font-lato text-white'>Add Song</button>




              </div>
            </div>
            {/* Footer */}
            <div className='w-full flex flex-row justify-between items-center'>
                <p className='text-tertiary'>App version {appVersion}</p>
                <p className='text-primary font-playfair text-2xl'>Simply</p>
              </div>
        </div>  
    </motion.div>
  )
}
