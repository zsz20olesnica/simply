import React from 'react'
import { Loupe, Heart, More } from '../../../Icons'

export default function Main() {
  return (
    <div className='mainContainer w-full h-full'>Main
        <div className='flex justify-between'>
            <Loupe />
            <Heart />
            <More />
        </div>
    </div>
  )
}
