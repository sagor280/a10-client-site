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
import UpdateProducts from "../Pages/UpdateProducts";
import About from "../Pages/About";
import Contact from "../Pages/Contact";
import DashboardLayout from "../layout/DashboardLayout";
import DashboardHome from "../Pages/Dashboard/DashboardHome";
import Profile from "../Pages/Dashboard/Profile";
import Errorpage from "../Pages/Errorpage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayOut />,
    errorElement: <Errorpage />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: () => fetch("https://import-export-server-blue.vercel.app/latest-products"),
      },
      {
        path: "all-products",
        element: <AllProducts />,
        loader: () => fetch("https://import-export-server-blue.vercel.app/products"),
      },
      {
        path: "about",
        element: <About />
      },
      {
        path: "contact",
        element: <Contact />
      },
      {
        path: "product-details/:id",
        element: (
          <PrivateRouter>
            <ProductDetails />
          </PrivateRouter>
        ),
        loader: ({ params }) =>
          fetch(`https://import-export-server-blue.vercel.app/products/${params.id}`),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRouter>
        <DashboardLayout />
      </PrivateRouter>
    ),
    children: [
      {
        index: true, 
        element: <DashboardHome />, 
      },
      {
        path: "my-exports", 
        element: <MyExports />,
      },
      {
        path: "my-imports", 
        element: <MyImports />,
      },
      {
        path: "add-export", 
        element: <AddExports />,
      },
      {
        path: "update-products/:id", 
        element: <UpdateProducts />,
        loader: ({ params }) =>
          fetch(`https://import-export-server-blue.vercel.app/products/${params.id}`),
      },
      {
        path:"profile",
        element:<Profile/>
      }
    ],
  },
]);