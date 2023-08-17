import logo from './logo.svg';
import './App.css';
import Home from "./components/home"
import ViewPost from "./components/viewPost"
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Routes>
        <Route path = '/' element = {<Navigate to = '/'></Navigate>}></Route>
        <Route path = '/home' element = {<Home/>}></Route>
        <Route path = '/viewPost' element = {<ViewPost/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
