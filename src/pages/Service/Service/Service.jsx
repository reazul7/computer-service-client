import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";
import useService from "../../../hooks/useService";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import ServiceCategory from "../ServiceCategory/ServiceCategory";

import menuImg from "../../../assets/menu/banner3.jpg";
import saladImg from "../../../assets/menu/salad-bg.jpg";
import pizzaImg from "../../../assets/menu/pizza-bg.jpg";
import soupImg from "../../../assets/menu/soup-bg.jpg";
import dessertImg from "../../../assets/menu/dessert-bg.jpeg";

export default function Menu() {
    const [menu] = useService();
    const salad = menu?.filter(item => item?.category === "salad");
    const dessert = menu?.filter(item => item?.category === "dessert");
    const pizza = menu?.filter(item => item?.category === "pizza");
    const soup = menu?.filter(item => item?.category === "soup");
    const offered = menu?.filter(item => item?.category === "offered");
    return (
        <div>
            <Helmet>
                <title>Menu | Computer Service</title>
            </Helmet>
            <Cover image={menuImg} title={"Our Menu"} />
            {/* Main cover */}
            <SectionTitle subHeading={"Don't Miss"} heading={"Today's Offer"} />

            <ServiceCategory items={offered} />
            <ServiceCategory items={dessert} title={"dessert"} image={dessertImg} />
            <ServiceCategory items={pizza} title={"pizza"} image={pizzaImg} />
            <ServiceCategory items={salad} title={"salad"} image={saladImg} />
            <ServiceCategory items={soup} title={"soup"} image={soupImg} />
        </div>
    );
}
