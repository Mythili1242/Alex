import React,{useState,useContext} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Container } from 'react-bootstrap';
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../../App';

function Index() {
    
    // const theme=useContext(ThemeContext)
    // const styles={
    //     backgroundColor:theme?"black":"white",
    //     color:theme?"white":"black"
    // }
    var a=new Date();
    var b=new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(a)
   
   
    const [date1, setDate1] = useState(b);
  
    const [date, setDate] = useState(new Date());
    const navigate=useNavigate();
    const formik = useFormik({ 
        initialValues: {
            id:"",
          title: "",
          target:date1,
        //   completed:true,
          updatedAt:date1,
          createdAt:date1,
         
         

         
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
          title: Yup.string()
            .min(3, "Must be  3 characters or more")
            .max(15, "Must be 15 characters or less")
            .required("Required"),
         
        }),
        onSubmit: (values) => {
            console.log(values);
            
          axios.post("http://localhost:3001/todos", values)
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
<Container >



    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3" controlId="title">
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
        <Form.Check type="checkbox" label="Completed" name="completed" onChange={formik.handleChange}
              value={formik.values.completed} />
      </Form.Group>


      <Form.Group className="mb-3" controlId="seldate">
        <Form.Label>Target</Form.Label>
        <DatePicker  name="target" className="form-control"
          selected={date}
              value={formik.values.target} 
            //   onChange={(e)=>{formik.setFieldValue(e.target.value)}}
            onChange={date => setDate(date)}
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