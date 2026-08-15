import { useEffect, useRef } from "react";
import * as THREE from "three";

function OrbitScene({ size = 260 }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const accent = new THREE.Color(
      getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() ||
        "#7c3aed"
    );

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 1.1, 7.2);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    mount.appendChild(renderer.domElement);

    // core sphere
    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.62, 4),
      new THREE.MeshStandardMaterial({
        color: accent,
        emissive: accent,
        emissiveIntensity: 0.55,
        metalness: 0.35,
        roughness: 0.25,
      })
    );
    scene.add(core);

    const coreGlow = new THREE.PointLight(accent, 22, 12);
    coreGlow.position.set(0, 0, 0);
    scene.add(coreGlow);
    scene.add(new THREE.AmbientLight(0xffffff, 0.35));
    const keyLight = new THREE.DirectionalLight(0xffffff, 0.6);
    keyLight.position.set(3, 4, 5);
    scene.add(keyLight);

    // rings + satellites
    const ringGroup = new THREE.Group();
    const ringDefs = [
      { radius: 1.55, tiltX: 0.5, tiltZ: 0.12, speed: 0.35 },
      { radius: 2.05, tiltX: -0.35, tiltZ: 0.55, speed: -0.22 },
      { radius: 2.55, tiltX: 0.95, tiltZ: -0.3, speed: 0.16 },
    ];

    const rings = ringDefs.map((def, i) => {
      const group = new THREE.Group();
      group.rotation.x = def.tiltX;
      group.rotation.z = def.tiltZ;

      const ringGeo = new THREE.TorusGeometry(def.radius, 0.006, 8, 128);
      const ringMat = new THREE.MeshBasicMaterial({
        color: accent,
        transparent: true,
        opacity: 0.32 - i * 0.05,
      });
      group.add(new THREE.Mesh(ringGeo, ringMat));

      const satGeo = new THREE.SphereGeometry(0.06, 16, 16);
      const satMat = new THREE.MeshStandardMaterial({
        color: accent,
        emissive: accent,
        emissiveIntensity: 0.9,
      });
      const sat = new THREE.Mesh(satGeo, satMat);
      sat.position.set(def.radius, 0, 0);
      group.add(sat);

      ringGroup.add(group);
      return { group, speed: def.speed };
    });
    scene.add(ringGroup);

    // ambient particle field
    const particleCount = 90;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const r = 3.4 + Math.random() * 1.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(
      particleGeo,
      new THREE.PointsMaterial({ color: accent, size: 0.02, transparent: true, opacity: 0.35 })
    );
    scene.add(particles);

    let raf;
    let t = 0;
    const clock = new THREE.Clock();

    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    const animate = () => {
      const dt = Math.min(clock.getDelta(), 0.05);
      t += dt;

      core.rotation.y += dt * 0.4;
      core.rotation.x += dt * 0.15;
      ringGroup.rotation.y += dt * 0.12;

      rings.forEach((r) => {
        r.group.rotation.y += dt * r.speed;
      });
      particles.rotation.y += dt * 0.03;

      const scale = 0.94 + Math.sin(t * 1.6) * 0.02;
      core.scale.setScalar(scale);

      renderer.render(scene, camera);
      if (!prefersReducedMotion) raf = requestAnimationFrame(animate);
    };

    animate();
    if (prefersReducedMotion) renderer.render(scene, camera);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      renderer.dispose();
      scene.traverse((obj) => {
        obj.geometry?.dispose?.();
        if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
        else obj.material?.dispose?.();
      });
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{ width: size, height: size }}
    />
  );
}


export default OrbitScene;
