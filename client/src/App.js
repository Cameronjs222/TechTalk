import './App.css';
import Update from './components/Update';
import CreatePost from './components/CreatePost';
import Home from "./components/home"
import ViewPost from "./components/viewPost"
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginReg from './components/LoginReg';
import EditUser from './components/EditUser';
import User from './components/viewUser';
import { useEffect, useState } from 'react';
function App() {

  const [currentUser, setCurrentUser] = useState()

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginReg setCurrentUser={setCurrentUser} currentUser={currentUser} />} ></Route>
          <Route path='/' element={<Navigate to='/login'></Navigate>}></Route>
          <Route path="/home" element={<Home setCurrentUser={setCurrentUser} currentUser={currentUser} />
          } />
          <Route path="/viewPost" element={<ViewPost setCurrentUser={setCurrentUser} currentUser={currentUser} />
          } />
         <Route path="/User/:userId" element={<User setCurrentUser={setCurrentUser} currentUser={currentUser} />
          } />
          <Route path="/editUser" element={<EditUser setCurrentUser={setCurrentUser} currentUser={currentUser} />
          } /> 
        <Route path="/create" element={<CreatePost/>}/>
        <Route path="/update/:id" element={<Update/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;