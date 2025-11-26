import { useQuery } from "@tanstack/react-query";
export function useReactQuery(key, fetcher) {
    const { data, isLoading, isError, error, isFetching } = useQuery({
        queryKey: key,
        queryFn: fetcher,
    });
    return {
        data,
        isLoading,
        isError,
        error,
        isFetching,
    };
}
