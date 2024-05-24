import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";

export default function AllUsers() {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users", {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("access-token")}`,
                },
            });
            return res.data;
        },
    });

    const handleMakeAdmin = user => {
        // /users/admin/:id
        axiosSecure.patch(`/users/admin/${user._id}`).then(res => {
            if (res.data.modifiedCount > 0) {
                refetch();
                Swal.fire({
                    icon: "success",
                    title: `${user.name} is now an admin`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        });
    };

    const handleDeleteUser = user => {
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
                axiosSecure.delete(`/users/${user._id}`).then(res => {
                    console.log("delete", res.data);
                    if (res.data.deletedCount > 0) {
                        refetch();
                        Swal.fire({
                            icon: "success",
                            title: "User deleted successfully",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    }
                });
            }
        });
    };

    return (
        <div className="py-5">
            <div className="flex justify-evenly">
                <h2 className="text-4xl">All Users: </h2>
                <h2 className="text-4xl">Total Users: {users?.length}</h2>
            </div>
            <div className="overflow-x-auto mt-5">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user, index) => (
                            <tr key={user?._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={user?.photo} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{user?.name}</td>
                                <td>{user?.email}</td>
                                <td>
                                    {user?.role === "admin" ? (
                                        "Admin"
                                    ) : (
                                        <button onClick={() => handleMakeAdmin(user)} className="btn bg-orange-500 btn-md">
                                            <FaUsers className="text-white text-2xl" />{" "}
                                        </button>
                                    )}
                                </td>
                                <td>
                                    <button onClick={() => handleDeleteUser(user)} className="btn btn-ghost btn-md">
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
