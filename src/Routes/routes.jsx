import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Service from "../pages/Service/Service/Service";
import Order from "../pages/Order/Order/Order";
import Login from "../pages/Login/Login";
import SignUp from "../SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import Cart from "../pages/Dashboard/Cart/Cart";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AddItems from "../pages/Dashboard/AddItems/AddItems";
import AdminRoute from "./AdminRoute";
import ManageItems from "../pages/Dashboard/ManageItems/ManageItems";
import UpdateItem from "../pages/Dashboard/UpdateItem/UpdateItem";
import Payment from "../pages/Dashboard/Payment/Payment";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import UserHome from "../pages/Dashboard/UserHome/UserHome";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";
import NotFound from "../components/NotFound/NotFound";
import UserProfile from "../pages/Dashboard/UserProfile/UserProfile";
import AddReview from "../pages/Dashboard/Reviews/AddReview/AddReview";
import ShowReviews from "../pages/Dashboard/Reviews/AddReview/ShowReviews";

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
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "signup",
                element: <SignUp />,
            },
        ],
    },
    {
        path: "/dashboard",
        element: (
            <PrivateRoute>
                <Dashboard />
            </PrivateRoute>
        ),
        children: [
            // user routes
            {
                path: "cart",
                element: <Cart />,
            },
            {
                path: "payment",
                element: <Payment />,
            },
            {
                path: "payment-history",
                element: <PaymentHistory />,
            },
            {
                path: "user-home",
                element: <UserHome />,
            },
            {
                path: "add-review",
                element: <AddReview />,
            },
            {
                path: "reviews",
                element: <ShowReviews />,
            },
            {
                path: "profile",
                element: <UserProfile />,
            },
            // admin routes
            {
                path: "users",
                element: (
                    <AdminRoute>
                        <AllUsers />
                    </AdminRoute>
                ),
            },
            {
                path: "add-items",
                element: (
                    <AdminRoute>
                        <AddItems />
                    </AdminRoute>
                ),
            },
            {
                path: "update-items/:id",
                element: (
                    <AdminRoute>
                        <UpdateItem />
                    </AdminRoute>
                ),
                loader: ({ params }) => fetch(`http://localhost:5080/service/${params.id}`),
            },
            {
                path: "manage-items",
                element: (
                    <AdminRoute>
                        <ManageItems />
                    </AdminRoute>
                ),
            },
            {
                path: "admin-home",
                element: (
                    <AdminRoute>
                        <AdminHome />
                    </AdminRoute>
                ),
            },
        ],
    },
    {
        path: "/*",
        element: <NotFound />,
    },
]);
