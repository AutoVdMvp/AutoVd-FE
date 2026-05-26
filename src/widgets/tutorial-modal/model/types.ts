import type { ComponentType } from "react";

export interface TutorialStepMeta {
  id: string;
  title: string;
  component: ComponentType;
}
