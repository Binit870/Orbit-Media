import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { Mic, Clapperboard, Users, Sparkles as SparklesIcon, Wand2 } from "lucide-react";

export const SERVICES = [
  { id: "podcasting", label: "Podcasting", Icon: Mic },
  { id: "launch-videos", label: "Launch Videos", Icon: Clapperboard },
  { id: "founder-brands", label: "Founder Brands", Icon: Users },
  { id: "ai-ugc", label: "AI UGC / Commercials", Icon: SparklesIcon },
  { id: "motion-graphics", label: "Motion Graphics", Icon: Wand2 },
];

const ORBIT_CENTER_X = 4.2; // desktop offset — sits right of the text column
const ENTRANCE_DURATION = 2.4;
const COMPACT_BREAKPOINT = 900; // canvas pixel width, not viewport width

const COLOR_CORE = "#8b7cff";
const COLOR_MID = "#a78bfa";
const COLOR_DEEP = "#6c5ce7";

function useReducedMotion() {
  return useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );
}

function easeOutCubic(x) {
  return 1 - Math.pow(1 - x, 3);
}

// ---- Five distinct trajectory shapes, one per card ----
function trajCircle(t, p) {
  const a = p.phase + t * p.speed;
  return [Math.cos(a) * p.r1, Math.sin(t * 0.3 + p.phase) * 0.25, Math.sin(a) * p.r1];
}
function trajInclinedCircle(t, p) {
  const a = p.phase + t * p.speed;
  const rawX = Math.cos(a) * p.r1;
  const rawZ = Math.sin(a) * p.r1;
  return [rawX, rawZ * Math.sin(p.tilt), rawZ * Math.cos(p.tilt)];
}
function trajFigureEight(t, p) {
  const a = p.phase + t * p.speed;
  return [Math.sin(a) * p.r1, Math.sin(2 * a) * p.r2 * 0.55, Math.cos(a) * p.r2 * 0.4];
}
function trajBreathingSpiral(t, p) {
  const a = p.phase + t * p.speed;
  const r = p.r1 * (1 + 0.28 * Math.sin(t * 0.45 + p.phase));
  return [Math.cos(a) * r, Math.sin(t * 0.4 + p.phase) * 0.55, Math.sin(a) * r];
}
function trajDiagonalEllipse(t, p) {
  const a = p.phase - t * p.speed;
  const ex = Math.cos(a) * p.r1;
  const ey = Math.sin(a) * p.r2;
  const x = ex * Math.cos(p.tilt) - ey * Math.sin(p.tilt);
  const y = ex * Math.sin(p.tilt) + ey * Math.cos(p.tilt);
  return [x, y, Math.sin(t * 0.25 + p.phase) * 0.6];
}
const TRAJECTORIES = [trajCircle, trajInclinedCircle, trajFigureEight, trajBreathingSpiral, trajDiagonalEllipse];

function paramsFor(index, total) {
  const phase = (index / total) * Math.PI * 2 - Math.PI / 2;
  return {
    phase,
    speed: 0.14 + index * 0.02,
    r1: 1.9 + (index % 2) * 0.3,
    r2: 1.25 + (index % 3) * 0.2,
    tilt: 0.55 + index * 0.15,
  };
}

// centerX/scale let the same trajectory math work at full desktop size
// or shrunk-and-centered for a narrow mobile canvas.
function orbitTarget(index, total, t, reduced, centerX, scale) {
  const p = paramsFor(index, total);
  const effective = {
    ...p,
    speed: reduced ? p.speed * 0.12 : p.speed,
    r1: p.r1 * scale,
    r2: p.r2 * scale,
  };
  const [x, y, z] = TRAJECTORIES[index % TRAJECTORIES.length](t, effective);
  return [centerX + x, y * scale, z * scale];
}

function useEntryOffset(index, centerX, scale) {
  return useMemo(() => {
    const angle = ((index * 137.5) % 360) * (Math.PI / 180);
    return {
      x: centerX + Math.cos(angle) * 6.5 * scale,
      y: (4.6 + index * 0.4) * scale,
      z: Math.sin(angle) * 6.5 * scale,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, centerX, scale]);
}

function nodePosition(index, total, t, reduced, entry, centerX, scale) {
  const target = orbitTarget(index, total, t, reduced, centerX, scale);
  if (reduced) return target;
  const eased = easeOutCubic(Math.min(t / ENTRANCE_DURATION, 1));
  return [
    entry.x + (target[0] - entry.x) * eased,
    entry.y + (target[1] - entry.y) * eased,
    entry.z + (target[2] - entry.z) * eased,
  ];
}

function CameraRig({ reduced, centerX }) {
  const { camera } = useThree();
  const startRef = useRef(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (startRef.current === null) startRef.current = t;
    const introT = t - startRef.current;
    const camX = centerX * 0.2;

    if (reduced) {
      camera.position.set(camX, 0.5, 7.4);
      camera.lookAt(centerX * 0.5, 0, 0);
      return;
    }

    const eased = easeOutCubic(Math.min(introT / 1.7, 1));
    const baseZ = 10 - eased * (10 - 7.4);
    const baseY = 1.7 - eased * (1.7 - 0.5);
    const driftX = Math.sin(t * 0.1) * 0.4;
    const driftY = Math.sin(t * 0.075) * 0.18;

    camera.position.set(camX + driftX, baseY + driftY, baseZ);
    camera.lookAt(centerX * 0.5, 0, 0);
  });

  return null;
}

function GroundShadow({ centerX, scale }) {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) ref.current.material.opacity = 0.2 + Math.sin(t * 0.8) * 0.03;
  });
  return (
    <mesh ref={ref} position={[centerX, -1.6 * scale, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <circleGeometry args={[1.6 * scale, 40]} />
      <meshBasicMaterial color={COLOR_DEEP} transparent opacity={0.2} />
    </mesh>
  );
}

function Core({ centerX, scale }) {
  const coreRef = useRef();
  const shellRef = useRef();
  const reduced = useReducedMotion();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const speed = reduced ? 0.15 : 1;
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.22 * speed;
      coreRef.current.rotation.x = Math.sin(t * 0.3) * 0.1 * speed;
      coreRef.current.rotation.z = Math.cos(t * 0.18) * 0.06 * speed;
      coreRef.current.scale.setScalar(scale * (1 + Math.sin(t * 0.8) * 0.03));
    }
    if (shellRef.current) {
      shellRef.current.rotation.y = -t * 0.15 * speed;
      shellRef.current.rotation.x = Math.sin(t * 0.22) * 0.05 * speed;
      shellRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group position={[centerX, 0, 0]}>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.05, 1]} />
        <meshStandardMaterial
          color={COLOR_CORE}
          metalness={0.3}
          roughness={0.1}
          emissive={COLOR_DEEP}
          emissiveIntensity={0.45}
          transparent
          opacity={0.74}
          flatShading
        />
      </mesh>
      <mesh ref={shellRef}>
        <icosahedronGeometry args={[1.26, 1]} />
        <meshBasicMaterial color={COLOR_MID} wireframe transparent opacity={0.34} />
      </mesh>
    </group>
  );
}

function ConnectorLine({ index, total, reduced, entry, centerX, scale }) {
  const ref = useRef();
  useFrame((state) => {
    const [x, y, z] = nodePosition(index, total, state.clock.getElapsedTime(), reduced, entry, centerX, scale);
    const pos = ref.current?.geometry.attributes.position;
    if (pos) {
      pos.setXYZ(0, centerX, 0, 0);
      pos.setXYZ(1, x, y, z);
      pos.needsUpdate = true;
    }
  });

  return (
    <line ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={2}
          array={new Float32Array([centerX, 0, 0, 0, 0, 0])}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color={COLOR_MID} transparent opacity={0.4} />
    </line>
  );
}

function ServiceNode({ service, index, total, reduced, entry, centerX, scale }) {
  const groupRef = useRef();
  const cardRef = useRef();
  const { camera } = useThree();
  const { Icon, label } = service;
  const worldPos = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const [x, y, z] = nodePosition(index, total, t, reduced, entry, centerX, scale);
    if (!groupRef.current) return;

    groupRef.current.position.set(x, y, z);
    worldPos.copy(camera.position);
    groupRef.current.lookAt(worldPos);

    if (cardRef.current) {
      const dist = groupRef.current.position.distanceTo(camera.position);
      const norm = THREE.MathUtils.clamp(1 - (dist - 5) / 7, 0.6, 1);
      cardRef.current.style.opacity = String(norm);
      cardRef.current.style.transform = `scale(${0.8 + scale * 0.2})`;
    }
  });

  return (
    <group ref={groupRef}>
      <Html transform distanceFactor={4} style={{ pointerEvents: "none" }}>
        <div ref={cardRef} className="om-hero-orbit-card">
          <span className="om-hero-orbit-card-icon">
            <Icon size={16} strokeWidth={2.2} />
          </span>
          <span className="om-hero-orbit-card-label">{label}</span>
        </div>
      </Html>
    </group>
  );
}

function OrbitAssembly({ reduced, centerX, scale }) {
  const total = SERVICES.length;
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current || reduced) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.x = Math.sin(t * 0.05) * 0.1;
    groupRef.current.rotation.z = Math.cos(t * 0.04) * 0.07;
  });

  return (
    <group ref={groupRef}>
      <Core centerX={centerX} scale={scale} />
      <GroundShadow centerX={centerX} scale={scale} />
      {SERVICES.map((service, i) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const entry = useEntryOffset(i, centerX, scale);
        return (
          <group key={service.id}>
            <ConnectorLine index={i} total={total} reduced={reduced} entry={entry} centerX={centerX} scale={scale} />
            <ServiceNode service={service} index={i} total={total} reduced={reduced} entry={entry} centerX={centerX} scale={scale} />
          </group>
        );
      })}
    </group>
  );
}

// Lives inside <Canvas> so it can read the actual rendered canvas size —
// this is what makes the scene shrink-and-center itself on phones instead
// of just being scaled/cropped by the browser.
function SceneContent({ reduced }) {
  const { size } = useThree();
  const compact = size.width < COMPACT_BREAKPOINT;
  const centerX = compact ? 0 : ORBIT_CENTER_X;
  const scale = compact ? 0.9 : 1;

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[centerX + 2.5, 2.5, 3.5]} intensity={17} distance={18} decay={2} color={COLOR_CORE} />
      <pointLight position={[centerX - 3, -1.5, -2.5]} intensity={11} distance={18} decay={2} color={COLOR_MID} />

      <CameraRig reduced={reduced} centerX={centerX} />

      <Sparkles
        count={compact ? 70 : 140}
        scale={compact ? [8, 5, 6] : [16, 7, 8]}
        size={1.4}
        speed={reduced ? 0 : 0.2}
        opacity={0.2}
        color={COLOR_MID}
      />

      <OrbitAssembly reduced={reduced} centerX={centerX} scale={scale} />
    </>
  );
}

export default function ServicesOrbit3D() {
  const reduced = useReducedMotion();

  return (
    <div className="om-hero-canvas-bg" aria-hidden="true">
      <Canvas
        camera={{ position: [0.6, 1.7, 10], fov: 44 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <SceneContent reduced={reduced} />
        <EffectComposer>
          <Bloom intensity={0.55} luminanceThreshold={0.15} luminanceSmoothing={0.4} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </div>
  );
}