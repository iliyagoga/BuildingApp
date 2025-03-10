import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useHref, useParams } from "react-router-dom";
import API from "../utils/API.ts";
import { Alert, Card, Container, MenuItem, Paper, Select, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import routes from "../utils/routes.ts";
import React from "react";
import ApplicationAble from "../utils/interfaces/ApplicationInAble.ts";
const Link = observer(()=>{
    const params= useParams()
    const [data,setData]=useState<ApplicationAble|undefined>(undefined)

    const [alert,setAlert] =useState(false)
    const link:string|undefined = params.link
    useEffect(()=>{
        API.getApplicationByLink(link).then(res=>{
            setData(res)
        })
    },[])
    return <Card>
         <Table sx={{ minWidth: 650}} aria-label="simple table">
        <TableHead>
            <TableRow>
            <TableCell >Название</TableCell>
            <TableCell >Описание</TableCell>
            <TableCell >Почта</TableCell>
            <TableCell>Дата подачи</TableCell>
            <TableCell >Статус</TableCell>
            <TableCell >Объект</TableCell>
            <TableCell >Файл</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
           <TableRow>
            {data!=undefined&&<>
                <TableCell >{data.title}</TableCell>
                <TableCell >{data.description}</TableCell>
                <TableCell >{data.email}</TableCell>
                <TableCell >{data.date}</TableCell>
                <TableCell >
                    <Select
                    value={data.status} disabled>
                        <MenuItem value="added">Добавлена</MenuItem>
                        <MenuItem value="process">В процессе</MenuItem>
                        <MenuItem value="closed">Закрыта</MenuItem>
                    </Select>
                    </TableCell>
                <TableCell >{data.object['title']}</TableCell>
                <TableCell >{data.file?<a target="_blank" href={data.file}>{data.file.substring(0,10)}...</a>:<Typography>Нет</Typography>}</TableCell>
            </>}
            </TableRow>
            
        </TableBody>
        </Table>
        <Paper sx={{mt:"1rem"}}>
        <Container sx={{p:"1rem", display:"flex"}}>
            <Typography>Ваша ссылка: </Typography>
            <Typography sx={{color:"whiteblue", ml:"1rem", cursor:"pointer"}} onClick={
                ()=>{
                    if(alert===false){
                        navigator.clipboard.writeText(routes.host+routes.link.mean+"/"+link);
                        setAlert(true);
                        setTimeout(() => {
                            setAlert(false)
                        }, 2000);
                    }
                 

                    }}>{routes.host+routes.link.mean+"/"+link}</Typography>
        </Container>
        {alert&&<Alert severity="success">Ссылка скопирована</Alert>}
        </Paper>
       
    </Card>
})

export default Link