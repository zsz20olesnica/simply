import logo from './logo.svg';
import { Route, Routes, BrowserRouter as Router} from 'react-router-dom';
import Home from './Components/Containers/HomePage/Home';
import Main from './Components/Containers/MainPage/Main';
import Favorites from './Components/Containers/FavouritesPage/Favourites';
import Settings from './Components/Containers/SettingsPage/Settings';
import Search from './Components/Containers/SearchPage/Search';
import Filtered from './Components/Containers/SearchPage/Filtered';
import Player from './Components/Containers/PlayerPage/Player'
function App() {
  return (
    <div className="h-screen w-full font-lato">
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />}/>
          <Route exact path='/home' element={<Main />}/>
          <Route exact path='/favorites' element={<Favorites />}/>
          <Route exact path='/settings' element={<Settings />}/>
          <Route exact path='/search' element={<Search />}/>
          <Route exact path='/filtered' element={<Filtered />}/>
          <Route exact path='/player' element={<Player />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
