import logo from './logo.svg';
import './App.css';
import { Route, Routes, BrowserRouter as Router} from 'react-router-dom';
import Home from './Components/Containers/HomePage/Home';

function App() {
  return (
    <div className="h-screen w-full">
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
