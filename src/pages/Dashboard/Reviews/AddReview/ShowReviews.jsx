import { useQuery } from "@tanstack/react-query";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";

export default function ShowReviews() {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: reviews = [] } = useQuery({
        queryKey: ["reviews", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reviews/${user?.email}`);
            return res.data;
        },
    });
    const totalRating = reviews.reduce((total, item) => total + item?.rating, 0);
    return (
        <div>
            <SectionTitle heading={"My Reviews"} subHeading={"Your Previous Opinion"} />
            <div className="flex justify-evenly bg-base-300 py-4">
                <h2 className="text-xl text-center border flex items-center">My Total Reviews: {reviews?.length}</h2>
                <h2 className="text-xl text-center flex items-center border">
                    <span className="px-2">My Avg. Rating:</span>
                    {reviews?.length > 0 ? (
                        <Rating style={{ maxWidth: 150 }} value={totalRating / reviews?.length} readOnly />
                    ) : (
                        <Rating style={{ maxWidth: 150 }} value={0} readOnly />
                    )}
                </h2>
            </div>

            <div className="bg-base-200 p-4">
                {reviews?.map((review, index) => (
                    <div className="py-2" key={index}>
                        {console.log(review, "review")}
                        <div className="card lg:card-side bg-base-100 shadow-xl ">
                            <div className="card-body">
                                <h2 className="card-title">{review?.name}</h2>
                                <div className="card-actions justify-start items-center">
                                    <span className="font-bold">Rating:</span> <Rating style={{ maxWidth: 150 }} value={review?.rating} readOnly />
                                </div>
                                <p>{review?.review}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
