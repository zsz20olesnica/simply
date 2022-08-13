import {React, useEffect} from 'react'
import '../../../vanilla.css'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import HomeInfo from '../../Reusable/HomeInfo'

export default function Home() {

  const history = useNavigate()
  let viewportHeight = window.innerHeight;
  const SiteTitle = 'Simply'
  document.title = SiteTitle
  

  function isInViewport(element) {
    if(element) 
    {
        let myElementHeight = element.offsetHeight;
        let myElementWidth = element.offsetWidth;
        let bounding = element.getBoundingClientRect();
            
            if (bounding.top >= -myElementHeight 
                && bounding.left >= -myElementWidth
                && bounding.right <= (window.innerWidth || document.documentElement.clientWidth) + myElementWidth
                && bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) + myElementHeight) 
                {
                    return true
                } 
                else 
                {
                    return false
                }
    }
    else
    {
        
        return false
    }
}

  let dots;
  let slides;
  
  useEffect(() => {
      dots  = Array.from(document.getElementsByClassName('dots'))
      slides = Array.from(document.getElementsByClassName('homeinfo'))
  }, [])
  
  
      const HandleTouchEnd = (element, index) => 
      {
          console.log(index)
          let prev = slides[index-1]
          let next = slides[index+1]
          if(isInViewport(prev))
          {
              dots[index-1].classList.add('bg-white')
              dots[index].classList.remove('bg-white')
              dots[index+1].classList.remove('bg-white')
          }
          else if (isInViewport(next))
          {
              dots[index+1].classList.add('bg-white')
              dots[index].classList.remove('bg-white')
              dots[index-1].classList.remove('bg-white')
          }
          else
          {
              dots[index].classList.add('bg-white')
              dots[index+1].classList.remove('bg-white')
              dots[index-1].classList.remove('bg-white')
          }
      }



  return (
    <motion.div initial={{opacity: 0}} animate={{opacity: 1}}
     className='w-full h-full relative'>
      {/* Image with gradient */}
      <div className='homeImageContainer w-full h-full absolute top-0 left-0 z-0'></div>
      {/* MainContainer */}
      <div className='homeContentContainer h-full w-full flex flex-col items-center justify-center absolute top-0 left-0 z-20'>
          {/* Logo */}
          <h1 className='logo font-playfair text-[90px] mt-[150px] font-medium'>Simply</h1>
          
          <div className='w-full relative'>
                    <div className='w-full flex flex-col justify-center items-center'>
                        <div className='infocontainer min-w-full overflow-x-scroll scroll flex gap-[1px] flex-row snap-x snap-mandatory'>
                            {/* Paragraph */}
                            <HomeInfo touchend={(e) => HandleTouchEnd(e.target, 0)} title={'Discover music'} paragraph={'Listen to your favorite music anywhere you are.'}/>
                            <HomeInfo touchend={(e) => HandleTouchEnd(e.target, 1)} title={'All for free'} paragraph={'Use all the features of our website for free.'}/>
                            <HomeInfo touchend={(e) => HandleTouchEnd(e.target, 2)} title={'Lorem Ipsum'} paragraph={'Lorem Ipsum is simply dummy text of the printing and typesetting.'}/>
                        </div>
                    </div>
                    {/* 3 dots */}
                    <div className='absolute bottom-0 left-0 w-full pb-[55px]'>
                          <div className='w-full flex flex-row justify-center items-center gap-2 self-center'>
                              <div id='dot0' className='dots w-[11px] h-[11px] rounded-full border-2 bg-white'></div>
                              <div id='dot1' className='dots w-[11px] h-[11px] rounded-full border-2'></div>
                              <div id='dot2' className='dots w-[11px] h-[11px] rounded-full border-2'></div>
                          </div>
                    </div>
            </div>

          {/* LoginButton */}
          <button onClick={() => history('/login')} className='w-[180px] h-11 my-[16px] text-xl rounded-full bg-white font-lato text-primary'>Log in</button> 
          {/* SingUp */}
          <p onClick={() => history('/signup')} className='homeSingUpButton w-[65%] text-center mb-20 cursor-pointer'>Sign up</p>
      </div>

    </motion.div>
  )
}
