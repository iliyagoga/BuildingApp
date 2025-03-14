import { Box, Button, Card, Container, FormControl, FormHelperText, InputLabel, MenuItem, Pagination, Select, TextField, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { ChangeEvent, useEffect, useState } from "react";
import API from "../utils/API.ts";
import ObjectsStore from "../utils/stores/ObjectsStore.ts";
import { useNavigate } from "react-router-dom";
import routes from "../utils/routes.ts";
import { valDescription, valTitle, valEmail, valDate, valObject, appValidator } from "../utils/validations/AppValidator.ts";
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

    const [vTitle,setVTitle]=useState<string|boolean>(false);
    const [vDesc,setVDesc]=useState<string|boolean>(false);
    const [vEmail,setVEmail]=useState<string|boolean>(false);
    const [vDate,setVDate]=useState<string|boolean>(false);
    const [vSelect,setVSelect]=useState<string|boolean>(false);
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
        helperText={vTitle&&vTitle}
        value={title}
        onChange={(e)=>{
            setTitle(e.target.value)
            setVTitle(valTitle(e.target.value))
        }}
        type="text"
        label="Название">

        </TextField>
        <TextField
        error={vDesc?true:false}
        helperText={vDesc&&vDesc}
        value={description}
        onChange={(e)=>{
            setDescription(e.target.value)
            setVDesc(valDescription(e.target.value))
        }}
        type="text"
        label="Описание">

        </TextField>
        <TextField
        error={vEmail?true:false}
        helperText={vEmail&&vEmail}
        value={email}
        onChange={(e)=>{
            setEmail(e.target.value)
            setVEmail(valEmail(e.target.value))
        }}
        type="email"
        label="Почта">

        </TextField>
        <InputLabel>Дата подачи</InputLabel>
        <TextField
        error={vDate?true:false}
        helperText={vDate&&vDate}
        value={date}
        onChange={(e)=>{
            setDate(e.target.value)
            setVDate(valDate(e.target.value))
        }}
        type="date"
        >
        </TextField>
  
        <FormControl>
            <InputLabel id="select">Объект</InputLabel>
            <Select
            error={vSelect?true:false}
            labelId="select"
            label="Объект"
            onChange={(e)=>{
                setSelect(e.target.value)
                setVSelect(valObject(e.target.value))
            }}
            value={select}>
                {ObjectsStore.getObjects()!=undefined&&ObjectsStore.getObjects().map((e,i)=>{
                    if(i+1>10*(page-1) && i+1<=10*(page)){
                        return <MenuItem value={e.id} key={e.id}>
                            {e.title}
                        </MenuItem>
                    }
                })}
                <Container sx={{display:"flex"}}>
                    <Button onClick={()=>{
                        setSelect("")
                        setVSelect("Заполните")
                        }}sx={{fontSize:"12px"}}>Очистить</Button>
                    <Pagination sx={{my:"10px", display:"flex", justifyContent: "center"}} count={ObjectsStore.getObjects()!=undefined?Math.ceil(ObjectsStore.getObjects().length/10):1} page={page} onChange={handleChange} />
                </Container>
                   
            </Select>
            {vSelect&&<FormHelperText error>{vSelect}</FormHelperText>}
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
               const errors=appValidator(title,description,email,date, select);
               if(errors===false){
                   API.createApplication(title,description,email,date, select,file).then((res)=>{nav(routes.link.mean+"/"+res)})
               }
               else{
                   if(errors['title']!=undefined){
                       setVTitle(errors['title'])
                   }
                   else{
                       setVTitle(false)
                   }
                   if(errors['description']!=undefined){
                       setVDesc(errors['description'])
                   }
                   else{
                       setVDesc(false)
                   }
                   if(errors['email']!=undefined){
                       setVEmail(errors['email'])
                   }
                   else{
                       setVEmail(false)
                   }
                   if(errors['date']!=undefined){
                       setVDate(errors['date'])
                   }
                   else{
                       setVDate(false)
                   }
                   if(errors['object']!=undefined){
                       setVSelect(errors['object'])
                   }
                   else{
                       setVSelect(false)
                   }
                       
               }
           
      
        }}>Создать</Button>
    </Card>
})

export default CreateApp