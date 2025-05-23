import { CulturalSpace } from "../types/CulturalSpace";
export declare const useCulturalSpaces: () => {
    spaces: CulturalSpace[];
    loading: boolean;
    error: Error | null;
};
