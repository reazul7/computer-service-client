import { Link } from "react-router-dom";
import Cover from "../../Shared/Cover/Cover";
import ServiceItem from "../../Shared/ServiceItem/ServiceItem";

export default function ServiceCategory({ items, title, image }) {
    return (
        <div className="pb-8">
            {title && <Cover image={image} title={title} />}
            <div className="grid md:grid-cols-2 gap-10 mt-16">
                {items?.map(item => (
                    <ServiceItem key={item?._id} item={item}></ServiceItem>
                ))}
            </div>
            <Link to={`/order/${title}`}>
                <button className="btn btn-outline border-0 border-b-4 mt-4">Order Now</button>
            </Link>
        </div>
    );
}
