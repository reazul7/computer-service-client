import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from "react-simple-captcha";
import { AuthContext } from "../../providers/AuthProvider";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

export default function Login() {
    const [loginDisabled, setLoginDisabled] = useState(true);
    const { signIn } = useContext(AuthContext);
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, []);
    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signIn(email, password).then(result => {
            const user = result.user;
            console.log("user", user);
            Swal.fire({
                title: "User Login Successfully",
                showClass: {
                    popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster
                  `,
                },
                hideClass: {
                    popup: `
                    animate__animated
                    animate__fadeOutDown
                    animate__faster
                  `,
                },
            });
        });
    };

    const handleValidateCaptcha = event => {
        const user_captcha_value = event.target.value;
        if (validateCaptcha(user_captcha_value) === true) {
            setLoginDisabled(false);
        } else {
            setLoginDisabled(true);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Captcha Does Not Match..!",
            });
        }
    };
    return (
        <>
            <Helmet>
                <title>Login | Computer Service</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200 px-5">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae
                            et a id nisi.
                        </p>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control relative">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <div className="relative flex items-center">
                                    <input
                                        type={passwordShown ? "text" : "password"}
                                        name="password"
                                        placeholder="password"
                                        className="input input-bordered w-full pr-10 flex-grow"
                                        required
                                    />
                                    <i className="absolute right-4 hover:cursor-pointer hover:text-blue-500" onClick={togglePasswordVisibility}>
                                        {passwordShown ? <FaRegEyeSlash /> : <FaRegEye />}
                                    </i>
                                </div>

                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">
                                        Forgot password?
                                    </a>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate />
                                </label>
                                <input
                                    onBlur={handleValidateCaptcha}
                                    type="name"
                                    name="captcha"
                                    placeholder="Type the captcha above"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control mt-6">
                                <input disabled={loginDisabled} className="btn btn-primary" type="submit" value="Login" />
                            </div>
                            <p className="text-center">
                                <small>
                                    New Here?{" "}
                                    <Link className="underline text-blue-600" to={"/signup"}>
                                        Create an Account.
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
