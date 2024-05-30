import { useQuery } from "@tanstack/react-query";
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
    console.log("reviews", reviews);
    const totalRating = reviews.reduce((total, item) => total + item?.rating, 0);
    console.log("totalRating", totalRating);
    return (
        <div>
            <SectionTitle heading={"My Reviews"} subHeading={"Your Previous Opinion"} />
            <div className="flex justify-evenly bg-base-300 py-4">
                <h2 className="text-xl text-center">My Total Reviews: {reviews?.length}</h2>
                <h2 className="text-xl text-center">My Avg. Rating: {totalRating / reviews?.length}</h2>
            </div>

            {/* <div className="overflow-x-auto py-2">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Total Price</th>
                            <th>Transaction ID</th>
                            <th>Payment Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews?.map((payment, index) => (
                            <tr key={payment?._id}>
                                <td>{index + 1}</td>
                                <td>{payment?.name}</td>
                                <td>{payment?.email}</td>
                                <td>{payment?.price}</td>
                                <td>{payment?.transactionId}</td>
                                <td>{payment?.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div> */}

            <div className="bg-base-200 p-4">
                {reviews?.map((review, index) => (
                    <div className="py-2" key={index}>
                        <div className="card lg:card-side bg-base-100 shadow-xl ">
                            <div className="card-body">
                                <h2 className="card-title">{review?.name}</h2>
                                <div className="card-actions justify-start items-center">
                                    Rating: <button className="btn btn-success btn-sm text-xl">{review?.rating}</button>
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
