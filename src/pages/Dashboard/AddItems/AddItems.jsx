import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const imageHostingKey = import.meta.env.VITE_image_hosting_apiKey;
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

export default function AddItems() {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async data => {
        const imageFile = { image: data?.image[0] };
        const res = await axiosPublic.post(imageHostingApi, imageFile, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        if (res.data.success) {
            const serviceItem = {
                name: data?.name,
                category: data?.category,
                price: parseFloat(data?.price),
                description: data?.description,
                image: res.data?.data?.display_url,
            };
            const serviceResponse = await axiosSecure.post("/service", serviceItem);
            if (serviceResponse.data.insertedId) {
                reset();
                Swal.fire({
                    icon: "success",
                    title: `${data?.name} added Successfully`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Something went wrong",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        }
    };

    return (
        <div>
            <SectionTitle heading={"Add an Item"} subHeading={"What's New"} />
            <div className="border border-rounded p-4">
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Service Name Area */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold text-lg">Service Name</span>
                        </label>
                        <input type="text" {...register("name", { required: true })} name="name" placeholder="Service Name" className="input input-bordered" />
                        {errors.name && <span className="text-red-500">Service Name is required*</span>}
                    </div>

                    <div className=" md:flex">
                        {/* Service Category Area */}
                        <div className="form-control md:w-1/2 mr-1">
                            <label className="label">
                                <span className="label-text font-semibold text-lg">Service Category</span>
                            </label>
                            <select className="select select-bordered w-full" {...register("category", { required: "Category is required" })}>
                                <option value="">Select a Category</option>
                                <option value="computer service">Computer Service</option>
                                <option value="laptop service">Laptop Service</option>
                                <option value="software installations">Software Installations</option>
                                <option value="virus removal">Virus Removal</option>
                                <option value="data recovery">Data Recovery</option>
                            </select>
                            {errors.category && <span className="text-red-500">Category is required*</span>}
                        </div>

                        {/* Service Price Area */}
                        <div className="form-control md:w-1/2 ml-1">
                            <label className="label">
                                <span className="label-text font-semibold text-lg">Service Price</span>
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                {...register("price", {
                                    required: "Service Price is required",
                                    valueAsNumber: true,
                                    validate: value => !isNaN(value) || "Price must be a valid number",
                                })}
                                name="price"
                                placeholder="Service Price"
                                className="input input-bordered"
                            />
                            {errors.price && <span className="text-red-500">Service Price is required*</span>}
                        </div>
                    </div>

                    {/* Service Description Area */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold text-lg">Service Description</span>
                        </label>
                        <textarea
                            type="text"
                            {...register("description", { required: true })}
                            name="description"
                            placeholder="Service Description"
                            className="textarea textarea-bordered textarea-lg w-full"
                        />
                        {errors.description && <span className="text-red-500">Service Description is required*</span>}
                    </div>

                    {/* Service File Input */}
                    <div className="from-control">
                        <label className="label">
                            <span className="label-text font-semibold text-lg">Service Image</span>
                        </label>
                        <input {...register("image", { required: true })} type="file" className="file-input file-input-bordered w-full max-w-xs" />
                        <br />
                        {errors.image && <span className="text-red-500">Service Image is required*</span>}
                    </div>

                    {/* Submit SignUp Button Area */}
                    <div className="form-control mt-6">
                        <input className="btn btn-primary" type="submit" value="Add Item" />
                        <input type="button" onClick={() => reset()} value="Reset Field Values" className="btn btn-outline btn-xs mt-3 text-black" />
                    </div>
                </form>
            </div>
        </div>
    );
}
