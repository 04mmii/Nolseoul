import { CulturalSpace } from "../types/CulturalSpace";
export declare const useCulturalSpaces: () => {
    spaces: CulturalSpace[] | null;
    loading: boolean;
    error: Error | null;
};
