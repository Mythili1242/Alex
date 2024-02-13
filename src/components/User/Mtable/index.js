import React, { useState, useEffect,useContext,useRef } from 'react'
import { Button } from 'react-bootstrap';
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableHead from "@mui/material/TableHead"
import TablePagination from "@mui/material/TablePagination"
import TableRow from "@mui/material/TableRow"
import TableFooter from "@mui/material/TableFooter"
import axios from "axios"
import { faEdit, faSort, faT, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Await, useNavigate } from 'react-router-dom';
import ConfirmModal from './ConfirmModel';
import environment from '../../../environment';
import { ThemeContext } from '../../../App';
import { useReactToPrint } from 'react-to-print';
//  import { CSVLink } from "react-csv";
 import { DownloadTableExcel } from 'react-export-table-to-excel';
//import { getTodoAsync } from '../../../reducers/todocount';
import { useSelector, useDispatch } from "react-redux";
import { Store } from '../../../store';
import { getPosts } from '../../../reducers/todocount';

 function Index() {
  const dispatch = useDispatch();
 
const {posts,loading}=useSelector((state)=>state.post )
const [userList, setUserList] = useState(posts)
useEffect(()=>{
  setUserList(posts)
})
console.log(posts);
console.log(loading);

//  const [reduxdata]=useSelector((state)=>state.todocount.data)
 console.log(Store.getState());
//  const [userList, setUserList] = useState(reduxdata || [])

  const inputDom=useRef('')  //takes only one object
  const print1 = useReactToPrint({
      content: () => inputDom.current,
    });
 

    const theme=useContext(ThemeContext)
    const styles={
        backgroundColor:theme?"black":"white",
        color:theme?"white":"black"
    }
     // const [userList, setUserList] = useState(data)
   
    const navigate=useNavigate();
    const [verify,setVerify]=useState(false);
  const [deleteId,setDeleteId]=useState("");
  const [tab,setTab]=useState(true);
   useEffect(() => {
        // const url =   `${environment.api}/todos`
     
        
        //   axios
        //     .get(url)
        //     .then((response) => {
        //       let users = []
      
        //       if (response.data && response.data.length) {
        //         users = response.data
        //         console.log(users);
        //       }
      
        //       setUserList(users)
               
              
        //     })
        //     .catch((errors) => {
        //       console.log(errors);
      
              
        //     })

      // dispatch(getTodoAsync())
  dispatch(getPosts())

 

     },[])
    //  if(loading)
    //  {
    //   return <h1>loading...</h1>
    //  }
    
      // const [reduxdata]=useSelector((state)=>state.todocount.data)
  
      // const [userList, setUserList] = useState()
      // if(reduxdata!=null){
      // setUserList(reduxdata)
      // console.log(Store.getState().todocount.data);

      // }
      // else{
      //   dispatch(getTodoAsync())
        
      //   setUserList(reduxdata)
      //   console.log(Store.getState().todocount.data);

      // }
    
function onEdit(id){
navigate("/edit/"+id)
// window.location.href= "http://localhost:3000/edit/"+id  
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

// const [tabgrid,setTabgrid]=useState();
// function toggler(){
//     if(tab){
        
//     }
//     setTab(false);
// }


function onSearch(event) {
    let text = event.target.value;

    if (!text) {


      // setUserList([]);
      window.location.reload();
    } else {
      let filterd = userList.filter((user) => {
        return user.title.toLowerCase().includes(text.toLowerCase());
      });
      setUserList(filterd);

      if(filterd.length<=5){
        setRowsPerPage(5);
        setPage(0);
      }
    }
  }



const [page, setPage] = useState(0)
const [rowsPerPage, setRowsPerPage] = useState(5)
const emptyRows =
  page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0
const handleChangePage = (event, newPage) => {
  setPage(newPage)
}
const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(parseInt(event.target.value, 5))
  setPage(0)
}

//----------------------
// const camelCase = str => {
//   return str.substring(0, 1).toUpperCase() + str.substring(1);
// };

// const filterColumns = data => {
//   // Get column names
//   const columns = Object.keys(data[0]);
//   let headers = [];
//   columns.forEach((col, idx) => {
//     if (col !== "") {
//       // OR if (idx !== 0)
//       headers.push({ label: camelCase(col), key: col });
//     }
//   });

//   return headers;
// };

//---------------------------

// function handleDownloadExcel() {
//   downloadExcel({
//     fileName: "react-export-table-to-excel -> downloadExcel method",
//     sheet: "react-export-table-to-excel",
//     tablePayload: {
//       // header,
//       // accept two different data structures
//       body: userList,
//     },
//   });
// }
 const tableRef = useRef(null);
  return (
    <>
    <div>
    <div style={{ display: "flex" }}>
    {/* <Button style={{ marginLeft: "auto" }} onClick={toggler}>Show As {tab?'Grid':'Table'}</Button> */}
    </div>
    <input style={{marginLeft:'130px',marginTop:'20px'}} placeholder="search Titles" onChange={onSearch} />
    <button onClick={print1} style={{marginLeft:"1050px"}}>print </button>

    {/* <button onClick={handleDownloadExcel}>download excel</button> */}
    {/* --------------------------------- */}
    <DownloadTableExcel
                    filename="userstable"
                    sheet="users"
                    currentTableRef={tableRef.current} enablePagination={false}
                >

                   <button> Export to excel </button>

                </DownloadTableExcel>
{/* ------------------------------- */}
    {/* <CSVLink data={userList} headers={filterColumns(userList)} filename={"test.csv"}>
        Export to Excel
      </CSVLink> */}
{/* ------------------------------------- */}
    <div className="container">

    
      <div className='table-responsive' style={styles}  ref={inputDom}>
       
        <Table
          sx={{ minWidth: 500, marginTop: "10px" }}
          aria-label='custom pagination table'  ref={tableRef}
        > 
          <TableHead>
            <TableRow style={styles} >
            <TableCell style={styles}>#</TableCell>
            <TableCell style={styles}>Titles</TableCell>
             <TableCell style={styles}>Complete</TableCell>
             <TableCell style={styles}>Target Date</TableCell>
            <TableCell style={styles}>Created At</TableCell>
            <TableCell style={styles}>Updated At</TableCell>
            <TableCell style={styles}>Actions</TableCell>

            
            </TableRow>
          </TableHead>
          <TableBody style={styles}>
            {(rowsPerPage > 0
              ? userList.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : userList
            ).map((item) => (
              <TableRow key={item.id} style={styles}>
                <TableCell component='th' scope='row'  style={styles}>
                  {item.id}
                </TableCell>
                <TableCell align='left' style={styles}>{item.title}</TableCell>
                <TableCell align='left' style={styles}>{item.completed?"Done":"Incomplete"}</TableCell>
                <TableCell align='left' style={styles}>{item.target}</TableCell>
                <TableCell align='left' style={styles}>{item.updatedAt}</TableCell>
                <TableCell align='left' style={styles}>{item.createdAt}</TableCell>
                <TableCell align="left" style={styles}><Button variant='warning' style={{marginRight:'10px',marginLeft:'20px'}}><FontAwesomeIcon icon={faEdit} onClick={()=>onEdit(item.id)} /></Button>
          <Button  variant='danger'><FontAwesomeIcon icon={faTrash} onClick={()=>onDelete(item.id)}/></Button>
                </TableCell>
                
              </TableRow>
              
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody> 
          <TableFooter>
            <TableRow style={styles}>
              <TablePagination style={styles}
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                count={userList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
        {verify? <ConfirmModal onClose={onVerifyClose} />:" "}
      </div>
      </div></div>
      {loading && <p>data loading</p>}
      
      </>
  )
}


     
     
export default Index;






// import React, { useState, useEffect } from 'react'
// import Table from 'react-bootstrap/Table';
// import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faEdit, faSort, faT, faTrash } from "@fortawesome/free-solid-svg-icons";
// import { Button } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import ConfirmModal from './ConfirmModel';

// function Index() {
//     const [userList, setUserList] = useState([])
//     const navigate=useNavigate();
//     const [verify,setVerify]=useState(false);
//   const [deleteId,setDeleteId]=useState("");
//   const [tab,setTab]=useState(true);
//    useEffect(() => {
//         const url = "http://localhost:3001/todos"
    
//           axios
//             .get(url)
//             .then((response) => {
//               let users = []
      
//               if (response.data && response.data.length) {
//                 users = response.data
//                 console.log(users);
//               }
      
//               setUserList(users)
               
              
//             })
//             .catch((errors) => {
//               console.log(errors);
      
              
//             })
   
//       }, [])
    
// function onEdit(id){
// //navigate("./edit/"+id)
// window.location.href= "http://localhost:3000/edit/"+id  
// }

// function onDelete(productId){
//     //  verify:window.confirm("Are you sure you want to delete this product?")
   
//     setDeleteId(productId);
//     setVerify(true);
//   }

//   function onVerifyClose(result){
//     if(!result){
//       setVerify(false);
//       return;
      
//     }
  
    
//     axios.delete(`http://localhost:3001/todos/${deleteId}`)  
//       .then(res => {  
//         console.log(res);  
//         console.log(res.data);
//         window.location.href="/"
//         }
//       )
//     }
// const [tabgrid,setTabgrid]=useState();
// function toggler(){
//     if(tab){
        
//     }
//     setTab(false);
// }

//   return (
//     <>
//     <div style={{ display: "flex" }}>
//     <Button style={{ marginLeft: "auto" }} onClick={toggler}>Show As {tab?'Grid':'Table'}</Button></div>
//      <Table striped bordered hover className='container mt-5'>
//       <thead>
//         <tr className='text-center'>
//           <th>#</th>
//           <th>Titles</th>
//           <th>Completed</th>
//           <th>Target Date</th>
//           <th>Created At</th>
//           <th>Updated At</th>
//           <th>Actions</th>
//         </tr>
//       </thead>
//       <tbody>
//       {userList
//             .map((item) => (

//         <tr key={item.id}>
//           <td>{item.id}</td>
//           <td>{item.title}</td>
//           <td>{item.completed?"Done":"Incomplete"}</td>
//           <td>{item.target}</td>
//           <td>{item.updatedAt}</td>
//           <td>{item.createdAt}</td>
//           <td><Button variant='warning' style={{marginRight:'10px',marginLeft:'20px'}}><FontAwesomeIcon icon={faEdit} onClick={()=>onEdit(item.id)} /></Button>
//           <Button  variant='danger'><FontAwesomeIcon icon={faTrash} onClick={()=>onDelete(item.id)}/></Button></td>
//         </tr>

//             ))}
//       </tbody>
//     </Table>
//     {verify? <ConfirmModal onClose={onVerifyClose} />:" "}
//     </>
//   )
// }

// export default Index;




































