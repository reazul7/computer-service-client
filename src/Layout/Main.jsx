import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../pages/Shared/NavBar/NavBar";
import Footer from "../pages/Shared/Footer/Footer";
import { Helmet } from "react-helmet-async";

export default function Main() {
    const location = useLocation();
    const noHeaderFooter = location?.pathname?.includes("login");
    console.log(location, "location");
    return (
        <div>
            <Helmet>
                <title>Home | Computer Service</title>
            </Helmet>
            {noHeaderFooter || <NavBar />}
            <Outlet />
            {noHeaderFooter || <Footer />}
        </div>
    );
}
