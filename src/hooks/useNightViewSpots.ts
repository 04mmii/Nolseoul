import { useReactQuery } from "./useReactQuery";
import { NightViewSpot } from "../types/NightViewSpot";

async function fetchNightViewSpots(): Promise<NightViewSpot[]> {
  const BASE_URL = import.meta.env.DEV ? "https://nolseoul.vercel.app" : "";
  const res = await fetch(`${BASE_URL}/api/seoulapi?type=night`);
  const data = await res.json();

  return Array.isArray(data?.viewNightSpot?.row) ? data.viewNightSpot.row : [];
}

export const useNightViewSpots = () => {
  const { data, isLoading, isError, error } = useReactQuery<NightViewSpot[]>(
    ["nightViewSpots"],
    fetchNightViewSpots
  );

  return {
    spots: data ?? [],
    loading: isLoading,
    isError,
    error,
  };
};
