import { CulturalSpace } from "../types/CulturalSpace";
export declare const useCulturalSpaces: () => {
    spaces: CulturalSpace[];
    loading: boolean;
    isError: boolean;
    error: Error | null;
};
