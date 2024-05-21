import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import Featured from "../Featured/Featured";
import PopularService from "../PopularService/PopularService";
import Testimonials from "../Testimonials/Testimonials";

export default function Home() {
    return (
        <div>
            <Helmet>
                <title>Computer Service</title>
            </Helmet>
            <Banner />
            <Category />
            <PopularService />
            <Featured />
            <Testimonials />
        </div>
    );
}
