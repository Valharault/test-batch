import React from 'react'
import ReactDOM from 'react-dom/client'
import Auth from './auth/Auth'
import './assets/tailkit.css'
import '@tremor/react/dist/esm/tremor.css';
import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import ErrorPage from "./errorPage/NotFound";
import Dashboard from "./customer/page/Dashboard";
import Sale from "./customer/page/Sale";

const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <ErrorPage/>,
        element: <Dashboard/>
    },
    {
        path: "/dashboard",
        errorElement: <ErrorPage/>,
        element: <Dashboard/>
    },
    {
        path: "/mes-ventes",
        errorElement: <ErrorPage/>,
        element: <Sale/>
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
      <ToastContainer />
  </React.StrictMode>
)
