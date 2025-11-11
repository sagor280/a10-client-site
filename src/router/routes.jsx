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
import ProductDetails from "../Pages/ProductDetails";

export const router = createBrowserRouter([
    {
        path:"/",
        element:<MainLayOut/>,
        children:[
            {
                path:"/",
                element:<Home/>,
                loader:()=>fetch('http://localhost:3000/latest-products')
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
                path:"/product-details/:id",
                element:(
                    <PrivateRouter>
                        <ProductDetails/>
                    </PrivateRouter>
                ),
                 loader:({params})=>fetch(`http://localhost:3000/products/${params.id}`)

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