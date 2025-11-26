import { Event } from "../types/Event";
export declare const useEvents: () => {
    events: Event[];
    loading: boolean;
    isError: boolean;
    error: Error | null;
};
