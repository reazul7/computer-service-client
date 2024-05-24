import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

export default function useService() {
    const axiosPublic = useAxiosPublic();
    const {
        data: service = [],
        isPending: loading,
        refetch,
    } = useQuery({
        queryKey: ["service"],
        queryFn: async () => {
            const res = await axiosPublic.get("/service");
            return res.data;
        },
    });
    return [service, loading, refetch];
}
