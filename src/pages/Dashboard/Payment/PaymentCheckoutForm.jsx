import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import useCart from "../../../hooks/useCart";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function PaymentCheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const axiosSecure = useAxiosSecure();
    const [cart, refetch] = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const totalPrice = cart.reduce((total, item) => total + item?.price, 0);

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post("/create-payment-intent", { price: totalPrice }).then(res => {
                setClientSecret(res.data.clientSecret);
            });
        }
    }, [axiosSecure, totalPrice]);

    const handleSubmit = async event => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });

        if (error) {
            setError(error.message);
        } else {
            console.log("[PaymentMethod]", paymentMethod);
            setError("");
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || "anonymous",
                    name: user?.displayName || "anonymous@mail.com",
                },
            },
        });

        if (confirmError) {
            console.log("confirmError", confirmError);
        } else {
            if (paymentIntent.status === "succeeded") {
                setTransactionId(paymentIntent.id);
                // save payment to the database
                const payment = {
                    transactionId: paymentIntent.id,
                    email: user?.email,
                    name: user?.displayName,
                    price: totalPrice,
                    date: new Date(),
                    cartIds: cart?.map(item => item?._id),
                    serviceIds: cart?.map(item => item?.serviceId),
                    status: "pending",
                };

                const res = await axiosSecure.post("/payments", payment);
                refetch();
                if (res.data?.paymentResult?.insertedId) {
                    Swal.fire({
                        icon: "success",
                        title: "Thank you for Purchase",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    navigate("/dashboard/payment-history");
                }
            }
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: "16px",
                            color: "#424770",
                            "::placeholder": {
                                color: "#aab7c4",
                            },
                        },
                        invalid: {
                            color: "#9e2146",
                        },
                    },
                }}
            />
            <button className="btn btn-sm btn-primary my-4" type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
            <p className="text-red-500">{error}</p>
            {transactionId && (
                <p>
                    Your Transaction ID: <span className="text-green-500">{transactionId}</span>
                </p>
            )}
        </form>
    );
}
