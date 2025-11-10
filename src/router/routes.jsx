import { createBrowserRouter } from "react-router";
import MainLayOut from "../layout/MainLayOut";
import Home from "../Home/Home";
import AllProducts from "../Pages/AllProducts";
import MyExports from "../Pages/MyExports";
import MyImports from "../Pages/MyImports";
import AddExports from "../Pages/AddExports";
import Login from "../Pages/Login";
import Register from "../Pages/Register";

export const router = createBrowserRouter([
    {
        path:"/",
        element:<MainLayOut/>,
        children:[
            {
                path:"/",
                element:<Home/>
            },
            {
                path:"/all-products",
                element:<AllProducts/>
            },
            {
                path:"/my-exports",
                element:<MyExports/>
            },
           
            {
                path:"/my-imports",
                element:<MyImports/>
            },
           
            {
                path:"/add-export",
                element:<AddExports/>
            },
            {
                path:"/login",
                element:<Login/>
            },
            {
                path:"/register",
                element:<Register/>
            },
           
        ]
    }
])