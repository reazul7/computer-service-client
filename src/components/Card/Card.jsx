import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Card({ item }) {
    const { name, image, price, description } = item;
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleAddToCard = food => {
        if (user && user.email) {
            console.log("user", user);
            console.log("food", food);
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
                    navigate("/login");
                }
            });
        }
    };
    return (
        <div>
            <div className="card card-compact w-96 bg-base-100 shadow-xl">
                <figure>
                    <img src={image} alt={`${name} Image`} />
                </figure>
                <p className="absolute right-2 mr-4 mt-4 px-4 bg-slate-900 text-white">${price}</p>
                <div className="card-body text-center">
                    <h2 className="card-title mx-auto">{name}</h2>
                    <p>{description}</p>
                    <div className="card-actions justify-center">
                        <button onClick={() => handleAddToCard(item)} className="btn btn-outline bg-slate-100 border-0 border-b-4 border-orange-400 mt-4">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
