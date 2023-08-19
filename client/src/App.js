import logo from './logo.svg';
import './App.css';
import Home from "./components/home"
import ViewPost from "./components/viewPost"
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import LoginReg from './components/LoginReg';
import EditUser from './components/EditUser';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path = '/' element = {<LoginReg />}></Route>
        <Route path = '/home' element = {<Home/>}></Route>
        <Route path = '/viewPost' element = {<ViewPost/>}></Route>
        <Route path = '/EditUser' element = {<EditUser/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;