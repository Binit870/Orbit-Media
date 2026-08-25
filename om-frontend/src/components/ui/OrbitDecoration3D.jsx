import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

// Compact companion to ServicesOrbit3D — same glowing-core-with-orbiting-nodes
// language as the hero, shrunk to a self-contained square canvas so it can
// flank the loader's content column. No camera intro/drift, no HTML labels —
// purely decorative, tuned to stay light on GPU cost.

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

function Core({ reduced }) {
  const coreRef = useRef();
  const shellRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const speed = reduced ? 0.12 : 1;
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.22 * speed;
      coreRef.current.rotation.x = Math.sin(t * 0.3) * 0.12 * speed;
      coreRef.current.scale.setScalar(1 + Math.sin(t * 0.8) * 0.04);
    }
    if (shellRef.current) {
      shellRef.current.rotation.y = -t * 0.16 * speed;
      shellRef.current.rotation.x = Math.sin(t * 0.24) * 0.06 * speed;
    }
  });

  return (
    <group>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.85, 1]} />
        <meshStandardMaterial
          color={COLOR_CORE}
          metalness={0.3}
          roughness={0.1}
          emissive={COLOR_DEEP}
          emissiveIntensity={0.5}
          transparent
          opacity={0.78}
          flatShading
        />
      </mesh>
      <mesh ref={shellRef}>
        <icosahedronGeometry args={[1.04, 1]} />
        <meshBasicMaterial color={COLOR_MID} wireframe transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

function OrbitRing({ radius, tilt, speed, phase, nodeCount, reduced }) {
  const ringRef = useRef();
  const nodes = useMemo(() => Array.from({ length: nodeCount }), [nodeCount]);

  useFrame((state) => {
    if (!ringRef.current) return;
    const t = state.clock.getElapsedTime();
    ringRef.current.rotation.z = phase + t * (reduced ? speed * 0.1 : speed);
  });

  return (
    <group rotation={[tilt, 0, 0]}>
      <group ref={ringRef}>
        {nodes.map((_, i) => {
          const a = (i / nodeCount) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(a) * radius, Math.sin(a) * radius, 0]}>
              <sphereGeometry args={[0.07, 12, 12]} />
              <meshStandardMaterial
                color={COLOR_MID}
                emissive={COLOR_CORE}
                emissiveIntensity={0.9}
              />
            </mesh>
          );
        })}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[radius, 0.004, 8, 64]} />
          <meshBasicMaterial color={COLOR_MID} transparent opacity={0.22} />
        </mesh>
      </group>
    </group>
  );
}

function Scene({ reduced }) {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current || reduced) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.x = Math.sin(t * 0.06) * 0.12;
    groupRef.current.rotation.y = t * 0.05;
  });

  return (
    <>
      <ambientLight intensity={0.55} />
      <pointLight position={[2, 2, 3]} intensity={16} distance={12} decay={2} color={COLOR_CORE} />
      <pointLight position={[-2, -1.5, -2]} intensity={10} distance={12} decay={2} color={COLOR_MID} />

      <Sparkles count={45} scale={[4, 4, 4]} size={1.2} speed={reduced ? 0 : 0.2} opacity={0.22} color={COLOR_MID} />

      <group ref={groupRef}>
        <Core reduced={reduced} />
        <OrbitRing radius={1.6} tilt={0.5} speed={0.16} phase={0} nodeCount={3} reduced={reduced} />
        <OrbitRing radius={1.15} tilt={1.15} speed={-0.22} phase={1.2} nodeCount={2} reduced={reduced} />
      </group>
    </>
  );
}

export default function OrbitDecoration3D({ size = 220 }) {
  const reduced = useReducedMotion();

  return (
    <div style={{ width: size, height: size }} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0.4, 5.2], fov: 42 }}
        dpr={[1, 1.75]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <Scene reduced={reduced} />
        <EffectComposer>
          <Bloom intensity={0.6} luminanceThreshold={0.15} luminanceSmoothing={0.4} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
