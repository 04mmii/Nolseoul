import { useReactQuery } from "./useReactQuery";
async function fetchCulturalSpaces() {
    var _a, _b;
    const BASE_URL = import.meta.env.DEV ? "https://nolseoul.vercel.app" : "";
    const res = await fetch(`${BASE_URL}/api/seoulapi?type=space`);
    const data = await res.json();
    return (_b = (_a = data === null || data === void 0 ? void 0 : data.culturalSpaceInfo) === null || _a === void 0 ? void 0 : _a.row) !== null && _b !== void 0 ? _b : [];
}
export const useCulturalSpaces = () => {
    const { data, isLoading, isError, error } = useReactQuery(["culturalSpaces"], fetchCulturalSpaces);
    return {
        spaces: data !== null && data !== void 0 ? data : [],
        loading: isLoading,
        isError,
        error,
    };
};
