import { observer } from "mobx-react-lite";
import CreateApp from "../components/CreateApp.tsx";
import React from "react";
import LinkStyled from "../components/styled/LinkStyled.tsx";

const User =observer((auth:string|boolean)=>{
    return <>
        {auth&& <LinkStyled></LinkStyled>}
        <CreateApp></CreateApp>
    </>
  

   

})

export default User