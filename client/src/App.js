import './App.css';
import CreatePost from './components/CreatePost';
import Home from "./components/Home"
import ViewPost from "./components/viewPost"
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginReg from './components/LoginReg';
import EditUser from './components/EditUser';
import { useEffect, useState } from 'react';
import UpdatePost from './components/UpdatePost';
function App() {

  const [currentUser, setCurrentUser] = useState()

  const [onePost, setOnePost]= useState({
    title:"",
    content:""  })

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
          <Route path="/editUser" element={<EditUser setCurrentUser={setCurrentUser} currentUser={currentUser} />
          } /> 
        <Route path="/create" element={<CreatePost setOnePost={setOnePost} />}/>
        <Route path="/edit/:id" element={<UpdatePost setOnePost={setOnePost}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;