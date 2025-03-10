import { Alert, Button, Paper, TextField, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import RegValidator from "../utils/validations/RegValidator.ts";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/API.ts";
import routes from "../utils/routes.ts";
import list from "../utils/apiLIst.ts";
import React from "react";

const Register = observer(()=>{
    const [login, setLogin]=useState("")
    const [email, setEmail]=useState("")
    const [pass, setPass]=useState("")
    const [repass, setRepass]=useState("")
    const [error, setError]=useState(false)

    const [vLogin, setVLogin]=useState(false)
    const [vEmail, setVEmail]=useState(false)
    const [vPass, setVPass]=useState(false)
    const [vRepass, setVRepass]=useState(false)
    const nav = useNavigate()
    return <Paper
        sx={{
            maxWidth:420,
            gap:"1rem",
            p:"1rem",
            m:"auto",
            display:"flex", 
            flexDirection:"column"
        }}>
        <Typography>Регистрация</Typography>
        <TextField
            value={login}
            onChange={(e)=>{
                setLogin(e.target.value)
            }}
            label="Логин"
            error={vLogin?true:false}
            helperText={vLogin&&vLogin}
        ></TextField>
        <TextField
            value={email}
            onChange={(e)=>{
                setEmail(e.target.value)
            }}
            label="Почта"
            type="email"
            error={vEmail?true:false}
            helperText={vEmail&&vEmail}
        ></TextField>
        <TextField
            value={pass}
            onChange={(e)=>{
                setPass(e.target.value)
            }}
            type="password"
            label="Пароль"
            error={vPass?true:false}
            helperText={vPass&&vPass}
        ></TextField>
        <TextField
            value={repass}
            onChange={(e)=>{
                setRepass(e.target.value)
            }}
            label="Повтор пароля"
            type="password"
            error={vRepass?true:false}
            helperText={vRepass&&vRepass}
        ></TextField>
        <Button onClick={()=>{
             const errors=RegValidator(login, email, pass, repass);
             if(errors===false){
                 API.register(login,email,pass).then(()=>{nav(routes.user.mean)}).catch(error=>{
                    setError(error.message)
                    setTimeout(() => {
                        setError(false)
                    }, 2000);
                 })
             }
             else{
                 if(errors['login']!=undefined){
                     setVLogin(errors['login'])
                 }
                 else{
                     setVLogin(false)
                 }
                if(errors['email']!=undefined){
                    setVEmail(errors['email'])
                }
                else{
                    setVEmail(false)
                }
                if(errors['pass']!=undefined){
                    setVPass(errors['pass'])
                }
                else{
                    setVPass(false)
                }
                if(errors['repass']!=undefined){
                    setVRepass(errors['repass'])
                }
                else{
                    setVRepass(false)
                }
                     
             }
        }}>Зарегистрироваться</Button>
        {error&&
             <Alert 
             severity="error">{error}</Alert>
    
       }
    </Paper>
})

export default Register