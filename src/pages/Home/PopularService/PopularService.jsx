import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import ServiceItem from "../../Shared/ServiceItem/ServiceItem";
import useService from "../../../hooks/useService";

export default function PopularService() {
    const [service] = useService();
    const popular = service?.filter(item => item?.category === "popular");
    return (
        <section className="mb-12">
            <SectionTitle subHeading={"Popular Items"} heading={"Our Popular Services"} />
            <div className="grid md:grid-cols-2 gap-10">
                {popular?.map(item => (
                    <ServiceItem key={item?._id} item={item}></ServiceItem>
                ))}
            </div>
            <div className="text-center pt-2">
                <button className="btn btn-outline border-0 border-b-4 mt-4">View Full Services</button>
            </div>
        </section>
    );
}
