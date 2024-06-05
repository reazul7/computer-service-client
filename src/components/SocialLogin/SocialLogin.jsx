import { FaFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

export default function SocialLogin() {
    const { googleSignIn } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        googleSignIn().then(result => {
            const userInfo = {
                email: result.user?.email,
                name: result.user?.displayName,
                photo: result.user?.photoURL,
            };
            axiosPublic.post("/users", userInfo).then(res => {
                console.log(res.data);
                navigate("/");
            });
        });
    };
    return (
        <div className="flex flex-col items-center">
            <div className="divider">Or continue ith</div>
            <div className="flex space-x-2 w-full justify-center">
                <button onClick={handleGoogleSignIn} className="btn btn-sm flex items-center space-x-1 w-1/2">
                    <FcGoogle className="text-xl" />
                    <span>Google</span>
                </button>
                {/* <button className="btn btn-sm flex items-center space-x-1 w-1/2">
                    <FaFacebook className="text-xl" />
                    <span>Facebook</span>
                </button> */}
            </div>
        </div>
    );
}
