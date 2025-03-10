import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

import img1 from "../../../assets/home/01.png";
import img2 from "../../../assets/home/02.png";
import img3 from "../../../assets/home/03.png";
import img4 from "../../../assets/home/04.png";

export default function Banner() {
    return (
        <div className="text-center">
            <Carousel autoPlay centerMode>
                <div>
                    <img src={img1} />
                    {/* <p className="legend">Legend 1</p> */}
                </div>
                <div>
                    <img src={img2} />
                </div>
                <div>
                    <img src={img3} />
                </div>
                <div>
                    <img src={img4} />
                </div>
            </Carousel>
        </div>
    );
}
