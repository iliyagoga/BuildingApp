import { Route, Routes } from "react-router-dom"
import routes from "./utils/routes.ts"
import Manager from "./pages/Manager.tsx"
import User from "./pages/User.tsx"
import Link from "./pages/Link.tsx"
import Register from "./pages/Register.tsx"
import Login from "./pages/Login.tsx"
import Profile from "./pages/Profile.tsx"
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