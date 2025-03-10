import { Box, Button, Card, Container, FormControl, FormHelperText, InputLabel, MenuItem, Pagination, Select, TextField, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";
import API from "../utils/API.ts";
import ObjectsStore from "../utils/stores/ObjectsStore.ts";
import { useNavigate } from "react-router-dom";
import routes from "../utils/routes.ts";
import AppValidator from "../utils/validations/AppValidator.ts";
import React from "react";

const CreateApp = observer(()=>{
    const [title, setTitle]=useState<string>("")
    const [description, setDescription]=useState<string>("")
    const [email, setEmail]=useState<string>("")
    const [date, setDate]=useState<string>("")
    const [select, setSelect]=useState<string>("")
    const [file, setFile]=useState<File|null>(null)

    const [page,setPage]=useState(1)

    const nav=useNavigate()
    const handleChange = (event, value) => {
        API.getObjects();
        setPage(value);
    };

    const [vTitle,setVTitle]=useState(false);
    const [vDesc,setVDesc]=useState(false);
    const [vEmail,setVEmail]=useState(false);
    const [vDate,setVDate]=useState(false);
    const [vSelect,setVSelect]=useState(false);
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
        <Typography sx={{fontSize:"xl"}}>Заявка</Typography>
        <TextField 
        error={vTitle?true:false}
        helperText={vTitle&&"Не заполнено"}
        value={title}
        onChange={(e)=>{setTitle(e.target.value)}}
        type="text"
        label="Название">

        </TextField>
        <TextField
        error={vDesc?true:false}
        helperText={vDesc&&"Не заполнено"}
        value={description}
        onChange={(e)=>{setDescription(e.target.value)}}
        type="text"
        label="Описание">

        </TextField>
        <TextField
        error={vEmail?true:false}
        helperText={vEmail&&"Не заполнено или неправильный формат"}
        value={email}
        onChange={(e)=>{setEmail(e.target.value)}}
        type="email"
        label="Почта">

        </TextField>
        <InputLabel>Дата подачи</InputLabel>
        <TextField
        error={vDate?true:false}
        helperText={vDate&&"Не заполнено"}
        value={date}
        onChange={(e)=>{setDate(e.target.value)}}
        type="date"
        >
        </TextField>
  
        <FormControl>
            <InputLabel id="select">Объект</InputLabel>
            <Select
            error={vSelect?true:false}
            labelId="select"
            label="Объект"
            onChange={(e)=>{setSelect(e.target.value)}}
            value={select}>
                {ObjectsStore.getObjects()!=undefined&&ObjectsStore.getObjects().map((e,i)=>{
                    if(i+1>10*(page-1) && i+1<=10*(page)){
                        return <MenuItem value={e.id} key={e.id}>
                            {e.title}
                        </MenuItem>
                    }
                })}
                <Container sx={{display:"flex"}}>
                    <Button onClick={()=>{setSelect("")}}sx={{fontSize:"12px"}}>Очистить</Button>
                    <Pagination sx={{my:"10px", display:"flex", justifyContent: "center"}} count={ObjectsStore.getObjects()!=undefined?Math.ceil(ObjectsStore.getObjects().length/10):1} page={page} onChange={handleChange} />
                </Container>
                   
            </Select>
            {vSelect&&<FormHelperText error>Не заполнено</FormHelperText>}
        </FormControl>

            <InputLabel id="file">Загрузить файл</InputLabel>
            <TextField
            onChange={(e:ChangeEvent<HTMLInputElement>)=>{
                setFile(e.target.files[0])}}
            type="file"
            inputProps={{accept: '.jpg, .jpeg, .png'}}
            >

            </TextField>
        
    

        <Button onClick={()=>{
            const errors=AppValidator(title,description,email,date, select);
            if(errors===false){
                API.createApplication(title,description,email,date, select,file).then((res)=>{nav(routes.link.mean+"/"+res)})
            }
            else{
                if(errors['title']!=undefined){
                    setVTitle(true)
                }
                else{
                    setVTitle(false)
                }
                if(errors['description']!=undefined){
                    setVDesc(true)
                }
                else{
                    setVDesc(false)
                }
                if(errors['email']!=undefined){
                    setVEmail(true)
                }
                else{
                    setVEmail(false)
                }
                if(errors['date']!=undefined){
                    setVDate(true)
                }
                else{
                    setVDate(false)
                }
                if(errors['object']!=undefined){
                    setVSelect(true)
                }
                else{
                    setVSelect(false)
                }
                    
            }
      
        }}>Создать</Button>
    </Card>
})

export default CreateApp