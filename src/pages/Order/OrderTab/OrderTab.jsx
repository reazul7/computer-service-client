import Card from "../../../components/Card/Card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./OrderTab.css";

export default function OrderTab({ items }) {
    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + "</span>";
        },
    };
    return (
        <div>
            <Swiper pagination={pagination} modules={[Pagination]} className="mySwiper">
                <SwiperSlide>
                    <section className="py-5 bg-gray-100">
                        <div className="grid grid-cols-1 gap-6 px-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {items?.map(item => (
                                <Card key={item?._id} item={item}></Card>
                            ))}
                        </div>
                    </section>
                </SwiperSlide>
            </Swiper>
        </div>
    );
}
