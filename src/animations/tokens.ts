export const motionTokens = {
  ease: [0.23, 1, 0.32, 1] as const,
  ui: 0.2,
  entrance: 0.7,
  stagger: 0.05,
};
export interface SceneState {
  progress: number;
  pointerX: number;
  pointerY: number;
}
