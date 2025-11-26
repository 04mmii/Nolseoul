import { useReactQuery } from "./useReactQuery";
async function fetchEvents() {
    var _a, _b;
    const res = await fetch("/api/seoulapi?type=event");
    const data = await res.json();
    return (_b = (_a = data === null || data === void 0 ? void 0 : data.culturalEventInfo) === null || _a === void 0 ? void 0 : _a.row) !== null && _b !== void 0 ? _b : [];
}
export const useEvents = () => {
    const { data, isLoading, isError, error } = useReactQuery(["events"], fetchEvents);
    return {
        events: data !== null && data !== void 0 ? data : [],
        loading: isLoading,
        isError,
        error,
    };
};
