import React, {useEffect} from 'react'
import { DownArrow } from '../../../Icons'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { handleDownAnim } from '../../../Utils/Animations'
import '../../../vanilla.css'
import { motion } from 'framer-motion';
import { SignOut, appVersion, db, auth } from '../../../firebase'
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { async } from '@firebase/util'


export default function Settings() {

  const history = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState(false)
  const SiteTitle = 'Settings - Simply'
  document.title = SiteTitle


//SetNotificationsOnOff
 useEffect(() => {
  
  const GetFirebaseData = async () => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    docSnap.data().settings.notifications ? setNotifications(true) : setNotifications(false)
  }

  GetFirebaseData().catch(console.error);
  
 }, [])
 



  const DeleteForm = ({isVisible}) => {
    return <>
      <div className={`${isVisible ? 'visible' : 'invisible'} absolute z-10 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[80%] h-[200px] overflow-hidden rounded-2xl flex flex-col justify-between items-center bg-white border-[1px] border-primary`}>
        <div className='w-full h-full flex justify-center items-center'>
          <p className='font-lato text-[19px] p-9 text-secondary text-center font-semibold'>Are you sure you want to delete your account?</p>
        </div>
        <div className='w-full h-12 flex flex-row items-center justify-center divide-x divide-solid'>
          <button onClick={handleAccountDelete} className='w-1/2 h-full p-6 font-lato text-[25px] bg-primary flex justify-center items-center'>Yes</button>
          <button onClick={handleClickDelAccount} className='w-1/2 h-full p-6 font-lato text-[25px] bg-primary flex justify-center items-center'>No</button>
        </div>
      </div>
    </>
  }

  const handleClickDelAccount = () => {
    setIsOpen(!isOpen)
  }
  
  const handleAccountDelete = () => {
    const DeleteAccountData = async () => {
      await deleteDoc(doc(db, "users", auth.currentUser.uid))
      }
      DeleteAccountData().then(() => {
        SignOut(()=>{history("/")})
      }).catch(console.error)
  }


  const handleClickNotifications = () => {
    setNotifications(!notifications)
    const docRef = doc(db, "users", auth.currentUser.uid)
    const UpdateDB = async () => {
      await updateDoc(docRef, {
        settings:
        {
          notifications: !notifications
        }
      })
  }
  UpdateDB().catch(console.error)
}
  
  const Logout = () => {
    SignOut(()=>{history("/")})
  }

  let viewportHeight = window.innerHeight;

  return (
    <motion.div transition={{duration: 0.5, ease: "easeInOut" }} initial={{y: viewportHeight, opacity: 0}} 
    animate={{y: 0, opacity: 1}} exit={{y: viewportHeight, opacity: 0}}
    id='container' className='mainContainer w-full h-full relative'>
      <DeleteForm isVisible={isOpen}/>
        <div className='w-full h-full p-8 bg-white flex flex-col justify-between items-center'>
            {/* BackArrow */}
            <div className='w-full h-auto'>
                <button className='' onClick={() => handleDownAnim(()=>{ history('/home')})}><DownArrow/></button>
            </div>
            {/* SettingsContainer */}
            <div className='mb-20 w-full flex flex-col justify-center items-start gap-4 text-secondary'>
              <ul className='w-full'>
                <li onClick={handleClickNotifications} className='flex flex-col justify-center items-start mt-10'>
                <p className='text-[19px] font-lato text-secondary'>Push Notifications</p>
                <p className='text-[14px] font-lato text-tertiary'>Currently {notifications ? 'on' : 'off'}</p>
                </li>

                <li onClick={() => history('/privacy')} className='flex flex-col justify-center items-start mt-10'>
                <p className='text-[19px] font-lato text-secondary'>Account & privacy</p>
                <p className='text-[14px] font-lato text-tertiary'>Manage password and your account</p>
                </li>

                <li className='w-full flex flex-row justify-between items-center mt-10'>
                <div>
                    <p className='text-[19px] font-lato text-secondary'>Dark Mode</p>
                    <p className='text-[14px] font-lato text-tertiary'>Currently off</p>
                </div> 
                {/* <Switch className={`${isOpen ? 'invisible' : 'visible'} scale-[70%]`}/> */}
                <label for='check' className='relative bg-[#8D8D8D] cursor-pointer  w-16 h-7 rounded-full'>
                  <input type='checkbox' id='check' className='sr-only peer z-1'/>
                    <span className='absolute w-7 h-7  bg-primary left-[-1px] rounded-full peer-checked:bg-red-900 peer-checked:left-[35px] bottom-[12px] top-0 transition-all duration-150'></span>
                </label>
                

                
                </li>

                <li  onClick={() => history('/about')} className='flex flex-coljustify-start items-center mt-10'>
                <p className='text-[19px] font-lato text-secondary'>About</p>       
                </li>

                <li onClick={() => history('/feedback')} className='flex flex-col justify-center items-start mt-10'>
                <p className='text-[19px] font-lato text-secondary'>Feedback</p>       
                </li>
              </ul>

              <ul className='w-full h-[60px] mt-16 mb-10'>
                <li onClick={handleClickDelAccount} className='flex flex-col justify-center items-start'>
                <p className='text-[19px] font-lato text-error'>Delete Account</p>
                </li>
                <li onClick={Logout} className='flex flex-col justify-center items-start mt-5'>
                <p className='text-[19px] font-lato text-secondary'>Sign Out</p>
                </li>
              </ul>
            </div>
            {/* Footer */}
            <div className='w-full flex flex-row justify-between items-center '>
                <p className='text-tertiary'>App version {appVersion}</p>
                <p className='text-primary font-playfair text-2xl'>Simply</p>
              </div>
        </div>  
    </motion.div>
  )
}
