import { FlatTree } from 'framer-motion'
import React from 'react'
import { useState } from 'react'
import { Categories } from '../../firebase'
export default function MoodCategories({category}) {
    const [isClicked, setIsClicked] = useState(false)
    
    const HandleClick = () => {
      setIsClicked(!isClicked)
     
      if(isClicked == false)
      {     
        Categories.push(category)      
      }
      else
      {  
        let index = Categories.indexOf(category)
        Categories.splice(index, 1)
      }  
    }
    return (
    <button onClick={() => {HandleClick()}} className={`${isClicked ? '!text-white bg-primary' : ''} text-primary transition-all duration-200 ease-in-out font-lato rounded-full ring-[1.5px] ring-primary  min-h-[30px] px-3 min-w-[100px]`}>{category}</button>
  )
}
