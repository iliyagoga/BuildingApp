import { Alert, Button, Paper, TextField, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/API.ts";
import routes from "../utils/routes.ts";
import list from "../utils/apiLIst.ts";
import {valPassword,valEmail, loginValidator} from "../utils/validations/AuthValidator.ts"
import React from "react";
const Login = observer(()=>{
    const [email, setEmail]=useState<string>("")
    const [pass, setPass]=useState<string>("")
    const [error, setError]=useState<string|boolean>(false)

    const [vEmail, setVEmail]=useState<string|boolean>(false)
    const [vPass, setVPass]=useState<string|boolean>(false)
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
        <Typography>Войти</Typography>
        <TextField
            value={email}
            onChange={(e)=>{
                setEmail(e.target.value)
                setVEmail(valEmail(e.target.value))
            }}
            label="Почта"
            error={vEmail?true:false}
            helperText={vEmail&&vEmail}
        ></TextField>
        <TextField
            value={pass}
            onChange={(e)=>{
                setPass(e.target.value)
                setVPass(valPassword(e.target.value))
            }}
            type="password"
            label="Пароль"
            error={vPass?true:false}
            helperText={vPass&&vPass}
        ></TextField>
        <Button onClick={()=>{
            const errors=loginValidator(email, pass);
            if(errors===false){
                API.login(email,pass).then(()=>{nav(routes.user.mean)}).catch(error=>{
                    setError(error.message)
                    setTimeout(() => {
                        setError(false)
                    }, 2000);
                 })
            }
            else{
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
                    
            }
         
        }}>Войти</Button>
        {error&&
             <Alert 
             severity="error">{error}</Alert>
    
       }
    </Paper>
})

export default Login