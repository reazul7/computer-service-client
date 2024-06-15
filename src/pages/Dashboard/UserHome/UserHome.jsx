import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../../../providers/AuthProvider";

export default function UserHome() {
    const { user } = useContext(AuthContext);
    const userProfilesData = [
        { name: "Email", value: `${user?.email}` },
        { name: "Email Verified", value: `${user?.emailVerified === false ? "No" : "Yes"}` },
        { name: "Phone Number", value: `${user?.phoneNumber === null ? "Not Added" : "Not Added"}` },
    ];
    return (
        <div>
            <Helmet>
                <title>Profile | Computer Service</title>
            </Helmet>
            <div>
                <div className="hero min-h-screen bg-base-200">
                    <div className="hero-content text-center">
                        <div className="max-w-md">
                            <div className="avatar online">
                                <div className="w-32 rounded-full">
                                    <img src={user?.photoURL} alt={user?.displayName} />
                                </div>
                            </div>

                            <h1 className="text-5xl font-bold">{user?.displayName}</h1>
                            <div className="overflow-x-auto py-5">
                                <table className="table">
                                    <tbody>
                                        {userProfilesData?.map((userProfileData, index) => (
                                            <tr key={index}>
                                                <th className="p-1">{userProfileData?.name}</th>
                                                <td className="p-1">:</td>
                                                <td className="p-1 px-2">{userProfileData?.value}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
