import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EventsPage from "./pages/EventsPage";
import CulturalSpacesPage from "./pages/CulturalSpacesPage";
import CulturalSpaceDetail from "./components/CulturalSpace/CulturalSpaceDetail";
import NightViewsPage from "./pages/NightViewsPage";
function App() {
    return (_jsx("div", { className: "font-noto", children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/events/:slug", element: _jsx(EventsPage, {}) }), _jsx(Route, { path: "/events", element: _jsx(EventsPage, {}) }), _jsx(Route, { path: "/spaces", element: _jsx(CulturalSpacesPage, {}) }), _jsx(Route, { path: "/spaces/:NUM", element: _jsx(CulturalSpaceDetail, {}) }), _jsx(Route, { path: "/night-views", element: _jsx(NightViewsPage, {}) })] }) }));
}
export default App;
