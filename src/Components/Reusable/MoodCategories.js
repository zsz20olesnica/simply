import React from 'react'
import { useState } from 'react'

export default function MoodCategories({category}) {
    const [isClicked, setIsClicked] = useState(false)
    
    const HandleClick = () => {
      setIsClicked(!isClicked)
    }

    return (
    <button onClick={() => {HandleClick()}} className={`${isClicked ? '!text-white bg-primary' : ''} text-primary transition-all duration-200 ease-in-out font-lato rounded-full ring-[1.5px] ring-primary  min-h-[30px] px-3 min-w-[100px]`}>{category}</button>
  )
}
