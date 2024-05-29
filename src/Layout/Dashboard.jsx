import { BsBagCheckFill } from "react-icons/bs";
import { FaAd, FaCalendar, FaHome, FaShoppingCart, FaList, FaUsers } from "react-icons/fa";
import { PiListPlusBold } from "react-icons/pi";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { IoLogOutSharp } from "react-icons/io5";

export default function Dashboard() {
    const [cart] = useCart();
    const [isAdmin] = useAdmin();
    const { logOut } = useContext(AuthContext);
    const handleLogout = () => {
        logOut()
            .then(() => {})
            .catch(error => console.log("error", error));
    };

    return (
        <div className="flex">
            {/* Dashboard Sidebar */}
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className="menu p-4">
                    {isAdmin ? (
                        <>
                            <li>
                                <NavLink to={"/dashboard/admin-home"}>
                                    <FaHome /> Admin Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={"/dashboard/add-items"}>
                                    <PiListPlusBold /> Add Items
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={"/dashboard/manage-items"}>
                                    <FaList /> Manage Items
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={"/dashboard/users"}>
                                    <FaUsers /> All Users
                                </NavLink>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <NavLink to={"/dashboard/user-home"}>
                                    <FaHome /> User Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={"/dashboard/review"}>
                                    <FaAd /> My Review
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={"/dashboard/service-booking"}>
                                    <FaShoppingCart /> My Service Booking
                                </NavLink>
                            </li>
                        </>
                    )}
                    <div className="divider"></div>
                    <li>
                        <NavLink to={"/dashboard/cart"}>
                            <FaShoppingCart /> My Cart ({cart?.length})
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={"/dashboard/payment-history"}>
                            <FaCalendar /> My Payment History
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={"/order/computer-service"}>
                            <BsBagCheckFill /> Order Service
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={"/"}>
                            <FaHome /> Home
                        </NavLink>
                    </li>
                    <li className="pl-1">
                        <button onClick={handleLogout} className="px-3">
                            <IoLogOutSharp className="text-xl" /> Log Out
                        </button>
                    </li>
                </ul>
            </div>
            {/* Dashboard content */}
            <div className="flex-1 p-5">
                <Outlet></Outlet>
            </div>
        </div>
    );
}
