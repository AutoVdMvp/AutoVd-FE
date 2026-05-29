import type { SVGProps, ComponentType } from "react";

export interface TutorialStepData {
  id: string;
  title: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  description: [string, string];
  hint: string;
}
