import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { AuthContext } from "../providers/AuthProvider";

export default function SignUp() {
    const [passwordShown, setPasswordShown] = useState(false);
    const { createUser } = useContext(AuthContext);
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
        console.log(data, "data-Sign Up");
        createUser(data.email, data.password).then(result => {
            const loggedUser = result.user;
            console.log(loggedUser, "loggedUser");
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
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name", { required: true })} name="name" placeholder="name" className="input input-bordered" />
                                {errors.name && <span className="text-red-500">Name is required*</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    {...register("email", { required: true })}
                                    name="email"
                                    placeholder="email"
                                    className="input input-bordered"
                                />
                                {errors.email && <span className="text-red-500">Email is required*</span>}
                            </div>

                            <div className="form-control relative">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <div className="relative flex items-center">
                                    <input
                                        type={passwordShown ? "text" : "password"}
                                        {...register("password", {
                                            required: true,
                                            pattern: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* )/,
                                        })}
                                        name="password"
                                        placeholder="password"
                                        className="input input-bordered w-full pr-10 flex-grow"
                                    />
                                    <i className="absolute right-4 hover:cursor-pointer hover:text-blue-500" onClick={togglePasswordVisibility}>
                                        {passwordShown ? <FaRegEyeSlash /> : <FaRegEye />}
                                    </i>
                                </div>
                                {errors.password?.type === "required" && <span className="text-red-500">Password is required*</span>}
                                {errors.password?.type === "pattern" && (
                                    <span className="text-red-500">
                                        Password must have one number, one lowercase, one uppercase, one special character, no space*
                                    </span>
                                )}
                            </div>

                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Sign Up" />
                                <input type="button" onClick={() => reset()} value="Reset Field Values" className="btn btn-outline btn-xs mt-2 text-black" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
