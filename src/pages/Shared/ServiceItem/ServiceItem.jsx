/* eslint-disable react/prop-types */

export default function ServiceItem({ item }) {
    const { name, image, price, description } = item;
    return (
        <div className="flex space-x-2">
            <img style={{ borderRadius: "0 200px 200px 200px" }} className="w-[120px]" src={image} alt="" />
            <div>
                <h3 className="uppercase">{name}</h3>
                <p>{description}</p>
            </div>
            <p className="text-yellow-500">{price}</p>
        </div>
    );
}
