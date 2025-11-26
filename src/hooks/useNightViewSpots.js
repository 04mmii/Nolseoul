import { useReactQuery } from "./useReactQuery";
async function fetchNightViewSpots() {
    var _a;
    const BASE_URL = import.meta.env.DEV ? "https://nolseoul.vercel.app" : "";
    const res = await fetch(`${BASE_URL}/api/seoulapi?type=night`);
    const data = await res.json();
    return Array.isArray((_a = data === null || data === void 0 ? void 0 : data.viewNightSpot) === null || _a === void 0 ? void 0 : _a.row) ? data.viewNightSpot.row : [];
}
export const useNightViewSpots = () => {
    const { data, isLoading, isError, error } = useReactQuery(["nightViewSpots"], fetchNightViewSpots);
    return {
        spots: data !== null && data !== void 0 ? data : [],
        loading: isLoading,
        isError,
        error,
    };
};
