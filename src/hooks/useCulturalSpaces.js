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
const API_KEY = import.meta.env.VITE_SEOUL_API_KEY;
let cachedSpaces = null;
export const useCulturalSpaces = () => {
    const [spaces, setSpaces] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchSpaces = () => __awaiter(void 0, void 0, void 0, function* () {
            var _a;
            if (cachedSpaces) {
                setSpaces(cachedSpaces);
                setLoading(false);
                return;
            }
            try {
                const res = yield fetch(`http://openapi.seoul.go.kr:8088/${API_KEY}/json/culturalSpaceInfo/1/1000/`, { headers: { Accept: "application/json" } });
                const rawText = yield res.text();
                if (!res.ok)
                    throw new Error(`HTTP 오류: ${res.status}`);
                const data = JSON.parse(rawText);
                if (!((_a = data.culturalSpaceInfo) === null || _a === void 0 ? void 0 : _a.row)) {
                    throw new Error("데이터 구조 불일치: " + rawText.slice(0, 100));
                }
                cachedSpaces = data.culturalSpaceInfo.row;
                setSpaces(cachedSpaces);
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
