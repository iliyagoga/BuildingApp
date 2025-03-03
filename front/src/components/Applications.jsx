import { observer } from "mobx-react-lite";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useEffect, useState } from "react";
import API from "../utils/API.ts";
import Paper from '@mui/material/Paper';
import { Button, FormControl, FormLabel, InputLabel, MenuItem, Pagination, Select, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TextField } from "@mui/material";
import AppStore from "../utils/stores/AppStore.ts";
const Applications = observer(()=>{

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
      const objects= Object.assign(AppStore.getApplications())
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
    API.getApplications();
    setPage(value);
    setOrderBy(null)
    setOrder('asc')
  };

  useEffect(()=>{
    API.getApplications()
  },[])

  const [fId,setFID]=useState(null)
  const [fTitle, setFTitle]=useState(null)
  const [fDescr,setFDescr]=useState(null)
  const [fEmail, setFEmail]=useState(null)
  const [fDate,setFDate]=useState(null)
  const [fStatus,setFStatus]=useState(null)
  const [fObject,setDObject]=useState(null)

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
          label="Описание"
          value={fDescr}
          onChange={(e)=>{setFDescr(e.target.value)}}
          >
          </TextField>
        </TableCell>
        <TableCell >
          <TextField
          label="Почта"
          value={fEmail}
          onChange={(e)=>{setFEmail(e.target.value)}}
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
          <FormControl sx={{width:"100%"}}>
            <InputLabel is="st">Статус</InputLabel>
          <Select
          sx={{width:"100%"}}
          labelId="st"
          label="Статус"
          value={fStatus}
          onChange={(e)=>{setFStatus(e.target.value)}}
          >
            <MenuItem value="null"> None
            </MenuItem>
            <MenuItem value="added">Добавлена
            </MenuItem>
            <MenuItem value="process">В процессе
            </MenuItem>
            <MenuItem value="closed">Закрыта
            </MenuItem>
          </Select>
          </FormControl>
        </TableCell>
        <TableCell >
          <TextField
          label="Объект"
          value={fObject}
          onChange={(e)=>{setDObject(e.target.value)}}
          >

          </TextField>
        </TableCell>
        <TableCell >
          <Button onClick={()=>{
            API.getApplicationsByFilter(fId,fTitle,fDescr,fEmail, fDate, fStatus)
          }}>Поиск</Button>
        </TableCell>
        </TableRow>
        <TableRow>
          <TableCell >
            <TableSortLabel
            active={orderBy === 'id'}
            direction={orderBy === 'id' ? order : 'asc'}
            onClick={()=>{orderFunction('id')}}
            >
              ID
            </TableSortLabel>
          </TableCell> 
          <TableCell> 
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
              active={orderBy === 'description'}
              direction={orderBy === 'description' ? order : 'asc'}
              onClick={()=>{orderFunction('description')}}
              >
                Описание
            </TableSortLabel>
          </TableCell>
          <TableCell >
            <TableSortLabel
            active={orderBy === 'email'}
            direction={orderBy === 'email' ? order : 'asc'}
            onClick={()=>{orderFunction('email')}}
            >
              Почта
            </TableSortLabel>
          </TableCell> 
          <TableCell >
            <TableSortLabel
            active={orderBy === 'date'}
            direction={orderBy === 'date' ? order : 'asc'}
            onClick={()=>{orderFunction('date')}}
            >
              Дата подачи
              </TableSortLabel>
            </TableCell>
            <TableCell >
              <TableSortLabel
              active={orderBy === 'status'}
              direction={orderBy === 'status' ? order : 'asc'}
              onClick={()=>{orderFunction('status')}}
              >
                Статус
              </TableSortLabel>
            </TableCell>
            <TableCell >
              <TableSortLabel
              active={orderBy === 'object_id'}
              direction={orderBy === 'object_id' ? order : 'asc'}
              onClick={()=>{orderFunction('object_id')}}
              >
                Объект
              </TableSortLabel>
            </TableCell>

        </TableRow>
      </TableHead>
      <TableBody>
        {AppStore.getApplications()!=undefined&&AppStore.getApplications().map((el,i)=>{
          return <TableRow key={"a"+i}>
            <TableCell >{el.id}</TableCell>
            <TableCell >{el.title}</TableCell>
            <TableCell >{el.description}</TableCell>
            <TableCell >{el.email}</TableCell>
            <TableCell >{el.date}</TableCell>
            <TableCell >
                <Select
                    value={el.status}
                    label="Status"
                    onChange={async(e)=>{
                        await API.updateApplication(el.id,e.target.value);
                        await API.getApplications()
                    }}
                >
                    <MenuItem value="added">Добавлена
                    </MenuItem>
                    <MenuItem value="process">В процессе
                    </MenuItem>
                    <MenuItem value="closed">Закрыта
                    </MenuItem>
                </Select>
            </TableCell>
            <TableCell >{el.object.title}</TableCell>
          </TableRow>
        })}
      </TableBody>
    </Table>
    <Pagination sx={{my:"10px", display:"flex", justifyContent: "center"}} count={AppStore.getApplications()!=undefined?Math.round(AppStore.getApplications().length/5):1} page={page} onChange={handleChange} />
  </TableContainer>
})

export default Applications