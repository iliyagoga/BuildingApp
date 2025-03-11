import { Alert, Button, Paper, TextField, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/API.ts";
import routes from "../utils/routes.ts";
import list from "../utils/apiLIst.ts";
import React from "react";
import { regValidator, valEmail, valLogin, valPassword, valRepass } from "../utils/validations/AuthValidator.ts";

const Register = observer(()=>{
    const [login, setLogin]=useState<string>("")
    const [email, setEmail]=useState<string>("")
    const [pass, setPass]=useState<string>("")
    const [repass, setRepass]=useState<string>("")

    const [error, setError]=useState<string|boolean>(false)
    const [vLogin, setVLogin]=useState<string|boolean>(false)
    const [vEmail, setVEmail]=useState<string|boolean>(false)
    const [vPass, setVPass]=useState<string|boolean>(false)
    const [vRepass, setVRepass]=useState<string|boolean>(false)
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
                setVLogin(valLogin(e.target.value))
            }}
            label="Логин"
            error={vLogin?true:false}
            helperText={vLogin&&vLogin}
        ></TextField>
        <TextField
            value={email}
            onChange={(e)=>{
                setEmail(e.target.value)
                setVEmail(valEmail(e.target.value))

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
                setVPass(valRepass(e.target.value,repass))
                setVRepass(valRepass(e.target.value,repass))
                setVPass(valPassword(e.target.value))
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
                setVRepass(valRepass(e.target.value,pass))
                setVPass(valRepass(e.target.value,pass))
                setVRepass(valPassword(e.target.value))
            }}
            label="Повтор пароля"
            type="password"
            error={vRepass?true:false}
            helperText={vRepass&&vRepass}
        ></TextField>
        <Button onClick={()=>{
             const errors=regValidator(login, email, pass, repass);
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