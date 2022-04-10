import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { Typography } from "@mui/material";



export default function BasicTable(props) {
    const [tableData,setTableData] = React.useState(null);
    React.useEffect(async() => {
          try {
            const response = await axios.post(
              `http://127.0.0.1:8000/getrecord`,
              {
                data: {
                  ...props.requestData,
                },
              }
            );
            console.log(
              "------------Table Data ---------------"
            );
            console.log(response);
            if (response && response.status === 200) {
                setTableData([ ...response.data.tableData.values() ]);
            } else {
              console.log("Setting error Table data");
              setTableData("ERROR");
            }
          } catch (e) {
            console.log(e);
            console.log("Setting error Table Data");
            setTableData("ERROR");
          }
        
        
      }, [props.requestData]);
      

     console.log("table data",tableData);

     if (!tableData) {
        return <Typography>Loading ....</Typography>;
      } else if (tableData && tableData === "ERROR") {
        return <Typography>No chart data !!</Typography>;
      }

  
  return (
      <TableContainer component={Paper} style={{ maxHeight: 400 ,maxWidth:800 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table" >
        <TableHead style={{backgroundColor:'#EBECF0'}}>
          <TableRow>
            <TableCell>Location</TableCell>
            <TableCell align="right">PLU</TableCell>
            <TableCell align="right">LiterAsessment</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Permittee</TableCell>
            <TableCell align="right">Itemcount</TableCell>
          </TableRow>
        </TableHead>
        
        <TableBody>
          
          <TableRow>
           {
          
          tableData.map((item,index) => {
            
            
              return (
                
                <tr key={item.recid}>
                  <td key={1}>{item.location}</td>
                  <td key={2}>{item.plu}</td>
                  <td key={3}>{item.LitterAssessment}</td>
                  <td key={4}>{item.date}</td>
                  <td key={5}>{item.permittee}</td>
                  <td key={6}>{item.itemcount}</td>
          
                </tr>
              )
              
          })}
            
          </TableRow>
          

        </TableBody>
      </Table>

    </TableContainer>
    
 );
}
