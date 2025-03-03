import { observer } from "mobx-react-lite";
import CreateApp from "../components/CreateApp";
import { Box, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import routes from "../utils/routes.ts";
import { useEffect, useState } from "react";
import API from "../utils/API.ts";

const User =observer(()=>{
    const [auth, setAuth]=useState(false)
    useEffect(()=>{
        API.checkUser().then((e)=>{
            if(e){
                setAuth(true)
            }
            else{
                setAuth(false)
            }

            }).catch(e=>{
                if(e){
                    setAuth(true)
                }
                else{
                    setAuth(false)
                }
            })
    },[])
    return <>
          {auth&&<Typography><Link to={routes.user.applications}>Мои ссылки</Link></Typography>}
          <CreateApp></CreateApp>
    </>
  

   

})

export default User