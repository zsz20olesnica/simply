
import { Route, Routes, BrowserRouter as Router, useLocation} from 'react-router-dom';

import { AnimatePresence } from 'framer-motion';

import Home from './Components/Containers/HomePage/Home';
import SingUp from './Components/Containers/SingUpPage/SingUp';
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




function App() {
  const location = useLocation()
  return (
    <div className="h-screen w-full font-lato scroll-smooth">
    {/* Tu jest wszystko dobrze i prosze mi tu nie ruszac nie dodawać zadnego BrowserRouter ani nic takiego - Kamil */}
      <AnimatePresence exitBeforeEnter>
            <Routes key={location.pathname} location={location}>
                <Route path='/' element={<Home />}/>
                <Route path='/signup' element={<SingUp />}/>
                <Route path='/createaccount' element={<CreateAccount />}/>
                <Route path='/home' element={<Main />}/>
                <Route path='/favorites' element={<Favorites />}/>
                <Route path='/settings' element={<Settings />}/>
                <Route path='/about' element={<About />}/>
                <Route path='/feedback' element={<Feedback />}/>
                <Route path='/privacy' element={<Privacy />}/>
                <Route path='/search' element={<Search />}/>
                <Route path='/filtered' element={<Filtered />}/>
                <Route path='/player' element={<Player />}/>
            </Routes> 
      </AnimatePresence>
    </div>
  );
}

export default App;
