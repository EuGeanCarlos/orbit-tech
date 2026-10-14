import {
  Component,
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import type { SceneState } from "../../animations/tokens";
import type { ServiceId } from "../../data/services";
const Scene = lazy(() => import("../../scenes/ExperienceScene"));
class Boundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? <Fallback /> : this.props.children;
  }
}
function Fallback() {
  return (
    <div className="scene-fallback" aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
      <i />
    </div>
  );
}
export default function SceneViewport({
  variant = "hero",
  state,
  reduced = false,
}: {
  variant?: "hero" | ServiceId;
  state?: RefObject<SceneState>;
  reduced?: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const nearObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNear(true);
      },
      { rootMargin: "350px" },
    );
    const visibleObserver = new IntersectionObserver(([entry]) =>
      setActive(entry.isIntersecting),
    );
    nearObserver.observe(el);
    visibleObserver.observe(el);
    return () => {
      nearObserver.disconnect();
      visibleObserver.disconnect();
    };
  }, []);
  return (
    <div
      ref={root}
      className={`scene-viewport scene-${variant}`}
      aria-hidden="true"
    >
      <Boundary>
        <Suspense fallback={<Fallback />}>
          {near ? (
            <Scene
              variant={variant}
              state={state}
              active={active}
              reduced={reduced}
            />
          ) : (
            <Fallback />
          )}
        </Suspense>
      </Boundary>
    </div>
  );
}
