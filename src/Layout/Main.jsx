import { Outlet } from "react-router-dom";
import Footer from "../pages/Home/Home/Shared/Footer/Footer";
import NavBar from "../pages/Home/Home/Shared/NavBar/NavBar";

export default function Main() {
    return (
        <div>
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    );
}
