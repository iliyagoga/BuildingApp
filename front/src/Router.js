import { Route, Routes } from "react-router-dom"
import routes from "./utils/routes.ts"
import Manager from "./pages/Manager.tsx"
import User from "./pages/User.tsx"
import Link from "./pages/Link.tsx"
import Register from "./pages/Register.tsx"
import Login from "./pages/Login.tsx"
import Profile from "./pages/Profile.tsx"
import { useEffect, useState } from "react"
import API from "./utils/API.ts"
const Router = ()=>{
    const [auth, setAuth]=useState(undefined)
    useEffect(()=>{
        API.checkUser().then((e)=>{setAuth(e)}).catch(e=>{setAuth(false)})
    },[])
    return <Routes>
        <Route 
            path={routes.manager.mean}
            element={<Manager></Manager>}
        >
        </Route>
        <Route
            path={routes.manager.mean+routes.manager.objects}
            element={<Manager mode="objects"></Manager>}
        >
        </Route>
        <Route
            path={routes.manager.mean+routes.manager.appls}
            element={<Manager mode="appls"></Manager>}
        >
        </Route>
        <Route
            path={routes.user.mean}
            element={<User auth={auth}></User>}
        >
        </Route>
        <Route
            path={routes.link.mean+"/:link"}
            element={<Link></Link>}
        >
        </Route>

        <Route
            path={routes.user.register}
            element={<Register></Register>}
        >
        </Route>

        <Route
            path={routes.user.login}
            element={<Login></Login>}
        >
        </Route>
        {(auth!=undefined && auth)&&
          <Route
          path={routes.user.applications}
          element={<Profile email={auth}></Profile>}
      >
      </Route>}
      

  
    </Routes>
}

export default Router