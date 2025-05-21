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
export const useCulturalSpaces = () => {
    const [spaces, setSpaces] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchSpaces = () => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            try {
                const res = yield fetch(`/api/seoulapi?type=space`);
                const data = yield res.json();
                if (!((_a = data.culturalSpaceInfo) === null || _a === void 0 ? void 0 : _a.row)) {
                    throw new Error("데이터 구조 불일치: " + JSON.stringify(data).slice(0, 100));
                }
                setSpaces(data.culturalSpaceInfo.row);
            }
            catch (err) {
                setError(err instanceof Error ? err : new Error("API 오류 발생"));
                console.error("API 호출 실패:", err);
            }
            finally {
                setLoading(false);
            }
        });
        fetchSpaces();
    }, []);
    return { spaces, loading, error };
};
