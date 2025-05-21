var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useEffect, useState } from "react";
export const useNightViewSpots = () => {
    const [spots, setSpots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchSpots = () => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            try {
                const res = yield fetch(`/api/seoulapi?type=night`);
                const data = yield res.json();
                if (!((_a = data.viewNightSpot) === null || _a === void 0 ? void 0 : _a.row) ||
                    !Array.isArray(data.viewNightSpot.row)) {
                    console.error("API 구조:", data);
                    throw new Error("데이터 구조 불일치");
                }
                setSpots(data.viewNightSpot.row);
            }
            catch (err) {
                setError(err instanceof Error ? err : new Error("API 오류 발생"));
            }
            finally {
                setLoading(false);
            }
        });
        fetchSpots();
    }, []);
    return { spots, loading, error };
};
