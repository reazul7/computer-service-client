import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentCheckoutForm from "./PaymentCheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_stripe_publishableKey);

export default function Payment() {
    return (
        <div>
            <SectionTitle heading={"Payment"} subHeading={"Please pay to get Service"} />
            <div>
                <Elements stripe={stripePromise}>
                    <PaymentCheckoutForm />
                </Elements>
            </div>
        </div>
    );
}
