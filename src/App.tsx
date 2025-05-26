import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EventsPage from "./pages/EventsPage";
import CulturalSpacesPage from "./pages/CulturalSpacesPage";
import CulturalSpaceDetail from "./components/CulturalSpace/CulturalSpaceDetail";
import NightViewsPage from "./pages/NightViewsPage";
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  return (
    <div className="font-noto">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events/:slug" element={<EventsPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/spaces" element={<CulturalSpacesPage />} />
        <Route path="/spaces/:NUM" element={<CulturalSpaceDetail />} />
        <Route path="/night-views" element={<NightViewsPage />} />
      </Routes>
      <SpeedInsights />
    </div>
  );
}

export default App;
