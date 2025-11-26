import { NightViewSpot } from "../types/NightViewSpot";
export declare const useNightViewSpots: () => {
    spots: NightViewSpot[];
    loading: boolean;
    isError: boolean;
    error: Error | null;
};
