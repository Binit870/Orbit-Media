import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * HeroOrnament — 3D "signal core" visual, split-layout version.
 *
 * Renders INTO ITS OWN CONTAINER (not an absolute full-bleed layer), so it
 * lives in one half of a two-column hero and never overlaps the headline.
 * Because of that it can be fully visible/vivid again — no opacity tricks
 * or masks needed to protect text legibility.
 *
 * Concept: a glassy faceted core (the "signal source") with a wireframe
 * shell, three tilted broadcast rings, small orbiting nodes (distribution
 * points), and an ambient particle field.
 *
 * Install once: npm install three
 */
export default function HeroOrnament() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let width = mount.clientWidth;
    let height = mount.clientHeight;

    // ---- Scene / camera / renderer -----------------------------------
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.3, 6.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ---- Palette --------------------------------------------------------
    const colorCore = 0x8b7cff; // violet
    const colorRing = 0x5ee7ff; // cyan
    const colorGlow = 0x6c5ce7;
    const colorNode = 0xd6d1ff;

    // ---- Lighting -------------------------------------------------------
    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambient);

    const keyLight = new THREE.PointLight(colorCore, 18, 22, 2);
    keyLight.position.set(3, 3, 4);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(colorRing, 12, 22, 2);
    rimLight.position.set(-4, -2, -3);
    scene.add(rimLight);

    // ---- Core: faceted glass-like icosahedron + wireframe shell -------
    const coreGroup = new THREE.Group();

    const coreGeo = new THREE.IcosahedronGeometry(1.25, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: colorCore,
      metalness: 0.25,
      roughness: 0.12,
      emissive: colorGlow,
      emissiveIntensity: 0.4,
      transparent: true,
      opacity: 0.68,
      flatShading: true,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    coreGroup.add(core);

    const shellGeo = new THREE.IcosahedronGeometry(1.46, 1);
    const shellMat = new THREE.MeshBasicMaterial({
      color: colorRing,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const shell = new THREE.Mesh(shellGeo, shellMat);
    coreGroup.add(shell);

    scene.add(coreGroup);

    // ---- Broadcast rings --------------------------------------------------
    const ringGroup = new THREE.Group();
    const ringDefs = [
      { radius: 2.05, tube: 0.014, tilt: [Math.PI / 2.6, 0.4, 0], opacity: 0.55 },
      { radius: 2.5, tube: 0.01, tilt: [Math.PI / 1.9, -0.6, 0.3], opacity: 0.35 },
      { radius: 2.95, tube: 0.008, tilt: [Math.PI / 2.3, 1.1, -0.4], opacity: 0.22 },
    ];

    const rings = ringDefs.map(({ radius, tube, tilt, opacity }) => {
      const geo = new THREE.TorusGeometry(radius, tube, 16, 120);
      const mat = new THREE.MeshBasicMaterial({
        color: colorRing,
        transparent: true,
        opacity,
      });
      const ring = new THREE.Mesh(geo, mat);
      ring.rotation.set(...tilt);
      ringGroup.add(ring);
      return ring;
    });
    scene.add(ringGroup);

    // ---- Orbiting distribution nodes ------------------------------------
    const nodeCount = 5;
    const nodeGeo = new THREE.SphereGeometry(0.05, 16, 16);
    const nodeMat = new THREE.MeshBasicMaterial({ color: colorNode });
    const nodes = Array.from({ length: nodeCount }, (_, i) => {
      const mesh = new THREE.Mesh(nodeGeo, nodeMat);
      const ring = rings[i % rings.length];
      mesh.userData = {
        radius: ring.geometry.parameters.radius,
        tilt: ringDefs[i % ringDefs.length].tilt,
        offset: (i / nodeCount) * Math.PI * 2,
        speed: 0.35 + i * 0.05,
      };
      ringGroup.add(mesh);
      return mesh;
    });

    // ---- Ambient particle field ------------------------------------------
    const particleCount = 160;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const radius = 3.3 + Math.random() * 2.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.6;
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.022,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ---- Pointer parallax (scoped to this container only) ---------------
    const pointer = { x: 0, y: 0 };
    const handlePointerMove = (e) => {
      const rect = mount.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    mount.addEventListener("pointermove", handlePointerMove);

    // ---- Resize (observes the container, not the window) ----------------
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      width = entry.contentRect.width;
      height = entry.contentRect.height;
      if (width === 0 || height === 0) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    });
    resizeObserver.observe(mount);

    // ---- Reduced motion ---------------------------------------------------
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // ---- Animate ------------------------------------------------------
    let frameId;
    const clock = new THREE.Clock();

    const animate = () => {
      const t = clock.getElapsedTime();
      const speed = prefersReducedMotion ? 0.15 : 1;

      coreGroup.rotation.y = t * 0.25 * speed;
      coreGroup.rotation.x = Math.sin(t * 0.3) * 0.1 * speed;
      shell.rotation.y = -t * 0.18 * speed;

      rings.forEach((ring, i) => {
        ring.rotation.z = t * (0.1 + i * 0.035) * speed * (i % 2 === 0 ? 1 : -1);
      });

      nodes.forEach((node) => {
        const { radius, tilt, offset, speed: nSpeed } = node.userData;
        const angle = offset + t * nSpeed * speed;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        // apply the same tilt as the ring it travels on
        const v = new THREE.Vector3(x, y, 0);
        const euler = new THREE.Euler(tilt[0], tilt[1], tilt[2]);
        v.applyEuler(euler);
        node.position.copy(v);
      });

      particles.rotation.y = t * 0.03 * speed;

      const targetX = pointer.x * 0.4;
      const targetY = 0.3 - pointer.y * 0.25 + Math.sin(t * 0.6) * 0.06;
      camera.position.x += (targetX - camera.position.x) * 0.04;
      camera.position.y += (targetY - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    // ---- Cleanup ------------------------------------------------------
    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      mount.removeEventListener("pointermove", handlePointerMove);
      mount.removeChild(renderer.domElement);

      [coreGeo, shellGeo, particleGeo, nodeGeo, ...rings.map((r) => r.geometry)].forEach(
        (g) => g.dispose()
      );
      [coreMat, shellMat, particleMat, nodeMat, ...rings.map((r) => r.material)].forEach(
        (m) => m.dispose()
      );
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: 320,
      }}
    />
  );
}