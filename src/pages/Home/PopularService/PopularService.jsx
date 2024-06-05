import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import ServiceItem from "../../Shared/ServiceItem/ServiceItem";
import useService from "../../../hooks/useService";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function PopularService() {
    const [service] = useService();
    const [randomData, setRandomData] = useState([]);
    // const popular = service?.filter(item => item?.category === "popular");

    useEffect(() => {
        if (service.length > 0) {
            const shuffledService = [...service].sort(() => 0.5 - Math.random());
            const selectedData = shuffledService.slice(0, 4);
            setRandomData(selectedData);
        }
    }, [service]);
    
    return (
        <section className="mb-12">
            <SectionTitle subHeading={"Popular Items"} heading={"Our Popular Services"} />

            <section className="py-5 bg-gray-100">
                <div className="grid grid-cols-1 gap-6 px-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {randomData?.map(item => (
                        <ServiceItem key={item?._id} item={item}></ServiceItem>
                    ))}
                </div>
            </section>

            <div className="text-center pt-2">
                <Link to={"/service"}>
                    <button className="btn btn-outline border-0 border-b-4 mt-4">View Full Services</button>
                </Link>
            </div>
        </section>
    );
}
