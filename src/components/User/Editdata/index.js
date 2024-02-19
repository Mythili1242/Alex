import React,{useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Container } from 'react-bootstrap';
import axios from 'axios';
import { useEffect,useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from "yup";
import { Navigate, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../../App';
import moment, { Moment } from 'moment/moment';

function Index(props) {
    const theme=useContext(ThemeContext)
    const styles={
        backgroundColor:theme?"black":"white",
        color:theme?"white":"black" 
    }
    // var a=new Date();
    // var b=new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(a)
   
    const now=moment().format('YYYY-MM-DD')
    console.log(now);
    const [date, setDate] = useState(new Date());  
    const [user,setUser]=useState([]);
    const [comp,setComp]=useState(false)
    const [token,setToken]=useState(false);
    const params=useParams();
    const {id}=params;
    console.log(id);
    const navigate=useNavigate();
    // useEffect(()=>{
    //   const token=window.localStorage.getItem("token")
    //   setToken(token)
      
    // })
    // window.localStorage.removeItem("token")
    // const styles={
    //     backgroundColor:token?"black":"white",
    //     color:token?"white":"black" 
        
    // }
   
    useEffect(() => {
        const url = "http://localhost:3001/todos/"+id
    
          axios
            .get(url)
            .then((response) => {
              let users = []
                console.log(response);
                users = response.data;
                console.log(users);
            //   if (response.data && response.data.length) {
            //     users = response.data;
            //     console.log(users);
            //   }
      
              setUser(users)
             
              
            })
            .catch((errors) => {
              console.log(errors);
      
              
            })
   
      }, [])
console.log(user.completed);
// function checker(){
//     if(user.completed==true)
//     {
//         return true;
//     }
//     else{
//         return false;
//     }
// }
const updatedAt=date;
console.log(updatedAt);
  const formik = useFormik({
        initialValues:{...user,updatedAt:updatedAt},
        enableReinitialize: true,
        validationSchema: Yup.object({
          title: Yup.string()
            .min(3, "Must be  3 characters or more")
            .max(30, "Must be 30 characters or less")
            .required("Required"),
         
        }),
        onSubmit: (values) => {
            console.log(values);
            
          axios.put("http://localhost:3001/todos/"+id, values)
            .then((res) => {
              console.log(res);
            
              navigate("/");
              
            })
            .catch((err) => {
              alert("unauthorized access");
            });


        },
      });
     
  return (
    
<Container style={styles}>



<Form onSubmit={formik.handleSubmit} style={styles}>
  <Form.Group className="mb-3" controlId="title" >
    <Form.Label>Title</Form.Label>
    <Form.Control type="text" name="title" placeholder="Enter Todo" onChange={formik.handleChange}
          value={formik.values.title} />
          <Form.Text className="text-danger">
          {formik.touched.title && formik.errors.title ? (
            <div className="text-danger">{formik.errors.title}</div>
          ) : null}
        </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="completed">
    <Form.Check type="checkbox" label="Completed" name="completed" checked={formik.values.completed}  onChange={formik.handleChange} 
          />
  </Form.Group>


  <Form.Group className="mb-3" controlId="target">
    <Form.Label>Target</Form.Label>
    <DatePicker  name="target" className="form-control"
       selected={date} 
          //  value={formik.values.target} 
        //   onChange={(e)=>{formik.setFieldValue(e.target.value)}}
        onChange={date => {setDate(date)}}
    //  onChange={date => {setDate(new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(date));
    //     formik.handleChange()}}
        //   onChange={(value) => {
        // 	formik.setFieldValue(value); //Date.parse(value)
        // 	}}
     
        />
              


  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
    
</Form>

</Container>

  )
}

export default Index;