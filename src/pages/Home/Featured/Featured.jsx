import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import featuredImage from "../../../assets/service/desktop-repair.jpg";
import "./Featured.css";

export default function Featured() {
    return (
        <div className="featured-items bg-fixed text-white pt-8 my-20">
            <SectionTitle subHeading={"Check it out"} heading={"Featured Service"} />
            <div className="md:flex justify-center items-center bg-slate-500 bg-opacity-40 pb-20 pt-12 px-36">
                <div>
                    <img src={featuredImage} alt="" />
                </div>
                <div className="md:ml-10">
                    <p>Aug 20, 2029</p>
                    <p className="uppercase">How can I get Premium Service?</p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur aut temporibus deleniti iusto facilis deserunt laudantium ea nobis
                        assumenda vitae.
                    </p>
                    <button className="btn btn-outline border-0 border-b-4 mt-4">Order Now</button>
                </div>
            </div>
        </div>
    );
}
