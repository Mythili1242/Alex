import React, { useEffect ,useContext} from 'react';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { add } from '../../../reducers/todocount';
import { useSelector } from 'react-redux';
// import { ThemeContext } from '../../../App';

import {  selectVal } from '../../../reducers/todocount';

function Index() {
  // const theme=useContext(ThemeContext)  
  // const styles={
  //     backgroundColor:theme?"black":"white",
  //     color:theme?"white":"black"
  // }
  const dispatch=useDispatch();
  
  const [userlist,SetUserlist]=useState([])
   const todoscount=useSelector((state)=>state.todocount.value)
// const [c,setC]=useState()
// useEffect(()=>{
//   setC(todoscount)
// })
  useEffect(() => {
    const url = "http://localhost:3001/todos"

      axios
        .get(url)
        .then((response) => {
          let users = []
  
          if (response.data && response.data.length) {
            users = response.data
           // console.log(users);
            SetUserlist(users)
          }  
        })
        .catch((errors) => {
          console.log(errors);
  
          
        })

  }, [userlist])
 dispatch(add(userlist));

  return (
    <div >
    <Navbar  expand="lg" bg='light'  >
      <Container fluid>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/lazyex">Lazyex</Nav.Link>
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/newtodo" className='position-relative'>Todo<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" >{todoscount}</span>    
                
</Nav.Link>
          
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  )
}

export default Index