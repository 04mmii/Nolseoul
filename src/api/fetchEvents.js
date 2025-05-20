var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from "axios";
const API_KEY = import.meta.env.VITE_API_KEY;
export const fetchEvents = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const response = yield axios.get(`https://openapi.seoul.go.kr:8088/${API_KEY}/json/culturalEventInfo/1/100/`);
        const data = (_b = (_a = response.data) === null || _a === void 0 ? void 0 : _a.culturalEventInfo) === null || _b === void 0 ? void 0 : _b.row;
        if (!data) {
            console.error("이벤트 데이터를 찾을 수 없습니다:", response.data);
            return [];
        }
        return data;
    }
    catch (error) {
        console.error("API 요청 오류:", error);
        return [];
    }
});
