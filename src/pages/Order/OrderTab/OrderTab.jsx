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
                    <div className="grid md:grid-cols-3 gap-10">
                        {items?.map(item => (
                            <Card key={item?._id} item={item}></Card>
                        ))}
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
}
