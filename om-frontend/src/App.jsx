import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";

// Route-level code splitting — everything except the landing page
// is loaded on demand, keeping the first paint small and fast.
const ServicePage = lazy(() => import("./pages/ServicePage"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const NotFound = lazy(() => import("./pages/NotFound"));

function RouteFallback() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="om-skeleton" style={{ width: 120, height: 4, borderRadius: 999 }} />
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services/:slug" element={<ServicePage />} />
          <Route path="/case-studies" element={<CaseStudies />} />
        
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
