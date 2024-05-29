import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

export default function useCart() {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { refetch, data: cart = [] } = useQuery({
        queryKey: ["cart", user?.email],
        queryFn: async () => {
            if (!user?.email) {
                // If user is not logged in or email is undefined, return an empty array
                return [];
            }
            const res = await axiosSecure.get(`/carts?email=${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });
    return [cart, refetch];
}
