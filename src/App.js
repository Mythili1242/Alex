
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import User from "./components/User";
import Mtable from "./components/User/Mtable";
import Editdata from "./components/User/Editdata"
import Newtodo from "./components/User/Newtodo"
import React, { createContext,useState } from 'react';
import { textAlign } from '@mui/system';
import Switch from '@mui/material/Switch';
import Nopage from './Nopage';
// import Lazyex from './components/User/Lazyex'
export const ThemeContext=createContext();
const LazyAbout=React.lazy(()=>import ('./components/User/Lazyex'))

const label = { inputProps: { 'aria-label': 'Switch demo' } };
function App() {

  const [theme,setTheme]=useState(false);
  const changeTheme=()=>{
    setTheme(!theme)
     window.localStorage.setItem("token",theme);
  }


  return (
    <>
    <ThemeContext.Provider value={theme}>
      <p style={{textAlign:'center',marginBottom:'1px'}}>
      <Switch {...label} onClick={changeTheme} />
        {/* <button onClick={changeTheme} >toggle</button></p> */}
        </p>
        
    <Router>
      <Routes>
      <Route path="/" element={<User />} >
        <Route path="/" element={<Mtable />} />
        <Route path='/edit/:id' element={<Editdata />} />
        <Route path="/newtodo" element={<Newtodo />} />
        {/* <Route path="/lazyex" element={<Lazyex />} /> */}
        <Route path="/lazyex" element={<React.Suspense fallback="Loading..."><LazyAbout /></React.Suspense>} />
      </Route>
      <Route path="*" element={<Nopage />} />
      </Routes>
    </Router> 
    </ThemeContext.Provider>
    </>
  );
}

export default App;
