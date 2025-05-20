import { NightViewSpot } from "../types/NightViewSpot";
export declare const useNightViewSpots: () => {
    spots: NightViewSpot[];
    loading: boolean;
    error: Error | null;
};
