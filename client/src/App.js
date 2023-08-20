import logo from './logo.svg';
import './App.css';
import Home from "./components/home"
import ViewPost from "./components/viewPost"
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import LoginReg from './components/LoginReg';
import EditUser from './components/EditUser';
import {useState} from 'react';

function App() {

  const [currentUser, setCurrentUser] = useState(null);

  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path = '/login' element = {<LoginReg setCurrentUser={setCurrentUser} currentUser={currentUser}/>} ></Route>
        <Route path = '/' element = {<Navigate to = '/login'></Navigate>}></Route>
        <Route path = '/home' element = {<Home setCurrentUser={setCurrentUser} currentUser={currentUser}/>}  ></Route>
        <Route path = '/viewPost' element = {<ViewPost/>}></Route>
        <Route path = '/EditUser' element = {<EditUser/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;