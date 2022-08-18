import React, {useRef, useState} from 'react'
import { LeftArrow } from '../../../Icons'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {db, appVersion, storage} from '../../../firebase'
import { doc, setDoc, updateDoc } from "firebase/firestore"; 
import { ref ,  uploadBytesResumable, getDownloadURL } from "firebase/storage";
import userEvent from '@testing-library/user-event'

export default function SingUp() {

  const SiteTitle = 'Sign Up - Simply'
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

  //Submit
  const AddSong = () => {
    
    

    //Inputs Values
    let title = titleRef.current.value
    let author = authorRef.current.value
    let albumName = albumNameRef.current.value
    let SongCategory = SongCategoryRef.current.value
    let SongThumbnail = SongThumbnailRef.current.value
    let SongThumbnailAuthor = SongThumbnailAuthorRef.current.value  
    let SongFile = SongFileRef.current.value  
    
    //Data Array
    let Data = [title, author, albumName, SongCategory, SongThumbnail, SongThumbnailAuthor, SongFile]

    //AllInputs
    let InputFields = [titleRef, authorRef, albumNameRef, SongCategoryRef, SongThumbnailRef, SongThumbnailAuthorRef, SongFileRef]

    //Clear Inputs
    const ClearInputs = () => {
        InputFields.forEach((element) => {
            element.current.value = ''
        })
    }

    


    Data.forEach((element, index) => {
        if(!element) 
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
        SongCategory: ${SongCategory}
        SongThumbnail: ${SongThumbnailRef.current.files[0].name}
        SongThumbnailAuthor: ${SongThumbnailAuthor}
        SongFile: ${SongFileRef.current.files[0].name}
        `)




        //SendSongDataToServer
        setDoc(doc(db, "songs", title), {
            title: title,
            author: author,
            albumName: albumName,
            songCategory: SongCategory,
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
                  <input ref={SongFileRef} placeholder='Type album name' type='file' accept=".mp3, .ova, .ogg"></input>
                  </div>
                  


                  {/* AlbumName */}
                  <p className='w-full text-[19px] font-lato text-secondary'>Album Name</p>
                  <input ref={albumNameRef} placeholder='Type album name' type='text' className='w-full h-11 rounded-full bg-search px-5 text-secondary focus:outline-primary '></input>
                  
                  {/* SongCategory */}
                  <p className='w-full text-[19px] font-lato text-secondary'>Song Category</p>
                  <input ref={SongCategoryRef} placeholder='Type song category' type='text' className='w-full h-11 rounded-full bg-search px-5 text-secondary focus:outline-primary'></input>


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
