import { Button, Pagination, Paper, Table, TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import API from "../utils/API.ts";
import { Link, useNavigate } from "react-router-dom";
import routes from "../utils/routes.ts";
import PrivateLinksStore from "../utils/stores/PrivateLinksStore.ts";

const Profile = observer(()=>{
    const [auth, setAuth]=useState(false)
    const [email, setEmail]=useState(null)
    const nav=useNavigate()
    useEffect(()=>{
        API.checkUser().then((e)=>{
            if(e){
                setAuth(true)
                setEmail(e)
                API.getPrivateLinks(e)
            }
            else{
                nav(routes.user.login)
            }
            }).catch(e=>{
                nav(routes.user.login)
            })
    },[])

    const [page,setPage]=useState(1)
    const handleChange = (event, value) => {
        API.getPrivateLinks(email);
        setPage(value);
      };

    return <>
    {auth&&
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
        {PrivateLinksStore.getLinks()!=undefined&&PrivateLinksStore.getLinks().map(item=>{
            return <TableCell>
                <Link to={routes.host+routes.link.mean+"/"+item.link.link}>{routes.host+routes.link.mean+"/"+item.link.link}</Link>
            </TableCell>
        })}
     </TableRow>
         <Pagination sx={{my:"10px", display:"flex", justifyContent: "center"}} count={PrivateLinksStore.getLinks()!=undefined?Math.ceil(PrivateLinksStore.getLinks().length/15):1} page={page} onChange={handleChange} />
     
     </Table>    
 </Paper>}
   </>
})
export default Profile