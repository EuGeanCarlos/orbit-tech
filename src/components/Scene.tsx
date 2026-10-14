import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Group } from "three";

function Core({ reduced }: { reduced: boolean }) {
  const group = useRef<Group>(null);
  const [hover, setHover] = useState(false);
  useFrame(({ clock, pointer }) => {
    if (!group.current || reduced) return;
    group.current.rotation.y +=
      (pointer.x * 0.35 - group.current.rotation.y) * 0.03;
    group.current.rotation.x +=
      (pointer.y * 0.2 - group.current.rotation.x) * 0.03;
    group.current.position.y = Math.sin(clock.elapsedTime * 0.6) * 0.09;
  });
  return (
    <group
      ref={group}
      rotation={[0.15, 0, -0.2]}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <mesh rotation={[0.5, 0.6, 0.3]} scale={hover ? 1.07 : 1}>
        <icosahedronGeometry args={[1.12, 1]} />
        <meshPhysicalMaterial
          color="#9c80ff"
          metalness={0.65}
          roughness={0.17}
          clearcoat={1}
        />
      </mesh>
      {[0, 1, 2].map((n) => (
        <mesh key={n} rotation={[Math.PI / 2 + n * 0.44, n * 0.7, n * 0.3]}>
          <torusGeometry args={[1.72 + n * 0.13, 0.026, 12, 100]} />
          <meshStandardMaterial
            color={n === 1 ? "#66d9ff" : "#b9a3ff"}
            emissive={n === 1 ? "#116baf" : "#5330ac"}
            emissiveIntensity={1.2}
            metalness={0.8}
            roughness={0.25}
          />
        </mesh>
      ))}
      {Array.from({ length: 16 }, (_, i) => {
        const a = (i * Math.PI * 2) / 16;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(a) * 2.15,
              Math.sin(a * 3) * 0.65,
              Math.sin(a) * 1.75,
            ]}
          >
            <sphereGeometry args={[i % 4 === 0 ? 0.09 : 0.035, 12, 12]} />
            <meshStandardMaterial
              color="#b6ceff"
              emissive="#6574ff"
              emissiveIntensity={1.2}
            />
          </mesh>
        );
      })}
    </group>
  );
}
export default function Scene({ reduced }: { reduced: boolean }) {
  const container = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    if (container.current) observer.observe(container.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={container} style={{ width: "100%", height: "100%" }}>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0.3, 6], fov: 45 }}
        frameloop={reduced || !visible ? "demand" : "always"}
        gl={{ alpha: true, antialias: true }}
        aria-label="Núcleo geométrico tridimensional conectado por órbitas luminosas"
      >
        <ambientLight intensity={1.1} />
        <directionalLight position={[3, 4, 4]} intensity={3} color="#e8e2ff" />
        <pointLight position={[-3, -1, 2]} intensity={20} color="#6250ff" />
        <pointLight position={[3, 0, -2]} intensity={15} color="#21baff" />
        <Core reduced={reduced} />
      </Canvas>
    </div>
  );
}
