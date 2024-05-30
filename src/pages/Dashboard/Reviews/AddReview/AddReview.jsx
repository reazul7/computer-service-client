import { useContext, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../../providers/AuthProvider";

export default function AddReview() {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [rating, setRating] = useState(0);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async data => {
        const userReviewData = {
            name: user?.displayName,
            email: user?.email,
            review: data?.review,
            rating: rating,
            photoURL: user?.photoURL,
        };
        const reviewResponse = await axiosSecure.post("/reviews", userReviewData);
        console.log("reviewResponse", reviewResponse);
        if (reviewResponse.data.insertedId) {
            reset();
            Swal.fire({
                icon: "success",
                title: "Review added Successfully",
                showConfirmButton: false,
                timer: 1500,
            });
            navigate("/dashboard/reviews");
        } else {
            Swal.fire({
                icon: "error",
                title: "Something went wrong",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    return (
        <div>
            <SectionTitle heading={"Add Your Reviews"} subHeading={"Your Opinion"} />
            <div className="border border-rounded p-4">
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Name Area */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold text-lg">Name</span>
                        </label>
                        <input
                            type="text"
                            readOnly
                            name="name"
                            value={user?.displayName}
                            {...register("name", { required: true })}
                            className="input input-bordered"
                        />
                    </div>

                    {/* User Review Area */}
                    <div className="form-control pt-2">
                        <label className="label">
                            <span className="label-text font-semibold text-lg">Your Review</span>
                        </label>
                        <textarea
                            type="text"
                            {...register("review", { required: true })}
                            name="review"
                            placeholder="Write your review"
                            className="textarea textarea-bordered textarea-lg w-full"
                        />
                        {errors.review && <span className="text-red-500">Review is required*</span>}
                    </div>

                    <div className="flex pt-4">
                        <label className="label">
                            <span className="label-text font-semibold text-lg">Give Your Rating</span>
                        </label>
                        <div className="px-2">
                            <Rating style={{ maxWidth: 180 }} value={rating} onChange={setRating} />
                        </div>
                    </div>

                    {/* submit button */}
                    <div className="form-control mt-6">
                        {rating > 0 ? (
                            <input className="btn btn-primary" type="submit" value="Add Review" />
                        ) : (
                            <input className="btn btn-primary" disabled type="submit" value="Add Review" />
                        )}
                        <input type="button" onClick={() => reset()} value="Reset Field Values" className="btn btn-outline btn-xs mt-3 text-black" />
                    </div>
                </form>
            </div>
        </div>
    );
}
