import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaQuoteLeft } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";
import "./Testimonials.css";
import { Navigation } from "swiper/modules";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

export default function Testimonials() {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: reviews = [] } = useQuery({
        queryKey: ["payments", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reviews/${user?.email}`);
            return res.data;
        },
    });

    return (
        <div>
            <SectionTitle subHeading={"What our Client Says"} heading={"Testimonials"} />
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                {reviews?.map(review => (
                    <SwiperSlide key={review?._id}>
                        <div className="flex flex-col items-center my-16 mx-24">
                            <Rating style={{ maxWidth: 180 }} value={review?.rating} readOnly />
                            <div>
                                <FaQuoteLeft className="w-20 h-20 text-black mt-5" />
                            </div>
                            <p className="py-8">{review?.review}</p>
                            <h3 className="text-2xl text-orange-400">{review?.name}</h3>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
