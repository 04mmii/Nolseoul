import { jsx as _jsx } from "react/jsx-runtime";
import ReactDOM from "react-dom/client";
import { Suspense } from "react";
import App from "./App";
import "./index.css";
import "@/styles/skeleton.css";
import "./i18n";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60,
            gcTime: 1000 * 60 * 5,
            refetchOnWindowFocus: false,
        },
    },
});
ReactDOM.createRoot(document.getElementById("root")).render(_jsx(Suspense, { fallback: _jsx("div", { className: "flex items-center justify-center min-h-screen", children: "Loading..." }), children: _jsx(BrowserRouter, { children: _jsx(QueryClientProvider, { client: queryClient, children: _jsx(App, {}) }) }) }));
