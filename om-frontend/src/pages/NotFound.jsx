import { GoldButton } from "../components/ui/Button";

export default function NotFound() {
  return (
    <section style={{ padding: "140px 24px", textAlign: "center" }}>
      <p className="om-eyebrow" style={{ marginBottom: 18 }}>404</p>
      <h1 className="om-heading" style={{ fontSize: "clamp(36px, 6vw, 56px)", marginBottom: 18 }}>
        Lost in <span className="om-heading-italic">orbit</span>
      </h1>
      <p className="om-body" style={{ fontSize: 15.5, marginBottom: 32 }}>
        That page doesn't exist. Let's get you back on track.
      </p>
      <GoldButton to="/">Back to Home</GoldButton>
    </section>
  );
}
