import { createBrowserRouter } from "react-router";
import MainLayOut from "../layout/MainLayOut";
import Home from "../Home/Home";
import AllProducts from "../Pages/AllProducts";
import MyExports from "../Pages/MyExports";
import MyImports from "../Pages/MyImports";
import AddExports from "../Pages/AddExports";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import PrivateRouter from "./PrivateRouter";

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
                element:<AllProducts/>,
                loader:()=> fetch('http://localhost:3000/products')
            },
            {
                path:"/my-exports",
                element:(
                    <PrivateRouter>
                        <MyExports/>
                    </PrivateRouter>
                )
            },
           
            {
                path:"/my-imports",
                element:(
                    <PrivateRouter>
                        <MyImports/>
                    </PrivateRouter>
                )
            },
           
            {
                path:"/add-export",
                element:(
                    <PrivateRouter>
                        <AddExports/>
                    </PrivateRouter>
                )
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