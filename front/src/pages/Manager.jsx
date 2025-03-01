import { observer } from "mobx-react-lite";
import Objects from "../components/Objects.jsx";
import { AppBar, Box, Button, Paper, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import routes from "../utils/routes.ts";
import Applications from "../components/Applications.jsx";
const Manager=observer(({mode})=>{
    const nav= useNavigate()
    console.log(mode)
    return <>
    <AppBar sx={{position:"static"}} component={Paper}>
        <Toolbar sx={{display: "flex", gap:"10px"}}>
            <Button variant={mode!="objects"?"outlined":"contained"} sx={{color: "white", borderColor: "white", fontSize:"1rem", px:"2rem"}} onClick={()=>{nav(routes.manager.mean+routes.manager.objects)}}>
                Объекты
            </Button>
            <Button variant={mode!="appls"?"outlined":"contained"} sx={{color: "white", borderColor: "white", fontSize:"1rem", px:"2rem"}} onClick={()=>{nav(routes.manager.mean+routes.manager.appls)}}>
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