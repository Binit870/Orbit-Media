import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
// import Navbar from "./Navbar";
import Footer from "./Footer";
import Loader from "../ui/Loader";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [pathname]);
  return null;
}

export default function Layout() {
  const [loaderDone, setLoaderDone] = useState(false);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Loader is a fixed, full-screen overlay — it never adds height to the
          document, so it can never cause the page to scroll. Once it's done
          it unmounts entirely and the real page underneath is revealed. */}
      {!loaderDone && <Loader onDone={() => setLoaderDone(true)} />}

      <ScrollToTop />
      {/* <Navbar /> */}
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
