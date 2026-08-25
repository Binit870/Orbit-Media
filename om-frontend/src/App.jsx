import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Maintenance from "./pages/Maintenance";
import { MAINTENANCE_MODE } from "./config/maintenance";

// Route-level code splitting — everything except the landing page
// is loaded on demand, keeping the first paint small and fast.
// NOTE: CaseStudies is intentionally NOT lazy-loaded here — Home.jsx
// renders it statically as a homepage section, so it's already part
// of the main bundle. Lazy-wrapping it here would just add an
// ineffective duplicate dynamic import without any real code-splitting
// benefit (Vite warns about this).
import CaseStudies from "./pages/CaseStudies";
const ServicePage = lazy(() => import("./pages/ServicePage"));
const BookACall = lazy(() => import("./pages/BookACall"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
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
  // Site-wide maintenance switch — every route falls back to the
  // Maintenance page while this is on. Toggle in src/config/maintenance.js.
  if (MAINTENANCE_MODE) {
    return <Maintenance />;
  }

  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services/:slug" element={<ServicePage />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/book-a-call" element={<BookACall />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
