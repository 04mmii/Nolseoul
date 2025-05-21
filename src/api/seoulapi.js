var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const ENDPOINTS = {
    event: "culturalEventInfo",
    night: "viewNightSpot",
    space: "culturalSpaceInfo",
};
export default function handler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const API_KEY = process.env.SEOUL_API_KEY;
        if (!API_KEY) {
            console.error("❌ SEOUL_API_KEY is not set");
            return res
                .status(500)
                .json({ error: "Server misconfiguration: missing API key" });
        }
        // req.query.type 은 string | string[] 인 점 유의
        const type = Array.isArray(req.query.type)
            ? req.query.type[0]
            : (_a = req.query.type) !== null && _a !== void 0 ? _a : "event";
        const endpoint = ENDPOINTS[type];
        if (!endpoint) {
            return res.status(400).json({ error: "Invalid type parameter" });
        }
        const url = `https://openapi.seoul.go.kr:8088/${API_KEY}/json/${endpoint}/1/1000/`;
        console.log("⏳ Fetching Seoul API:", url);
        try {
            // Node 18+ 환경이라면 fetch 가 글로벌에 내장되어 있습니다.
            const response = yield fetch(url);
            if (!response.ok) {
                console.error("❌ Seoul API responded with status", response.status);
                return res.status(502).json({ error: "Bad gateway: Seoul API error" });
            }
            const data = yield response.json();
            return res.status(200).json(data);
        }
        catch (e) {
            console.error("❌ Failed to fetch from Seoul OpenAPI:", e);
            return res
                .status(500)
                .json({ error: "Failed to fetch from Seoul OpenAPI" });
        }
    });
}
