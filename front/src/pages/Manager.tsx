import { observer } from "mobx-react-lite";
import Objects from "../components/Objects.tsx";
import { AppBar, Box, Paper, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import routes from "../utils/routes.ts";
import Applications from "../components/Applications.tsx";
import Button from "../components/styled/Button.tsx";
import React from "react";
const Manager=observer((mode:string)=>{
    const nav= useNavigate()
    return <>
    <AppBar sx={{position:"static"}} component={Paper}>
        <Toolbar sx={{display: "flex", gap:"10px"}}>
            <Button variant={mode!="objects"?"outlined":"contained"} onClick={()=>{nav(routes.manager.mean+routes.manager.objects)}}>
                Объекты
            </Button>
            <Button variant={mode!="appls"?"outlined":"contained"} onClick={()=>{nav(routes.manager.mean+routes.manager.appls)}}>
                Заявки
            </Button>
        </Toolbar>
    </AppBar>
    {mode=="appls"?
    <Applications></Applications>
    :
    <Objects></Objects>
    }
    </>
    
})

export default Manager