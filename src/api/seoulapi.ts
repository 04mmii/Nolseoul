import fetch from "node-fetch";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const ENDPOINTS: Record<string, string> = {
  event: "culturalEventInfo",
  night: "viewNightSpot",
  space: "culturalSpaceInfo",
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const API_KEY = process.env.VITE_SEOUL_API_KEY;
  if (!API_KEY) {
    return res.status(500).json({ error: "API_KEY is not set" });
  }

  const { type = "event" } = req.query;
  const endpoint = ENDPOINTS[type as string];
  if (!endpoint) {
    return res.status(400).json({ error: "Invalid type parameter" });
  }

  const url = `http://openapi.seoul.go.kr:8088/${API_KEY}/json/${endpoint}/1/5/`;

  try {
    const response = await fetch(url);

    // ⛳️ 먼저 응답을 text로 받아서 실제 내용을 출력
    const text = await response.text();
    console.log("📦 응답 원문:\n", text);

    // JSON 파싱 가능한지 확인
    try {
      const data = JSON.parse(text);
      res.status(200).json(data);
    } catch (jsonErr) {
      // JSON 파싱 실패시 raw text로 반환
      console.error("❌ JSON 파싱 실패:", jsonErr);
      res.status(500).send({
        error: "응답이 JSON이 아님",
        raw: text,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch from Seoul OpenAPI", detail: error });
  }
}
