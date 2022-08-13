import React from 'react'
import { ReactDOM } from 'react';
import { Categories } from '../../firebase';
export default function FilteredCategory({ category, index, handleDelete}) {

  return (
    <button id={'categorybutton'+ index} onClick={() => (console.log('Handle category delete function'))} className='relative text-white font-lato rounded-full ring-[1.5px] ring-primary bg-primary  min-h-[30px] px-3 min-w-[100px]'>
        {category}
        <span onClick={() => {handleDelete(index)}} className='absolute w-[20px] h-[20px] flex justify-center items-center p-2 rounded-full bg-primary font-bold text-sm top-[-8px] right-[-8px] shadow-lg'>X</span>
    </button>
  )
}
