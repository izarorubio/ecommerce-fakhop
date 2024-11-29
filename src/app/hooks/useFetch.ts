import { useEffect, useState } from "react";

export default function useFetch(url: string) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const responseData = await response.json();
                setData(responseData);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [url]);

    return { data, loading, error };
}