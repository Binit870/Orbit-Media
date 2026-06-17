export default function OrbitIcon({ size = 28, className = "", style = {} }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      style={{ flexShrink: 0, ...style }}
      aria-hidden="true"
    >
      <g
        stroke="currentColor"
        fill="none"
        strokeWidth="7"
        strokeLinecap="round"
      >
        <path d="M 47.22 65.76 A 16.00 16.00 0 1 1 65.76 52.78" />
        <path d="M 45.57 75.11 A 25.50 25.50 0 1 1 75.11 54.43" />
        <path d="M 43.92 84.47 A 35.00 35.00 0 1 1 84.47 56.08" />
        <path d="M 42.27 93.82 A 44.50 44.50 0 1 1 93.82 57.73" />
      </g>
    </svg>
  );
}
