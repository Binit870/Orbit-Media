import { motion as Motion } from "framer-motion";
import HeroOrnament from "../ui/HeroOrnament";
import { AccentButton, ArrowLink } from "../ui/Button";

const lineVariants = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.12 + i * 0.1 },
  }),
};

export default function Hero() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "88vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        textAlign: "center",
        padding: "120px 24px 96px",
      }}
    >
      <HeroOrnament />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 860 }}>
        <Motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={lineVariants}
          className="om-eyebrow"
          style={{ marginBottom: 22 }}
        >
          Shaping Tech Media
        </Motion.div>

        <h1
          className="om-heading"
          style={{
            fontSize: "clamp(42px, 8.6vw, 92px)",
            margin: 0,
            overflow: "hidden",
          }}
        >
          <Motion.span custom={1} initial="hidden" animate="visible" variants={lineVariants} style={{ display: "block" }}>
            Distributing
          </Motion.span>
          <Motion.span
            custom={2}
            initial="hidden"
            animate="visible"
            variants={lineVariants}
            className="om-heading-gradient"
            style={{ display: "block" }}
          >
            Tech Media
          </Motion.span>
        </h1>

        <Motion.p
          custom={3}
          initial="hidden"
          animate="visible"
          variants={lineVariants}
          className="om-body"
          style={{
            fontSize: "clamp(13.5px, 1.5vw, 15px)",
            marginTop: 26,
            maxWidth: 480,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          The media engine for founders, startups &amp; venture-backed brands —
          podcasting, launch videos, founder brands and AI UGC, produced and distributed.
        </Motion.p>

        <Motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={lineVariants}
          style={{
            marginTop: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
      <AccentButton to="https://cal.com/ayush-kumar-ujqipk/15min">
  Book a Call
</AccentButton>
          <ArrowLink to="/case-studies">See the work</ArrowLink>
        </Motion.div>
      </div>
    </section>
  );
}