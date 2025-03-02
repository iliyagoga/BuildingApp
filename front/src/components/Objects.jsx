import { observer } from "mobx-react-lite";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useEffect, useState } from "react";
import API from "../utils/API.ts";
import Paper from '@mui/material/Paper';
import { Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from "@mui/material";
import ObjectsStore from "../utils/stores/ObjectsStore.ts";
import { set } from "mobx";
const Objects = observer(()=>{
  const [orderBy, setOrderBy]= useState(null)
  const [order,setOrder]= useState('asc')

  const orderFunction =(value)=>{
    setOrderBy(value)
    if(order=="asc"){
      setOrder('desc')
    }
    else{
      setOrder('asc')
    }
    const objects= Object.assign(ObjectsStore.getObjects())
    return objects.sort((a, b) => {
      if (a[value] < b[value]) {
        return order === 'desc' ? -1 : 1;
      }
      if (a[value] > b[value]) {
        return order === 'desc' ? 1 : -1;
      }
      return 0;
    });
  }

  const [page,setPage]=useState(1)
  const handleChange = (event, value) => {
    API.getObjects(value);
    setPage(value);
    setOrderBy(null)
    setOrder('asc')
  };

  useEffect(()=>{
    API.getObjects()
  },[])

    return   <TableContainer component={Paper} sx={{mt:"1rem", height:"max-content"}}>
    <Table sx={{ minWidth: 650}} aria-label="simple table">
      <TableHead>
        <TableRow>
    
          <TableCell>
            <TableSortLabel
            active={orderBy === 'id'}
            direction={orderBy === 'id' ? order : 'asc'}
            onClick={()=>{orderFunction('id')}}
            >
              ID
            </TableSortLabel>
          </TableCell>
          <TableCell >
            <TableSortLabel 
              active={orderBy  === 'title'}
              direction={orderBy === 'title' ? order : 'asc'}
              onClick={()=>{orderFunction('title')}}
              >
            Название
            </TableSortLabel>
          </TableCell>
          <TableCell >
            <TableSortLabel
            active={orderBy === 'address'}
            direction={orderBy === 'address' ? order : 'asc'}
            onClick={()=>{orderFunction('address')}}
            >
            Адрес
            </TableSortLabel>
          </TableCell>
          <TableCell >
            <TableSortLabel
            active={orderBy === 'date'}
            direction={orderBy === 'date' ? order : 'asc'}
            onClick={()=>{orderFunction('date')}}
            >
              Дата регистрации
              </TableSortLabel>
            </TableCell>
          <TableCell >
          <TableSortLabel 
          active={orderBy === 'object'}
          direction={orderBy === 'object' ? order : 'asc'}
          onClick={()=>{orderFunction('object')}}
          >
            Количество поданных заявок
            </TableSortLabel>
          </TableCell>
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