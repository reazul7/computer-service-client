import { FaEdit, FaTrashAlt } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useService from "../../../hooks/useService";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

export default function ManageItems() {
    const [service, , refetch] = useService();
    const axiosSecure = useAxiosSecure();

    const handleDeleteItem = item => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(result => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/service/${item?._id}`).then(res => {
                    if (res.data.deletedCount > 0) {
                        refetch();
                        Swal.fire({
                            icon: "success",
                            title: `${item?.name} has been deleted`,
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    }
                });
            }
        });
    };
    return (
        <div>
            <SectionTitle heading={"Manage All Items"} subHeading={"Hurry Up"} />
            <div className="overflow-x-auto mt-5">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Item Image</th>
                            <th>Item Name</th>
                            <th>Price</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {service?.map((item, index) => (
                            <tr key={item?._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item?.image} alt={`${item?.name} Image`} />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{item?.name}</td>
                                <td>{item?.price}</td>
                                <td>
                                    <Link to={`/dashboard/update-items/${item?._id}`}>
                                        <button className="btn btn-ghost bg-orange-500 btn-md">
                                            <FaEdit className="text-white text-2xl" />{" "}
                                        </button>
                                    </Link>
                                </td>
                                <td>
                                    <button onClick={() => handleDeleteItem(item)} className="btn btn-ghost btn-md">
                                        <FaTrashAlt className="text-red-600 text-2xl" />{" "}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
