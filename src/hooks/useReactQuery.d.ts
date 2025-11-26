import { QueryKey } from "@tanstack/react-query";
export declare function useReactQuery<T>(key: QueryKey, fetcher: () => Promise<T>): {
    data: import("@tanstack/query-core").NoInfer<T> | undefined;
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
    isFetching: boolean;
};
