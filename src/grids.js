import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faSort, faT, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from './ConfirmModel';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

function Index() {
    const [userList, setUserList] = useState([])
    const navigate=useNavigate();
    const [verify,setVerify]=useState(false);
  const [deleteId,setDeleteId]=useState("");
  const [tab,setTab]=useState(true);
   useEffect(() => {
        const url = "http://localhost:3001/todos"
    
          axios
            .get(url)
            .then((response) => {
              let users = []
      
              if (response.data && response.data.length) {
                users = response.data
                console.log(users);
              }
      
              setUserList(users)
               
              
            })
            .catch((errors) => {
              console.log(errors);
      
              
            })
   
      }, [])
    
function onEdit(id){
//navigate("./edit/"+id)
window.location.href= "http://localhost:3000/edit/"+id  
}

function onDelete(productId){
    //  verify:window.confirm("Are you sure you want to delete this product?")
   
    setDeleteId(productId);
    setVerify(true);
  }

  function onVerifyClose(result){
    if(!result){
      setVerify(false);
      return;
      
    }
  
    
    axios.delete(`http://localhost:3001/todos/${deleteId}`)  
      .then(res => {  
        console.log(res);  
        console.log(res.data);
        window.location.href="/"
        }
      )
    }

function toggler(){
   
    setTab(!tab);

}

const columns = [
    { field: '#', headerName: 'ID', width: 90 },
    {
      field: 'title',
      headerName: 'title',
      width: 150,
      editable: true,
    },
    {
      field: 'completed',
      headerName: 'completed',
      width: 150,
      editable: true,
    },
    {
      field: 'target',
      headerName: 'Target Date',
      
      width: 110,
      editable: true,
    },
    {
        field: 'createdAt',
        headerName: 'Created At',
        
        width: 110,
        editable: true,
      },
      {
        field: 'updatedAt',
        headerName: 'updated At',
        
        width: 110,
        editable: true,
      },
  ];
  
  const rows = [
    userList.map((item) => (
    { id: 'item.id', title:'item.title',completed:item.completed?"Done":"Incomplete",target:'item.target',createdAt:'item.createdAt',updatedAt:'item.updatedAt'}
        ))
    ]
  

  return (
    <>
    <div style={{ display: "flex" }}>
    <Button style={{ marginLeft: "auto" }} onClick={toggler}>Show As {tab?'Table':'Grid'}</Button></div>
    if(tab){
     <Table striped bordered hover className='container mt-5'>
      <thead>
        <tr className='text-center'>
          <th>#</th>
          <th>Titles</th>
          <th>Completed</th>
          <th>Target Date</th>
          <th>Created At</th>
          <th>Updated At</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
      {userList
            .map((item) => (

        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.title}</td>
          <td>{item.completed?"Done":"Incomplete"}</td>
          <td>{item.target}</td>
          <td>{item.updatedAt}</td>
          <td>{item.createdAt}</td>
          <td><Button variant='warning' style={{marginRight:'10px',marginLeft:'20px'}}><FontAwesomeIcon icon={faEdit} onClick={()=>onEdit(item.id)} /></Button>
          <Button  variant='danger'><FontAwesomeIcon icon={faTrash} onClick={()=>onDelete(item.id)}/></Button></td>
        </tr>

            ))}
      </tbody>
    </Table>
    }
    else{
        <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
       
        disableRowSelectionOnClick
      />
    </Box>
    }
    {verify? <ConfirmModal onClose={onVerifyClose} />:" "}
    </>
  )
}

export default Index;