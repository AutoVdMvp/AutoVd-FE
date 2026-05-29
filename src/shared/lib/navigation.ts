import type { SVGProps, ComponentType } from "react";
import { Icons } from "@/shared/icons";

export interface NavLinkRoute {
  kind: "link";
  id: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  href: string;
}

export interface NavActionRoute {
  kind: "action";
  id: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
}

export const APP_NAV_ROUTES: NavLinkRoute[] = [
  { kind: "link", id: "1", Icon: Icons.Home, label: "홈", href: "/" },
  {
    kind: "link",
    id: "2",
    Icon: Icons.Video,
    label: "영상 목록",
    href: "/videos",
  },
  {
    kind: "link",
    id: "3",
    Icon: Icons.User,
    label: "그 외 무언가",
    href: "/other",
  },
];

export const APP_ACTION_ROUTES: NavActionRoute[] = [
  { kind: "action", id: "tutorial", Icon: Icons.LightBulb, label: "튜토리얼" },
];
