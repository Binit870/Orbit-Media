export default function HeroOrnament() {
  return (
    <svg
      viewBox="0 0 800 800"
      width="900"
      height="900"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        color: "var(--gold)",
        opacity: 0.16,
        pointerEvents: "none",
      }}
      className="om-spin-slow"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="0.75" fill="none">
        <line x1="400" y1="400" x2="780.0" y2="400.0" />
        <line x1="400" y1="400" x2="729.1" y2="590.0" />
        <line x1="400" y1="400" x2="590.0" y2="729.1" />
        <line x1="400" y1="400" x2="400.0" y2="780.0" />
        <line x1="400" y1="400" x2="210.0" y2="729.1" />
        <line x1="400" y1="400" x2="70.9" y2="590.0" />
        <line x1="400" y1="400" x2="20.0" y2="400.0" />
        <line x1="400" y1="400" x2="70.9" y2="210.0" />
        <line x1="400" y1="400" x2="210.0" y2="70.9" />
        <line x1="400" y1="400" x2="400.0" y2="20.0" />
        <line x1="400" y1="400" x2="590.0" y2="70.9" />
        <line x1="400" y1="400" x2="729.1" y2="210.0" />
        <circle cx="400" cy="400" r="180" />
        <circle cx="400" cy="400" r="280" />
        <circle cx="400" cy="400" r="380" strokeDasharray="2 6" />
      </g>
    </svg>
  );
}
