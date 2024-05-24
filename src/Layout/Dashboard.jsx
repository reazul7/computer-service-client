import { BsBagCheckFill } from "react-icons/bs";
import { FaAd, FaCalendar, FaHome, FaShoppingCart, FaList, FaUsers } from "react-icons/fa";
import { MdPermContactCalendar, MdManageAccounts } from "react-icons/md";
import { PiListPlusBold } from "react-icons/pi";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";

export default function Dashboard() {
    const [cart] = useCart();
    const [isAdmin] = useAdmin();
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
                                <NavLink to={"/dashboard/manage-service-booking"}>
                                    <MdManageAccounts /> Manage Service Booking
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
                                <NavLink to={"/dashboard/service-appointment"}>
                                    <FaCalendar /> My Service Appointment
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to={"/dashboard/cart"}>
                                    <FaShoppingCart /> My Cart ({cart?.length})
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
                        <NavLink to={"/"}>
                            <FaHome /> Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={"/order/computer-service"}>
                            <BsBagCheckFill /> Order Service
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={"/order/computer-service"}>
                            <MdPermContactCalendar /> Contact
                        </NavLink>
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
