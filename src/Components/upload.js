import React from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Link } from "react-router-dom";
//import S123_EPA from './public/S123_EPA.xlsx';
import Grid from "@mui/material/Grid";
import axios from "axios";
import * as XLSX from "xlsx";
import Container from '@mui/material/Container';
import "../App.css";
import { Paper } from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#FFF',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
  };

const Upload =()=>{
   const [file,setFile]=React.useState();
   const [name,setName]=React.useState('');
  

   
   const onFileChange=  (event) =>{
     
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(event.target.files[0]);
    var data='test';
    fileReader.onload = event => {
      const bstr = event.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      console.log('before append',data);
      data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      console.log('afterappend',data);  
      setFile(data);
    };
    
    
       //readTextFile()
   };
   console.log("file",file);


   React.useEffect(()=> {
    (
        async() =>{
            const response= await fetch('http://127.0.0.1:8080/api/user',{
                  headers: {'Content-Type': 'application/json'},
                  credentials:'include',
            });

            const content=await response.json();
            setName(content.Name);
        }
    )();


});


 const submitFile= () =>{
    const data = {
       file:file,
      };
      console.log('data',data);
      axios.post('http://127.0.0.1:8080/api/upload',  data ).then((res) => {
        console.log("------------- get record -------------------");
        console.log({ data });
        console.log(res.data);
      });
 };

  const onFileUpload=() =>{
      //e.prevent.default();
      submitFile();
  }

  const logout = async() =>{
      const response= await fetch('http://127.0.0.1:8080/api/logout',{
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            credentials:'include',
      });

      const content=await response.json();
      setName('');
  }

    return(
     <Container maxWidth="md">
      <Paper elevation={2}>
        
        
      <Grid container justifyContent="center" spacing={2}  >
          <Grid item md={12}>

            <label value={name}>Hello {name} , you have logged in!</label>
          </Grid>
          <Grid item md={12}> 
         <label>You may download the <Button><a href={'/S123_EPA.xlsx'} download="your file name">Template</a></Button>for reference</label>
          </Grid>
          <Grid item md={12}>
          <label><h4> You may now upload a excel file</h4></label>
          
               
          </Grid>
          <Grid item md={12}>
         
          <input required type="file" onChange={onFileChange} />
               
          </Grid>

          <Grid item md={12}>
           <Button variant="contained"  onClick={onFileUpload} style={{
                backgroundColor: "#008080",
              }}>Upload</Button>
      
          </Grid>
          
          <Grid item md={12}>
          <Link to='/upload' underline='none' style={{ color: "#008080", textDecoration: 'none' }} onClick={logout} >Logout</Link>
          
          </Grid>
      </Grid>
      </Paper>
      
      

      
    
    </Container>
    )
}
export default Upload