import { observer } from "mobx-react-lite";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useEffect, useState } from "react";
import API from "../utils/API.ts";
import Paper from '@mui/material/Paper';
import { Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import ObjectsStore from "../utils/stores/ObjectsStore.ts";
const Objects = observer(()=>{
  const [page,setPage]=useState(1)
  const handleChange = (event, value) => {
    API.getObjects(value);
    setPage(value);
  };

  useEffect(()=>{
    API.getObjects()
  },[])

    return   <TableContainer component={Paper} sx={{mt:"1rem", height:"max-content"}}>
    <Table sx={{ minWidth: 650}} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell >Название</TableCell>
          <TableCell >Адрес</TableCell>
          <TableCell >Дата регистрации</TableCell>
          <TableCell >Количество поданных заявок</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {ObjectsStore.getObjects()!=undefined&&ObjectsStore.getObjects().map((el,i)=>{
          return <TableRow key={"o"+i}>
            <TableCell >{el.id}</TableCell>
            <TableCell >{el.title}</TableCell>
            <TableCell >{el.address}</TableCell>
            <TableCell >{el.date}</TableCell>
          </TableRow>
        })}
      </TableBody>
    </Table>
    <Pagination sx={{my:"10px", display:"flex", justifyContent: "center"}} count={ObjectsStore.getMeta()!=undefined&&ObjectsStore.getMeta().total_pages} page={page} onChange={handleChange} />
  </TableContainer>
})

export default Objects