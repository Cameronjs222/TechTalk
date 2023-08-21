import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Update from './components/Update';
import CreatePost from './components/CreatePost';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Routes>
        <Route path = '/' element = {<Navigate to = '/'></Navigate>}></Route>
        <Route path = '/' element = {"Compenent titles for each page"}></Route>
        <Route path = '/' element = {"Compenent titles for each page"}></Route>
        <Route path = '/' element = {"Compenent titles for each page"}></Route>
        <Route path = '/' element = {"Compenent titles for each page"}></Route>
        <Route path="/create" element={<CreatePost/>}/>
        <Route path="/update/:id" element={<Update/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
