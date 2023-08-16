import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

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
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
