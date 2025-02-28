import { Route, Routes } from "react-router-dom"
import routes from "./utils/routes.ts"
import Manager from "./pages/Manager.jsx"
const Router = ()=>{
    return <Routes>
        <Route 
            path={routes.manager.mean}
            element={<Manager></Manager>}
        >
            <Route
                path={routes.manager.objects}
                element={<Manager></Manager>}
            >
            </Route>
            <Route
                path={routes.manager.appls}
                element={<Manager></Manager>}
            >
            </Route>
        </Route>

    </Routes>
}

export default Router