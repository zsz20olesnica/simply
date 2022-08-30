import React from 'react'
import { forwardRef } from 'react'

export const Audio = forwardRef((props, ref) => {
  return <audio ref={ref} {...props} preload='metadata'></audio>
}) 
