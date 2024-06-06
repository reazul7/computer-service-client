import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";
import useService from "../../../hooks/useService";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import ServiceCategory from "../ServiceCategory/ServiceCategory";

import serviceImg from "../../../assets/service/our_services.jpg";
import softwareInstallationImg from "../../../assets/service/data_recovery.jpg";
import computerServiceImg from "../../../assets/service/desktop-repair.jpg";
import laptopServiceImg from "../../../assets/service/laptop_repair.jpg";
import virusRemovalImg from "../../../assets/service/virus_removal.jpg";

export default function Service() {
    const [service] = useService();

    const offered = service?.filter(item => item?.category === "offered");
    const computerService = service?.filter(item => item?.category === "computer service");
    const laptopService = service?.filter(item => item?.category === "laptop service");
    const softwareInstallations = service?.filter(item => item?.category === "software installations");
    const virusRemoval = service?.filter(item => item?.category === "virus removal");
    const dataRecovery = service?.filter(item => item?.category === "data recovery");

    return (
        <div>
            <Helmet>
                <title>Service | Computer Service</title>
            </Helmet>
            <Cover image={serviceImg} title={"Our Service"} />
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
