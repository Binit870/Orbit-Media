import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * ServicesCore — a smaller, quieter sibling of HeroOrnament.
 *
 * Just the glassy faceted core + wireframe shell, slowly rotating, sized
 * to its own container via ResizeObserver. Used as the centerpiece of
 * ServicesOrbit, where the five service cards (HTML) and connector
 * lines (SVG) live outside this component and are positioned around it.
 *
 * Install once: npm install three
 */
export default function ServicesCore() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let width = mount.clientWidth;
    let height = mount.clientHeight;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.2, 5.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const colorCore = 0x8b7cff;
    const colorRing = 0x5ee7ff;
    const colorGlow = 0x6c5ce7;

    const ambient = new THREE.AmbientLight(0xffffff, 0.55);
    scene.add(ambient);

    const keyLight = new THREE.PointLight(colorCore, 16, 18, 2);
    keyLight.position.set(2.5, 2.5, 3.5);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(colorRing, 10, 18, 2);
    rimLight.position.set(-3, -1.5, -2.5);
    scene.add(rimLight);

    const coreGroup = new THREE.Group();

    const coreGeo = new THREE.IcosahedronGeometry(1.05, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: colorCore,
      metalness: 0.25,
      roughness: 0.12,
      emissive: colorGlow,
      emissiveIntensity: 0.4,
      transparent: true,
      opacity: 0.72,
      flatShading: true,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    coreGroup.add(core);

    const shellGeo = new THREE.IcosahedronGeometry(1.24, 1);
    const shellMat = new THREE.MeshBasicMaterial({
      color: colorRing,
      wireframe: true,
      transparent: true,
      opacity: 0.32,
    });
    const shell = new THREE.Mesh(shellGeo, shellMat);
    coreGroup.add(shell);

    scene.add(coreGroup);

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

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let frameId;
    const clock = new THREE.Clock();

    const animate = () => {
      const t = clock.getElapsedTime();
      const speed = prefersReducedMotion ? 0.15 : 1;

      coreGroup.rotation.y = t * 0.2 * speed;
      coreGroup.rotation.x = Math.sin(t * 0.3) * 0.08 * speed;
      shell.rotation.y = -t * 0.14 * speed;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      mount.removeChild(renderer.domElement);
      [coreGeo, shellGeo].forEach((g) => g.dispose());
      [coreMat, shellMat].forEach((m) => m.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{ position: "absolute", inset: 0 }}
    />
  );
}