import { useReactQuery } from "./useReactQuery";
import { CulturalSpace } from "../types/CulturalSpace";

async function fetchCulturalSpaces(): Promise<CulturalSpace[]> {
  const BASE_URL = import.meta.env.DEV ? "https://nolseoul.vercel.app" : "";
  const res = await fetch(`${BASE_URL}/api/seoulapi?type=space`);
  const data = await res.json();

  return data?.culturalSpaceInfo?.row ?? [];
}

export const useCulturalSpaces = () => {
  const { data, isLoading, isError, error } = useReactQuery<CulturalSpace[]>(
    ["culturalSpaces"],
    fetchCulturalSpaces
  );

  return {
    spaces: data ?? [],
    loading: isLoading,
    isError,
    error,
  };
};
