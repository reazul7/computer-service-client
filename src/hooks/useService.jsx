import { useEffect, useState } from "react";

export default function useService() {
    const [service, setService] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch("service.json")
            .then(res => res.json())
            .then(data => {
                setService(data);
                setLoading(false);
            });
    }, []);
    return [service, loading];
}
