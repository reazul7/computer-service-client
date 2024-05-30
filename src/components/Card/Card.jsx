import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";
import { GrCart } from "react-icons/gr";

export default function Card({ item }) {
    const { name, image, price, description, _id } = item;
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [, refetch] = useCart();

    const handleAddToCard = () => {
        if (user && user.email) {
            // send data to the database
            const cartItem = {
                serviceId: _id,
                email: user.email,
                name,
                image,
                price,
            };
            axiosSecure.post("/carts", cartItem).then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        icon: "success",
                        title: `${name} added to your cart`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    // refetch cart for update the cart items data
                    refetch();
                }
            });
        } else {
            Swal.fire({
                title: "You are not logged in",
                text: "Please login to add to the cart",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login!",
            }).then(result => {
                if (result.isConfirmed) {
                    navigate("/login", { state: { from: location } });
                }
            });
        }
    };
    return (
        <div>
            <div className="col flex flex-col h-full  bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
                <div className="bg-cover h-48" style={{ backgroundImage: `url(${image})` }}></div>
                <div className="flex-grow px-4 pt-4 text-center">
                    <h5 className="text-lg font-semibold mb-2">{name}</h5>
                    <p className="text-gray-700">{description}</p>
                </div>
                <div className="flex justify-center items-center p-4">
                    <p className="text-lg font-bold text-blue-500 pt-5 px-5">${price}</p>
                    <button onClick={handleAddToCard} className="flex btn btn-outline bg-slate-100 border-0 border-b-4 border-orange-400 mt-4">
                        <GrCart /> Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
