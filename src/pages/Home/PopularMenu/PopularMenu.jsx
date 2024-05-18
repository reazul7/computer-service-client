import { useEffect } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useState } from "react";
import MenuItem from "../../Shared/MenuItem/MenuItem";

export default function PopularMenu() {
    const [menu, setMenu] = useState([]);
    useEffect(() => {
        fetch("menu.json")
            .then(res => res.json())
            .then(data => {
                const PopularItems = data.filter(item => item?.category === "popular");
                setMenu(PopularItems);
            });
    }, []);
    return (
        <section className="mb-12">
            <SectionTitle subHeading={"Popular Items"} heading={"From Our Menu"} />
            <div className="grid md:grid-cols-2 gap-10">
                {menu?.map(item => (
                    <MenuItem key={item?._id} item={item}></MenuItem>
                ))}
            </div>
            <div className="text-center pt-2">
                <button className="btn btn-outline border-0 border-b-4 mt-4">View Full Menu</button>
            </div>
        </section>
    );
}
