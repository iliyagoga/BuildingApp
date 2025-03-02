import { Box, Button, Card, Container, FormControl, InputLabel, MenuItem, Pagination, Select, TextField, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import API from "../utils/API.ts";
import ObjectsStore from "../utils/stores/ObjectsStore.ts";

const CreateApp = observer(()=>{
    const [title, setTitle]=useState("")
    const [description, setDescription]=useState("")
    const [email, setEmail]=useState("")
    const [date, setDate]=useState("")
    const [select, setSelect]=useState("")

    const [page,setPage]=useState(1)

    
    const handleChange = (event, value) => {
        API.getObjects(value);
        setPage(value);
    };

    useEffect(()=>{
        API.getObjects()
    },[])

    return <Card 
        sx={{
        display: "flex",
        justifyContent:"center",
        flexDirection:"column",
        gap:"1rem",
        p:"1rem",
        maxWidth:400,
        margin:"auto"
        }}
    >
        <Typography level="h1" sx={{fontSize:"xl"}}>Заявка</Typography>
        <TextField 
        value={title}
        onChange={(e)=>{setTitle(e.target.value)}}
        type="text"
        label="Название">

        </TextField>
        <TextField
        value={description}
        onChange={(e)=>{setDescription(e.target.value)}}
        type="text"
        label="Описание">

        </TextField>
        <TextField
        value={email}
        onChange={(e)=>{setEmail(e.target.value)}}
        type="email"
        label="Почта">

        </TextField>
        <TextField
        value={date}
        onChange={(e)=>{setDate(e.target.value)}}
        type="date"
        label="Дата подачи">

        </TextField>
        <FormControl>
            <InputLabel id="select">Объект</InputLabel>
            <Select
            labelId="select"
            label="Объект"
            onChange={(e)=>{setSelect(e.target.value)}}
            value={select}>
                {ObjectsStore.getObjects()!=undefined&&ObjectsStore.getObjects().map((e,i)=>{
                    return <MenuItem value={e.id}>
                        {e.title}
                    </MenuItem>
                })}
                <Container sx={{display:"flex"}}>
                    <Button onClick={()=>{setSelect("")}}sx={{fontSize:"12px"}}>Очистить</Button>
                    <Pagination sx={{my:"10px", display:"flex", justifyContent: "center"}} count={ObjectsStore.getMeta()!=undefined&&ObjectsStore.getMeta().total_pages} page={page} onChange={handleChange} />
                </Container>
                   
            </Select>
        </FormControl>
    

        <Button onClick={()=>{
            API.createApplication(title,description,email,date, select)
        }}>Создать</Button>
    </Card>
})

export default CreateApp