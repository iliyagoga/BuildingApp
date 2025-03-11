import { Button, Pagination, Paper, Table, TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import API from "../utils/API.ts";
import { Link} from "react-router-dom";
import routes from "../utils/routes.ts";
import PrivateLinksStore from "../utils/stores/PrivateLinksStore.ts";
import React from "react";
import LinkAble from "../utils/interfaces/LinkAble.ts";

const Profile = observer((email:string | boolean)=>{
    useEffect(()=>{
        API.getPrivateLinks(email['email'])
    },[])

    const [page,setPage]=useState(1)
    const handleChange = (event, value) => {
        setPage(value);
      };

    return <>
     <Paper sx={{maxWidth:420,m:"auto"}}>
        <Button onClick={(e)=>{document.cookie="token="}}>Выйти</Button>
     <Table>
     <TableHead>
         <TableRow>
             <TableCell>
                 <TableSortLabel>
                     Ссылки
                 </TableSortLabel>
             </TableCell>
         </TableRow>
     </TableHead>
     <TableRow sx={{display:"flex", flexDirection:"column"}}>
        {PrivateLinksStore.getLinks()!=undefined&&PrivateLinksStore.getLinks().map((item: LinkAble)=>{
            return <TableCell>
                <Link to={routes.host+routes.link.mean+"/"+item.link['link']}>{routes.host+routes.link.mean+"/"+item.link['link']}</Link>
            </TableCell>
        })}
     </TableRow>
         <Pagination sx={{my:"10px", display:"flex", justifyContent: "center"}} count={PrivateLinksStore.getLinks()!=undefined?Math.ceil(PrivateLinksStore.getLinks().length/15):1} page={page} onChange={handleChange} />
     
     </Table>    
 </Paper>
   </>
})
export default Profile