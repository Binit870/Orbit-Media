import { motion as Motion } from "framer-motion";
import { Mic, Video, Radio, PlayCircle, AudioWaveform } from "lucide-react";

// Flanking animated element for the loader — built from the actual services
// (podcasting, video, distribution) instead of a generic planet.
//
// Unlike a mechanical orbit, each icon drifts independently along its own
// small, organic path (different amplitude/duration/phase per icon) while
// gently pulsing — more like ambient floating particles than a fixed rotation.
// The dashed ring behind them turns very slowly, just enough to read as a
// living network rather than a static badge cluster.

const ICONS = [
  { Icon: Mic, angle: 0, size: 20, dx: 10, dy: 14, duration: 5.5 },
  { Icon: Video, angle: 72, size: 20, dx: 14, dy: 9, duration: 6.5 },
  { Icon: Radio, angle: 144, size: 18, dx: 9, dy: 12, duration: 5.0 },
  { Icon: PlayCircle, angle: 216, size: 20, dx: 12, dy: 10, duration: 7.0 },
  { Icon: AudioWaveform, angle: 288, size: 18, dx: 11, dy: 13, duration: 6.0 },
];

export default function MediaOrbit({ size = 220 }) {
  const center = size / 2;
  const distance = size * 0.36;

  return (
    <div style={{ position: "relative", width: size, height: size }}>
      {/* very slow background ring, just enough to feel alive */}
      <Motion.svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ position: "absolute", inset: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      >
        <circle
          cx={center}
          cy={center}
          r={distance}
          fill="none"
          stroke="var(--hairline)"
          strokeWidth={1}
          strokeDasharray="2 6"
        />
      </Motion.svg>

      {ICONS.map((iconDef, i) => {
        const { Icon, angle, size: iconSize, dx, dy, duration } = iconDef;
        const rad = (angle * Math.PI) / 180;
        const baseX = center + distance * Math.cos(rad);
        const baseY = center + distance * Math.sin(rad);
        const boxSize = iconSize + 20;

        return (
          <Motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.6, left: baseX, top: baseY }}
            animate={{
              opacity: 1,
              scale: 1,
              x: [0, dx, -dx * 0.6, 0],
              y: [0, -dy, dy * 0.7, 0],
            }}
            transition={{
              opacity: { duration: 0.5, delay: 0.3 + i * 0.1 },
              scale: { duration: 0.5, delay: 0.3 + i * 0.1 },
              x: { duration, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 },
              y: { duration: duration * 1.15, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 },
            }}
            style={{
              position: "absolute",
              left: baseX,
              top: baseY,
              transform: "translate(-50%, -50%)",
            }}
          >
            <Motion.div
              animate={{
                boxShadow: [
                  "0 0 0px var(--accent)",
                  "0 0 10px var(--accent)",
                  "0 0 0px var(--accent)",
                ],
              }}
              transition={{
                duration: duration * 0.7,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
              style={{
                width: boxSize,
                height: boxSize,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                background: "var(--bg)",
                border: "1px solid var(--hairline)",
              }}
            >
              <Icon size={iconSize} strokeWidth={1.75} color="var(--accent)" />
            </Motion.div>
          </Motion.div>
        );
      })}

      {/* center mark, slow independent pulse */}
      <Motion.div
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute",
          left: center,
          top: center,
          transform: "translate(-50%, -50%)",
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "var(--accent)",
        }}
      />
    </div>
  );
}