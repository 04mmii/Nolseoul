import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EventsPage from "./pages/EventsPage";
import CulturalSpacesPage from "./components/CulturalSpace/CulturalSpacesPage";

function App() {
  return (
    <div className="font-noto">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/spaces" element={<CulturalSpacesPage />} />
      </Routes>
    </div>
  );
}

export default App;
