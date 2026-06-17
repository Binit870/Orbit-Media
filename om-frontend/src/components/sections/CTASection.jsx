import { GoldButton } from "../ui/Button";

export default function CTASection({
  heading = "Ready to grow your audience?",
  subheading = "Tell us about your brand — we'll come back with a plan within 24 hours.",
}) {
  return (
    <section
      style={{
        padding: "88px 24px",
        textAlign: "center",
        borderTop: "1px solid var(--hairline)",
        background: "var(--bg-soft)",
      }}
    >
      <h2 className="om-heading" style={{ fontSize: "clamp(28px, 4.5vw, 44px)", marginBottom: 16 }}>
        {heading}
      </h2>
      <p className="om-body" style={{ fontSize: 15.5, maxWidth: 460, margin: "0 auto 32px" }}>
        {subheading}
      </p>
      <GoldButton to="/contact">Book a Call</GoldButton>
    </section>
  );
}
