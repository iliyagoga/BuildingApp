import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import API from "../utils/API.ts";
import Objects from "../components/Objects.jsx";
const Manager=observer(()=>{
    useEffect(()=>{
        API.getObjects().then(r=>{
            console.log(r.data)
        })
    
    },[])
    return <Objects></Objects>
})

export default Manager