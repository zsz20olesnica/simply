import React, { useState, useEffect } from 'react'
import { LeftArrow } from '../../../Icons'
import { useNavigate } from 'react-router-dom'

import SongTile from '../../Reusable/SongTile'

import FilteredCategory from '../../Reusable/FilteredCategory'

import { motion } from 'framer-motion';
import { Categories } from '../../../firebase'
import { useAudio } from '../../../Contexts/AudioContext'


import { collection, query, onSnapshot, where, getDoc, documentId } from 'firebase/firestore'
import { db, auth } from '../../../firebase'
import { doc, setDoc, getDocs  } from "firebase/firestore"; 


export default function Filtered() {

  const history = useNavigate()
  let viewportWidth = window.innerWidth;
  const SiteTitle = 'Filtered - Simply'
  document.title = SiteTitle
  const { Playlist } = useAudio()

  const [FilteredSongs, SetFitleredSongs] = useState([])

  const [categ, setCateg] = useState([])

  const handleDelete = (index) => {
    Categories.splice(index, 1)
    
    // Rerender
    setCateg((prev) => prev.splice(index, 1))
  }

  useEffect(() => {
    
    const q = query(collection(db, "songs"), 
    where('songCategories', 'in', [Categories]));
    // where('songCategories', '==', 'Gym'));


    const querySnapshot = async () => await getDocs(q)

    querySnapshot().then((query) => {
      query.forEach((doc) => {
      console.log(doc)

        SetFitleredSongs(
          (prev) => [...prev, {...doc.data(), id: doc.id}])
      });
    }



)}, [categ])
  


  return (
    <motion.div transition={{duration: 0.5, ease: "easeInOut" }} initial={{x: viewportWidth, opacity: 0}} 
    animate={{x: 0, opacity: 1}} exit={{x: viewportWidth, opacity: 0}}
    className='mainContainer w-full h-full relative'>

        <div className='w-full h-full p-8 bg-white flex flex-col justify-start items-start gap-4'>
        
        <div className='w-full h-auto'>
                <button className='' onClick={() => history('/search')}><LeftArrow/></button>
            </div>

            {/* FilterFields */}
            <p className='w-full font-playfair font-extrabold text-secondary text-3xl'>Search</p>
            
            
            <div className='w-full flex flex-row flex-wrap gap-5'>
            {
              Categories.map((category, index) => (
                <FilteredCategory category={category} index={index} handleDelete={handleDelete} key={index}/>
                )
              )
            
            } 
               

            </div>
             
             {/* KafelkiContainer */}
            <div className='w-full flex flex-row flex-wrap items-start justify-start gap-5 overflow-y-auto'>
            
            {
            Playlist.map((song) => {
              <SongTile song={song}/>
            })
            }

            </div>
        </div>
    </motion.div>
  )
}
