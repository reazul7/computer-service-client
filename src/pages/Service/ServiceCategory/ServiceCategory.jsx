import { Link } from "react-router-dom";
import Cover from "../../Shared/Cover/Cover";
import ServiceItem from "../../Shared/ServiceItem/ServiceItem";

export default function ServiceCategory({ items, title, link, image }) {
    return (
        <div className="pb-8">
            {title && <Cover image={image} title={title} />}

            <section className="py-5 bg-gray-100">
                <div className="grid grid-cols-1 gap-6 px-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {items?.map(item => (
                        <ServiceItem key={item?._id} item={item}></ServiceItem>
                    ))}
                </div>
            </section>

            <div className="text-center">
                <Link to={`/order/${link}`}>
                    <button className="btn btn-outline border-0 border-b-4 mt-4">Order Now</button>
                </Link>
            </div>
        </div>
    );
}
