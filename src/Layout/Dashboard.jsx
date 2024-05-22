import { FaAd, FaCalendar, FaHome, FaShoppingCart } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";

export default function Dashboard() {
    return (
        <div className="flex">
            {/* Dashboard Sidebar */}
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className="menu p-4">
                    <li>
                        <NavLink to={"/dashboard/user-home"}><FaHome/> User Home</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/dashboard/service-appointment"}><FaCalendar/> My Service Appointment</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/dashboard/cart"}><FaShoppingCart/> My Cart</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/dashboard/review"}><FaAd/> My Review</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/dashboard/service-booking"}><FaShoppingCart/> My Service Booking</NavLink>
                    </li>
                </ul>
            </div>
            {/* Dashboard content */}
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
}
