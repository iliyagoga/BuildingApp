import { observer } from "mobx-react-lite";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useEffect, useState } from "react";
import API from "../utils/API.ts";
import Paper from '@mui/material/Paper';
import { InputLabel, MenuItem, Pagination, Select, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import AppStore from "../utils/stores/AppStore.ts";
const Applications = observer(()=>{
  const [page,setPage]=useState(1)
  const handleChange = (event, value) => {
    API.getApplications(value);
    setPage(value);
  };

  useEffect(()=>{
    API.getApplications()
  },[])

    return   <TableContainer component={Paper} sx={{mt:"1rem", height:"max-content"}}>
    <Table sx={{ minWidth: 650}} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell >Название</TableCell>
          <TableCell >Описание</TableCell>
          <TableCell >Почта</TableCell>
          <TableCell>Дата подачи</TableCell>
          <TableCell >Статус</TableCell>
          <TableCell >Объект</TableCell>

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
            <TableCell >{el.object_id}</TableCell>
          </TableRow>
        })}
      </TableBody>
    </Table>
    <Pagination sx={{my:"10px", display:"flex", justifyContent: "center"}} count={AppStore.getMeta()!=undefined&&AppStore.getMeta().total_pages} page={page} onChange={handleChange} />
  </TableContainer>
})

export default Applications