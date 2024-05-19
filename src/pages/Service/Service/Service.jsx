import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";
import useService from "../../../hooks/useService";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import ServiceCategory from "../ServiceCategory/ServiceCategory";

import menuImg from "../../../assets/menu/banner3.jpg";
import softwareInstallationImg from "../../../assets/menu/salad-bg.jpg";
import computerServiceImg from "../../../assets/menu/pizza-bg.jpg";
import laptopServiceImg from "../../../assets/menu/soup-bg.jpg";
import virusRemovalImg from "../../../assets/menu/dessert-bg.jpeg";

export default function Menu() {
    const [menu] = useService();

    const offered = menu?.filter(item => item?.category === "offered");
    const computerService = menu?.filter(item => item?.category === "computer service");
    const laptopService = menu?.filter(item => item?.category === "laptop service");
    const softwareInstallations = menu?.filter(item => item?.category === "software installations");
    const virusRemoval = menu?.filter(item => item?.category === "virus-removal");
    const dataRecovery = menu?.filter(item => item?.category === "data recovery");

    return (
        <div>
            <Helmet>
                <title>Menu | Computer Service</title>
            </Helmet>
            <Cover image={menuImg} title={"Our Menu"} />
            {/* Main cover */}
            <SectionTitle subHeading={"Don't Miss"} heading={"Today's Offer"} />

            <ServiceCategory items={offered} />
            <ServiceCategory items={computerService} title={"computer service"} link={"computer-service"} image={computerServiceImg} />
            <ServiceCategory items={softwareInstallations} title={"software installations"} link={"software-installations"} image={softwareInstallationImg} />
            <ServiceCategory items={dataRecovery} title={"data recovery"} link={"data-recovery"} image={softwareInstallationImg} />
            <ServiceCategory items={virusRemoval} title={"virus removal"} link={"virus-removal"} image={virusRemovalImg} />
            <ServiceCategory items={laptopService} title={"laptop service"} link={"laptop-service"} image={laptopServiceImg} />
        </div>
    );
}
