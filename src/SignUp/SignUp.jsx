import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { AuthContext } from "../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/useAxiosPublic";
import SocialLogin from "../components/SocialLogin/SocialLogin";

export default function SignUp() {
    const axiosPublic = useAxiosPublic();
    const [passwordShown, setPasswordShown] = useState(false);
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = data => {
        console.log("data-Sign Up", data);
        createUser(data.email, data.password).then(result => {
            const loggedUser = result.user;
            console.log("loggedUser", loggedUser);
            updateUserProfile(data.name, data.photoURL)
                .then(() => {
                    // create user entry in the database
                    const userInfo = {
                        name: data.name,
                        email: data.email,
                        photoURL: data.photoURL,
                    };
                    axiosPublic.post("/users", userInfo).then(res => {
                        if (res.data.insertedId) {
                            console.log("User Profile Added to database Successfully");
                            reset();
                            Swal.fire({
                                icon: "success",
                                title: "User Profile Added Successfully",
                                showConfirmButton: false,
                                timer: 1500,
                            });
                            navigate("/");
                        }
                    });
                })
                .catch(errors => console.log("update user profile error", errors));
        });
    };

    return (
        <>
            <Helmet>
                <title>Sign Up | Computer Service</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200 px-5">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Sign up now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae
                            et a id nisi.
                        </p>
                    </div>

                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        {/* SignUp Form Area */}
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            {/* Name Area */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name", { required: true })} name="name" placeholder="Name" className="input input-bordered" />
                                {errors.name && <span className="text-red-500">Name is required*</span>}
                            </div>
                            {/* Photo Area */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input type="text" {...register("photoURL", { required: true })} placeholder="Photo URL" className="input input-bordered" />
                                {errors.name && <span className="text-red-500">Photo URL is required*</span>}
                            </div>
                            {/* Email Area */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    {...register("email", { required: true })}
                                    name="email"
                                    placeholder="Email"
                                    className="input input-bordered"
                                />
                                {errors.email && <span className="text-red-500">Email is required*</span>}
                            </div>

                            {/* Password with ShowPassword Area */}
                            <div className="form-control relative">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <div className="relative flex items-center">
                                    <input
                                        type={passwordShown ? "text" : "password"}
                                        {...register("password", {
                                            required: true,
                                            minLength: 6,
                                            pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* )/,
                                        })}
                                        name="password"
                                        placeholder="Password"
                                        className="input input-bordered w-full pr-10 flex-grow"
                                    />
                                    <i className="absolute right-4 hover:cursor-pointer hover:text-blue-500" onClick={togglePasswordVisibility}>
                                        {passwordShown ? <FaRegEyeSlash /> : <FaRegEye />}
                                    </i>
                                </div>
                                {errors.password?.type === "required" && <span className="text-red-500">Password is required*</span>}
                                {errors.password?.type === "pattern" && (
                                    <span className="text-red-500">
                                        Password must have one number, one lowercase, one uppercase, one special character, no space and minimum 6 digit
                                        character.*
                                    </span>
                                )}
                            </div>

                            {/* Submit SignUp Button Area */}
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Sign Up" />
                                <input type="button" onClick={() => reset()} value="Reset Field Values" className="btn btn-outline btn-xs mt-3 text-black" />
                            </div>

                            <SocialLogin />
                            <p className="text-center">
                                <small>
                                    Already have an account?{" "}
                                    <Link className="underline text-blue-600" to={"/login"}>
                                        Login.
                                    </Link>
                                </small>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
