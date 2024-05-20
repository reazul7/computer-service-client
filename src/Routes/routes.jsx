import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Service from "../pages/Service/Service/Service";
import Order from "../pages/Order/Order/Order";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "service",
                element: <Service />,
            },
            {
                path: "order/:category",
                element: <Order />,
            },
        ],
    },
]);
