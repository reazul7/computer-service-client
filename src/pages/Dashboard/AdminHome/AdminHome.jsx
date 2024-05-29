import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaDollarSign, FaUser } from "react-icons/fa";
import { MdMiscellaneousServices } from "react-icons/md";
import { BiSolidFoodMenu } from "react-icons/bi";

export default function AdminHome() {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: stats } = useQuery({
        queryKey: ["admin-stats"],
        queryFn: async () => {
            const res = await axiosSecure.get("/admin-stats");
            return res.data;
        },
    });
    return (
        <div>
            <h2 className="text-3xl">
                Hi, Welcome <span>{user?.displayName ? user?.displayName : "Black"}</span>
            </h2>

            <div className="stats stats-vertical lg:stats-horizontal shadow my-2">
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaDollarSign className="text-3xl" />
                    </div>
                    <div className="stat-title">Revenue</div>
                    <div className="stat-value">$ {stats?.revenue}</div>
                    {/* <div className="stat-desc">Jan 1st - Feb 1st</div> */}
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaUser className="text-3xl" />
                    </div>
                    <div className="stat-title">Users</div>
                    <div className="stat-value">{stats?.users}</div>
                    {/* <div className="stat-desc">↗︎ 400 (22%)</div> */}
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <MdMiscellaneousServices className="text-4xl" />
                    </div>
                    <div className="stat-title">Service Items</div>
                    <div className="stat-value">{stats?.serviceItems}</div>
                    {/* <div className="stat-desc">↗︎ 400 (22%)</div> */}
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <BiSolidFoodMenu className="text-3xl" />
                    </div>
                    <div className="stat-title">Orders</div>
                    <div className="stat-value">{stats?.orders}</div>
                    {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
                </div>
            </div>
        </div>
    );
}
