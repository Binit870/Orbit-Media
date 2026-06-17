import { motion as Motion } from "framer-motion";
import HeroOrnament from "../ui/HeroOrnament";

export default function Hero() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "82vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        textAlign: "center",
        padding: "100px 24px 80px",
      }}
    >
      <HeroOrnament />

      <Motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        style={{ position: "relative", zIndex: 1, maxWidth: 820 }}
      >
        <h1
          className="om-heading"
          style={{
            fontSize: "clamp(48px, 9vw, 96px)",
            margin: 0,
          }}
        >
          Shaping
          <br />
          <span className="om-heading-italic">Tech Media</span>
        </h1>

        <p
          className="om-body"
          style={{
            fontSize: "clamp(15px, 2vw, 18px)",
            marginTop: 28,
            maxWidth: 520,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          The media engine for founders, startups &amp; venture-backed brands.
        </p>
      </Motion.div>
    </section>
  );
}
