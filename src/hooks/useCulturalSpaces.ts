import { useEffect, useState } from "react";
import { getCulturalSpaces } from "../api/getCulturalSpaces";
import { CulturalSpace } from "../types/CulturalSpace";

export const useCulturalSpaces = () => {
  const [spaces, setSpaces] = useState<CulturalSpace[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCulturalSpaces().then((data) => {
      setSpaces(data);
      setLoading(false);
    });
  }, []);

  return { spaces, loading };
};
