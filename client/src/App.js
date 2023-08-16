import logo from './logo.svg';
import './App.css';
import Home from "./components/Home"
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Routes>
        <Route path = '/' element = {<Navigate to = '/'></Navigate>}></Route>
        <Route path = '/home' element = {<Home/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
