
import { Route, Routes, BrowserRouter as Router, useLocation} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AnimatePresence, filterProps } from 'framer-motion';

import { PlayerData, db } from './firebase'
import { collection, query, onSnapshot, where } from 'firebase/firestore'



import Home from './Components/Containers/HomePage/Home';
import SingUp from './Components/Containers/SingUpPage/SingUp';
import LogIn from './Components/Containers/LogIn/LogIn';
import LogInViaSimply from './Components/Containers/LogIn/LogInViaSimply';
import CreateAccount from './Components/Containers/CreateAccountPage/CreateAccount';
import Main from './Components/Containers/MainPage/Main';
import Favorites from './Components/Containers/FavouritesPage/Favourites';
import Settings from './Components/Containers/SettingsPage/Settings';
import Search from './Components/Containers/SearchPage/Search';
import Filtered from './Components/Containers/SearchPage/Filtered';
import Player from './Components/Containers/PlayerPage/Player'
import About from './Components/Containers/AboutPage/About'
import Feedback from './Components/Containers/FeedbackPage/Feedback'
import Privacy from './Components/Containers/PrivacyPage/Privacy';
import Album from './Components/Containers/AlbumPage/AlbumPage';
import LoginOkAccounts from './Components/Containers/LogIn/LoginOkAccounts';
import AdminPanel from './Components/Containers/Admin/AdminPanel'



function App() {
  const location = useLocation()

  // Firebase

  //SongsArray
  const [songs, setSongs] = useState([])
  useEffect(() => {
      const q = query(collection(db, 'songs'))
      const unsub = onSnapshot(q, (querySnapshot) => {
          let ExistingElementsArray = [];
          querySnapshot.forEach((doc) => {
              ExistingElementsArray.push({...doc.data(), id: doc.id});
          });
          setSongs(ExistingElementsArray)
      });
      return () => unsub() ;
  }, []);





  let SongsFilteredByCategory = {
    Calm: [[], []],
    Chill: [[], []],
    Happy: [[], []],
    Sad: [[], []],
    Angry: [[], []],
    Lonely: [[], []],
    Gloomy: [[], []],
    Hopeful: [[], []],
    Romantic: [[], []],
    Party: [[], []],
    Reading: [[], []],
    Dancing: [[], []],
    Christmas: [[], []],
    Gym: [[], []],
    Date: [[], []],
    Car: [[], []],
    Learning: [[], []]
  }

  let [SongsByCategory, setSongsByCategory] = useState([])
  
  
  useEffect(() => {
      songs.forEach((song) => {
        //Save song categories
        let Categories = song.songCategories

          //Write song of category to FilteredSongs
          Categories.forEach((category) => {
            SongsFilteredByCategory[category][0] = category
            SongsFilteredByCategory[category][1].push(song)     

          })
          
        setSongsByCategory(
          Object.keys(SongsFilteredByCategory)
          .map((key) => {
              return SongsFilteredByCategory[key];
          })
        )
      })
  }, [songs])






  return (
    <div className="h-screen w-full font-lato scroll-smooth">
    {/* Tu jest wszystko dobrze i prosze mi tu nie ruszac nie dodawać zadnego BrowserRouter ani nic takiego - Kamil */}
      <AnimatePresence exitBeforeEnter>
        <Routes key={location.pathname} location={location}>
          <Route path='/' element={<Home />}/>
          <Route path='/signup' element={<SingUp />}/>
          <Route path='/createaccount' element={<CreateAccount />}/>
          <Route path='/home' element={<Main songs={SongsByCategory} foryousongs={songs}/>}/>
          <Route path='/favourites' element={<Favorites />}/>
          <Route path='/settings' element={<Settings />}/>
          <Route path='/about' element={<About />}/>
          <Route path='/feedback' element={<Feedback />}/>
          <Route path='/privacy' element={<Privacy />}/>
          <Route path='/search' element={<Search />}/>
          <Route path='/filtered' element={<Filtered />}/>
          <Route path='/player' element={<Player />}/>
          <Route path='/album' element={<Album />}/>
          <Route path='/login' element={<LogIn />}/>
          <Route path='/loginviasimply' element={<LogInViaSimply />} />
          <Route path='/okaccounts' element={<LoginOkAccounts />} />
          <Route path='/admin' element={<AdminPanel />} />
        </Routes> 
      </AnimatePresence>
    </div>
  );
}

export default App;
