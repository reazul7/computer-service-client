import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";

import menuImg from "../../../assets/menu/banner3.jpg";
export default function Menu() {
    return (
        <div>
            <Helmet>
                <title>Menu | Computer Service</title>
            </Helmet>
            <Cover image={menuImg} title={"Our Menu"} />
        </div>
    );
}
