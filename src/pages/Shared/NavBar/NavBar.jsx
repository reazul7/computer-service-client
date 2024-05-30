import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import useCart from "../../../hooks/useCart";
import useAdmin from "../../../hooks/useAdmin";
import logo from "../../../assets/logo-com-service.svg";

export default function NavBar() {
    const { user, logOut } = useContext(AuthContext);
    const [cart] = useCart();
    const [isAdmin] = useAdmin();
    const totalPrice = cart?.reduce((total, item) => total + item?.price, 0);

    const handleLogout = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log("error", error));
    };
    const navOptions = (
        <>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/service">Services</Link>
            </li>
            <li>
                <Link to="/order/computer-service">Order</Link>
            </li>
            {user && isAdmin && (
                <li>
                    <Link to="/dashboard/admin-home">Dashboard</Link>
                </li>
            )}
            {user && !isAdmin && (
                <li>
                    <Link to="/dashboard/user-home">Dashboard</Link>
                </li>
            )}
        </>
    );

    return (
        <>
            <div className="navbar fixed z-10 bg-opacity-30 bg-black text-white max-w-screen-xl">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-content text-white rounded-box w-52">
                            {navOptions}
                        </ul>
                    </div>
                    <div className="px-4">
                        <Link to={"/"} className="text-xl">
                            <img src={logo} className="w-12" alt="" />
                        </Link>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">{navOptions}</ul>
                </div>

                <div className="flex-none gap-5">
                    {/* View Cart Area */}
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle btn-outline">
                            <div className="indicator">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                                <span className="badge badge-sm indicator-item">{cart?.length}</span>
                            </div>
                        </div>
                        <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-content text-white shadow">
                            <div className="card-body">
                                <span className="font-bold text-lg">{cart?.length} Items</span>
                                <span className="text-info">Subtotal: ${totalPrice}</span>
                                <Link to="/dashboard/cart">
                                    <div className="card-actions">
                                        <button className="btn btn-primary btn-block">
                                            View cart
                                        </button>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* User View Area */}
                    {user ? (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img alt={user?.displayName} src={user?.photoURL} />
                                </div>
                            </div>
                            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-content text-white rounded-box w-52">
                                <li>
                                    <Link to="/user/profile">Profile</Link>
                                </li>
                                <li>
                                    <button onClick={handleLogout} className="px-3">
                                        Log Out
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <>
                            <Link to="/login">Login</Link>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
