import { observer } from "mobx-react-lite";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useEffect, useState } from "react";
import API from "../utils/API.ts";
import Paper from '@mui/material/Paper';
import { Button, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TextField } from "@mui/material";
import ObjectsStore from "../utils/stores/ObjectsStore.ts";
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
    setPage(value);
    setOrderBy(null)
    setOrder('asc')
  };

  useEffect(()=>{
    API.getObjects()
  },[])

  const [fId,setFID]=useState(null)
  const [fTitle, setFTitle]=useState(null)
  const [fAddress,setFAddress]=useState(null)
  const [fDate,setFDate]=useState(null)
  const [fCount,setFCount]=useState(null)

    return   <TableContainer component={Paper} sx={{mt:"1rem", height:"max-content"}}>
    <Table sx={{ minWidth: 650}} aria-label="simple table">
      <TableHead>
      <TableRow>
        <TableCell >
          <TextField
          label="ID"
          value={fId}
          onChange={(e)=>{setFID(e.target.value)}}>
          </TextField>
        </TableCell>
        <TableCell >
          <TextField
          label="Название"
          value={fTitle}
          onChange={(e)=>{setFTitle(e.target.value)}}>
          </TextField>
        </TableCell>
        <TableCell >
          <TextField
          label="Адрес"
          value={fAddress}
          onChange={(e)=>{setFAddress(e.target.value)}}
          >
          </TextField>
        </TableCell>
        <TableCell >
          <TextField
          label="Дата"
          value={fDate}
          onChange={(e)=>{setFDate(e.target.value)}}
          >
          </TextField>
        </TableCell>
        <TableCell >
          <TextField
          label="Количество заявок"
          value={fCount}
          onChange={(e)=>{setFCount(e.target.value)}}
          >

          </TextField>
        </TableCell>
        <TableCell >
          <Button onClick={()=>{
            setPage(1)
            API.getObjectsByFilter(fId,fTitle,fAddress, fDate,  fCount)
          }}>Поиск</Button>
        </TableCell>
        </TableRow>
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
          active={orderBy === 'count'}
          direction={orderBy === 'count' ? order : 'asc'}
          onClick={()=>{orderFunction('count')}}
          >
            Количество поданных заявок
            </TableSortLabel>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {ObjectsStore.getObjects()!=undefined&&ObjectsStore.getObjects().map((el,i)=>{
          if(i+1>5*(page-1) && i+1<=5*(page)){
            return <TableRow key={"o"+i}>
              <TableCell >{el.id}</TableCell>
              <TableCell >{el.title}</TableCell>
              <TableCell >{el.address}</TableCell>
              <TableCell >{el.date}</TableCell>
              <TableCell >{el.count>0?el.count:0}</TableCell>
            </TableRow>
          }
        })}
      </TableBody>
    </Table>
    <Pagination sx={{my:"10px", display:"flex", justifyContent: "center"}} count={ObjectsStore.getObjects()!=undefined?Math.ceil(ObjectsStore.getObjects().length/5):1} page={page} onChange={handleChange} />
  </TableContainer>
})

export default Objects