export default function ServiceItem({ item }) {
    const { name, image, price, description } = item;
    return (
        <div>
            <div className="col flex flex-col h-full  bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
                <div className="bg-cover h-48" style={{ backgroundImage: `url(${image})` }}></div>
                <div className="flex-grow px-4 pt-4 text-center">
                    <h5 className="text-lg font-semibold mb-2">{name}</h5>
                    <p className="text-gray-700">{description}</p>
                </div>
                <div className="flex justify-center p-4">
                    <p>BDT: <span className="text-lg font-bold text-blue-700">{price}</span></p>
                    {/* <p className="text-lg font-bold text-blue-500">BDT: {price}</p> */}
                    {/* <div className="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
                        <GrCart /> <button className="text-sm">Add to cart</button>
                    </div> */}
                </div>
            </div>
        </div>
    );
}
