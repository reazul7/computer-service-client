import { Outlet } from "react-router-dom";
import NavBar from "../pages/Shared/NavBar/NavBar";
import Footer from "../pages/Shared/Footer/Footer";
import { Helmet } from "react-helmet-async";

export default function Main() {
    return (
        <div>
            <Helmet>
                <title>Home | Computer Service</title>
            </Helmet>
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    );
}
