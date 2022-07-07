import logo from './logo.svg';
import './App.css';
import { Route, Routes, BrowserRouter as Router} from 'react-router-dom';
import Home from './Components/Containers/HomePage/Home';
import Main from './Components/Containers/MainPage/Main';
function App() {
  return (
    <div className="h-screen w-full font-lato">
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />}/>
          <Route exact path='/home' element={<Main />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
