import { motion as Motion } from "framer-motion";
import OrbitIcon from "../components/ui/OrbitIcon";

// Full-site maintenance page. To actually put the site into maintenance
// mode, flip MAINTENANCE_MODE in src/config/maintenance.js to true — App.jsx
// checks that flag and routes every path here instead of the real app.
export default function Maintenance() {
  return (
    <div
      style={{
        position: "relative",
        minHeight: "100dvh",
        width: "100%",
        background: "var(--bg)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        textAlign: "center",
      }}
    >
      <Motion.div
        initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <OrbitIcon size={48} style={{ color: "var(--accent)" }} />
      </Motion.div>

      <Motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15, ease: [0.6, 0, 0.4, 1] }}
        className="om-heading"
        style={{ fontSize: "clamp(28px, 4.6vw, 44px)", marginTop: 24, maxWidth: 560 }}
      >
        We'll be right back
      </Motion.h1>

      <Motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25, ease: [0.6, 0, 0.4, 1] }}
        className="om-body"
        style={{ fontSize: 16, maxWidth: 460, marginTop: 14, color: "var(--text-muted)" }}
      >
        Orbit Media is undergoing scheduled maintenance. We're making a few
        improvements and will be back online shortly.
      </Motion.p>

      <Motion.a
        href="mailto:hello@orbit-media.in"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.35, ease: [0.6, 0, 0.4, 1] }}
        style={{
          marginTop: 28,
          fontFamily: "'Switzer', sans-serif",
          fontSize: 14,
          fontWeight: 600,
          color: "var(--accent)",
          textDecoration: "none",
        }}
      >
        hello@orbit-media.in
      </Motion.a>
    </div>
  );
}
