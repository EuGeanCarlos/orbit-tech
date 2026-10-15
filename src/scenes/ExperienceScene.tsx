import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { useMemo, useRef, type RefObject } from "react";
import {
  Group,
  MathUtils,
  Quaternion,
  Mesh,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  SphereGeometry,
  Vector3,
} from "three";
import type { SceneState } from "../animations/tokens";
import type { ServiceId } from "../data/services";

interface Props {
  variant: "hero" | "story" | ServiceId;
  state?: RefObject<SceneState>;
  reduced: boolean;
  active: boolean;
}
const colors = [
  "#8855ff",
  "#ffbe3d",
  "#00c896",
  "#e841a0",
  "#465cff",
  "#9cabff",
];
function HeroObjects({
  state,
  reduced,
}: {
  state?: RefObject<SceneState>;
  reduced: boolean;
}) {
  const group = useRef<Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const entered = useRef<number | null>(null);
  const { viewport, camera, size } = useThree();
  const mobile = size.width < 650;
  const small = viewport.width < 9;
  const positions = useMemo(
    () =>
      mobile
        ? [
            [-1.3, 2.65, -1],
            [1.25, 2.8, -2],
            [-1.1, -2.4, -0.5],
            [1.05, -2.55, -1],
          ]
        : small
          ? [
              [-2.8, 3.1, -1],
              [3, 3.2, -2],
              [-2.9, -2.5, 0],
              [2.7, -2.3, -1],
              [-1.5, -3.8, -2],
              [1.8, 3.9, -2],
            ]
          : [
              [-5.1, 1.8, 0],
              [5.4, 2.4, -1],
              [-5.1, -2.5, -0.5],
              [4.7, -2.3, 0],
              [-2.3, 3.5, -2],
              [2.9, -3.3, -1],
            ],
    [small, mobile],
  );
  useFrame(({ clock }, delta) => {
    if (!group.current) return;
    if (entered.current === null) entered.current = clock.elapsedTime;
    const p = reduced ? 0 : (state?.current.progress ?? 0);
    const t = reduced ? 0 : clock.elapsedTime;
    pointer.current.x = MathUtils.damp(
      pointer.current.x,
      reduced ? 0 : (state?.current.pointerX ?? 0),
      5,
      delta,
    );
    pointer.current.y = MathUtils.damp(
      pointer.current.y,
      reduced ? 0 : (state?.current.pointerY ?? 0),
      5,
      delta,
    );
    const { x, y } = pointer.current;
    group.current.children.forEach((obj, i) => {
      const base = positions[i];
      const spread = 1 - p * 0.32;
      obj.position.set(
        base[0] * spread + x * (i % 2 ? -0.16 : 0.22),
        base[1] +
          Math.sin(t * 0.35 + i) * 0.12 -
          p * (i % 2 ? 2.2 : -1.6) +
          y * 0.12,
        base[2] + p * 1.8,
      );
      obj.rotation.set(
        0.35 + Math.sin(t * 0.16 + i) * 0.14 + p * 0.65,
        0.3 + i * 0.6 + t * 0.035 + p * 0.9,
        Math.sin(t * 0.13 + i) * 0.18,
      );
      const entrance = reduced
        ? 1
        : MathUtils.smoothstep(
            (clock.elapsedTime - entered.current! - i * 0.05) / 0.7,
            0,
            1,
          );
      const s =
        (mobile ? 0.48 : i < 4 ? (small ? 0.68 : 0.85) : 0.45) *
        (1 + p * 0.16) *
        (0.95 + entrance * 0.05);
      obj.scale.setScalar(s);
      const mesh = obj.children[0] as Mesh;
      const material = mesh.material as MeshPhysicalMaterial;
      material.transparent = entrance < 1;
      material.opacity = entrance;
    });
    camera.position.z = MathUtils.damp(
      camera.position.z,
      small ? 10 : 9 - p * 0.65,
      5,
      delta,
    );
    camera.lookAt(0, 0, 0);
  });
  return (
    <group ref={group}>
      {positions.map((_, i) => (
        <group key={i}>
          {i === 0 ? (
            <RoundedBox args={[1.6, 1.6, 1.6]} radius={0.32} smoothness={4}>
              <meshPhysicalMaterial
                color={colors[i]}
                metalness={0.25}
                roughness={0.24}
                clearcoat={1}
              />
            </RoundedBox>
          ) : i === 1 ? (
            <mesh>
              <torusGeometry args={[0.8, 0.29, 16, 64]} />
              <meshPhysicalMaterial
                color={colors[i]}
                metalness={0.45}
                roughness={0.2}
                clearcoat={1}
              />
            </mesh>
          ) : i === 2 ? (
            <mesh>
              <octahedronGeometry args={[1.22, 0]} />
              <meshPhysicalMaterial
                color={colors[i]}
                metalness={0.2}
                roughness={0.18}
                clearcoat={1}
              />
            </mesh>
          ) : i === 3 ? (
            <mesh>
              <torusKnotGeometry args={[0.65, 0.23, 72, 12, 2, 3]} />
              <meshPhysicalMaterial
                color={colors[i]}
                metalness={0.3}
                roughness={0.26}
                clearcoat={1}
              />
            </mesh>
          ) : (
            <RoundedBox args={[1.3, 1.3, 1.3]} radius={0.3} smoothness={3}>
              <meshPhysicalMaterial
                color={colors[i]}
                metalness={0.35}
                roughness={0.28}
              />
            </RoundedBox>
          )}
        </group>
      ))}
    </group>
  );
}
function BrowserModel({ dashboard }: { dashboard: boolean }) {
  return (
    <group rotation={[-0.12, -0.28, -0.06]}>
      <RoundedBox args={[4.4, 2.8, 0.18]} radius={0.16} smoothness={3}>
        <meshStandardMaterial
          color="#292b37"
          metalness={0.5}
          roughness={0.35}
        />
      </RoundedBox>
      <mesh position={[0, -0.05, 0.12]}>
        <planeGeometry args={[4.1, 2.32]} />
        <meshBasicMaterial color="#101118" />
      </mesh>
      {[-1.85, -1.65, -1.45].map((x, i) => (
        <mesh key={x} position={[x, 1.18, 0.15]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshBasicMaterial color={["#e841a0", "#ffbe3d", "#00c896"][i]} />
        </mesh>
      ))}
      {dashboard ? (
        <>
          <mesh position={[-1.65, -0.05, 0.16]}>
            <planeGeometry args={[0.5, 2.1]} />
            <meshBasicMaterial color="#202134" />
          </mesh>
          {[0.5, 0.9, 0.7, 1.3, 1, 1.55, 0.95].map((h, i) => (
            <RoundedBox
              key={i}
              args={[0.24, h, 0.08]}
              radius={0.03}
              position={[-0.85 + i * 0.41, -0.9 + h / 2, 0.2]}
            >
              <meshStandardMaterial
                color={i % 2 ? "#465cff" : "#9ca7ff"}
                emissive="#202058"
                emissiveIntensity={0.3}
              />
            </RoundedBox>
          ))}
          {[-0.6, 0.55, 1.65].map((x) => (
            <RoundedBox
              key={x}
              args={[0.9, 0.42, 0.05]}
              radius={0.05}
              position={[x, 0.75, 0.2]}
            >
              <meshStandardMaterial color="#343646" />
            </RoundedBox>
          ))}
        </>
      ) : (
        <>
          <RoundedBox
            args={[1.7, 0.2, 0.04]}
            radius={0.04}
            position={[-0.8, 0.5, 0.18]}
          >
            <meshBasicMaterial color="#e6e2f7" />
          </RoundedBox>
          <RoundedBox
            args={[1.3, 0.12, 0.04]}
            radius={0.04}
            position={[-1, 0.1, 0.18]}
          >
            <meshBasicMaterial color="#727486" />
          </RoundedBox>
          <RoundedBox
            args={[0.9, 0.26, 0.04]}
            radius={0.05}
            position={[-1.2, -0.5, 0.18]}
          >
            <meshBasicMaterial color="#8855ff" />
          </RoundedBox>
          <mesh position={[1.1, 0.05, 0.65]} rotation={[0.4, 0.2, 0.5]}>
            <torusKnotGeometry args={[0.5, 0.17, 48, 10]} />
            <meshPhysicalMaterial
              color="#bb9aff"
              metalness={0.4}
              roughness={0.22}
            />
          </mesh>
        </>
      )}
    </group>
  );
}
function Network({ ai }: { ai: boolean }) {
  const count = ai ? 14 : 5;
  const dot = useMemo(() => new SphereGeometry(ai ? 0.09 : 0.18, 12, 12), [ai]);
  const material = useMemo(
    () =>
      new MeshStandardMaterial({
        color: ai ? "#e841a0" : "#00c896",
        emissive: ai ? "#6d1548" : "#005c46",
        emissiveIntensity: 0.8,
        metalness: 0.4,
        roughness: 0.25,
      }),
    [ai],
  );
  const points = useMemo(
    () =>
      Array.from({ length: count }, (_, i) =>
        ai
          ? new Vector3(
              Math.cos(i * 2.4) * (1.2 + (i % 3) * 0.35),
              Math.sin(i * 2.4) * 1.4,
              Math.sin(i * 1.7) * 0.9,
            )
          : new Vector3((i - 2) * 1.05, Math.sin(i * 1.5) * 0.5, 0),
      ),
    [ai, count],
  );
  return (
    <group>
      {ai && (
        <mesh rotation={[0.4, 0.3, 0.6]}>
          <icosahedronGeometry args={[0.78, 0]} />
          <meshPhysicalMaterial
            color="#b26be7"
            roughness={0.2}
            metalness={0.45}
            clearcoat={1}
          />
        </mesh>
      )}
      {points.map((point, i) => (
        <group key={i}>
          <mesh geometry={dot} material={material} position={point} />
          {i > 0 && (
            <Connection
              a={point}
              b={ai ? new Vector3() : points[i - 1]}
              color={ai ? "#71385b" : "#176d59"}
            />
          )}
        </group>
      ))}
    </group>
  );
}
function Connection({
  a,
  b,
  color,
}: {
  a: Vector3;
  b: Vector3;
  color: string;
}) {
  const middle = useMemo(() => a.clone().add(b).multiplyScalar(0.5), [a, b]);
  const length = a.distanceTo(b);
  const orientation = useMemo(
    () =>
      new Quaternion().setFromUnitVectors(
        new Vector3(0, 1, 0),
        b.clone().sub(a).normalize(),
      ),
    [a, b],
  );
  return (
    <mesh quaternion={orientation} position={middle}>
      <cylinderGeometry args={[0.012, 0.012, length, 6]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}
function ServiceObject({
  variant,
  reduced,
}: {
  variant: ServiceId;
  reduced: boolean;
}) {
  const group = useRef<Group>(null);
  useFrame(({ clock, pointer }, delta) => {
    if (!group.current || reduced) return;
    group.current.rotation.y = MathUtils.damp(
      group.current.rotation.y,
      pointer.x * 0.16,
      4,
      delta,
    );
    group.current.rotation.x = MathUtils.damp(
      group.current.rotation.x,
      -pointer.y * 0.1,
      4,
      delta,
    );
    group.current.position.y = Math.sin(clock.elapsedTime * 0.5) * 0.08;
  });
  return (
    <group ref={group}>
      {variant === "web" || variant === "systems" ? (
        <BrowserModel dashboard={variant === "systems"} />
      ) : (
        <Network ai={variant === "ai"} />
      )}
    </group>
  );
}
function ScrollWorld({
  state,
  reduced,
}: {
  state?: RefObject<SceneState>;
  reduced: boolean;
}) {
  const world = useRef<Group>(null);
  const { camera, size } = useThree();
  const cameraDistance = Math.max(
    6.8,
    2.8 / (Math.tan(Math.PI / 8) * (size.width / size.height)),
  );
  useFrame(({ clock }, delta) => {
    if (!world.current) return;
    const progress = reduced ? 0 : (state?.current.progress ?? 0);
    const chapter = Math.min(3, Math.floor(progress * 4));
    const blend =
      chapter === 3
        ? 0
        : MathUtils.smoothstep((progress * 4 - chapter - 0.65) / 0.35, 0, 1);
    world.current.children.forEach((object, index) => {
      const weight =
        index === chapter ? 1 - blend : index === chapter + 1 ? blend : 0;
      object.visible = weight > 0.001;
      object.position.set(
        (index - chapter - blend) * 3.8,
        reduced ? 0 : Math.sin(clock.elapsedTime * 0.4) * 0.06,
        -(1 - weight) * 2,
      );
      object.scale.setScalar(0.85 + weight * 0.15);
      object.rotation.y =
        (index - chapter - blend) * 0.8 +
        (reduced ? 0 : (state?.current.pointerX ?? 0) * 0.14);
      object.rotation.z = (index - chapter - blend) * 0.13;
    });
    camera.position.z = MathUtils.damp(
      camera.position.z,
      cameraDistance - Math.sin(progress * Math.PI) * 0.6,
      5,
      delta,
    );
    camera.position.x = MathUtils.damp(
      camera.position.x,
      reduced ? 0 : (state?.current.pointerX ?? 0) * 0.15,
      5,
      delta,
    );
    camera.lookAt(0, 0, 0);
  });
  return (
    <group ref={world}>
      <group>
        <BrowserModel dashboard={false} />
      </group>
      <group>
        <BrowserModel dashboard />
      </group>
      <group>
        <Network ai={false} />
      </group>
      <group>
        <Network ai />
      </group>
    </group>
  );
}
export default function ExperienceScene({
  variant,
  state,
  reduced,
  active,
}: Props) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, variant === "hero" ? 9 : 6.5], fov: 45 }}
      frameloop={reduced || !active ? "demand" : "always"}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      fallback={
        <div className="scene-fallback">
          <i />
          <i />
          <i />
        </div>
      }
    >
      <ambientLight intensity={1.2} />
      <directionalLight position={[3, 6, 5]} intensity={3.5} color="#ffffff" />
      <directionalLight position={[-5, 0, 3]} intensity={1.7} color="#b2b4ff" />
      <pointLight position={[1, -4, 4]} intensity={18} color="#6e75ff" />
      {variant === "hero" ? (
        <HeroObjects state={state} reduced={reduced} />
      ) : variant === "story" ? (
        <ScrollWorld state={state} reduced={reduced} />
      ) : (
        <ServiceObject variant={variant} reduced={reduced} />
      )}
    </Canvas>
  );
}
