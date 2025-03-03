import { Route, Routes } from "react-router-dom"
import routes from "./utils/routes.ts"
import Manager from "./pages/Manager.jsx"
import User from "./pages/User.jsx"
import Link from "./pages/Link.jsx"
import Register from "./pages/Register.jsx"
import Login from "./pages/Login.jsx"
import Profile from "./pages/Profile.jsx"
const Router = ()=>{
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
            element={<User></User>}
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

        <Route
            path={routes.user.applications}
            element={<Profile></Profile>}
        >
        </Route>

  
    </Routes>
}

export default Router