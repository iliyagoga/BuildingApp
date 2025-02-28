import { observer } from "mobx-react-lite";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Paper from '@mui/material/Paper';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
const Objects = observer(()=>{
    const columns = [
        { 
            field: 'id', 
            headerName: 'ID', 
            width: 70 },
        { 
            field: 'title', 
            headerName: 'Название',
            width: 130 },
        { 
            field: 'address', 
            headerName: 'Адрес', 
            width: 130 },
        {
           field: 'date',
           headerName: 'Дата регистрации',
           type: 'date',
           width: 90,
        }

      ];
    return   <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Dessert (100g serving)</TableCell>
          <TableCell align="right">Calories</TableCell>
          <TableCell align="right">Fat&nbsp;(g)</TableCell>
          <TableCell align="right">Carbs&nbsp;(g)</TableCell>
          <TableCell align="right">Protein&nbsp;(g)</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        
      </TableBody>
    </Table>
  </TableContainer>
})

export default Objects