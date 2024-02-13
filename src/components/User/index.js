import React, { useContext } from 'react';
import Navbar from "./Mnavbar";
import { Outlet } from 'react-router-dom';
import { ThemeContext } from '../../App';
function Index() {
    const theme=useContext(ThemeContext)
    const styles={
        backgroundColor:theme?"black":"white",
        color:theme?"white":"black"
    }
  return (
    <>
    <div style={styles}>
    <Navbar />
    </div>
    <div style={styles} >
    <Outlet />
    </div>
    </>
  )
}

export default Index


