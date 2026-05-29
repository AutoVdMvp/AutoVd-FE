import { Icons } from "@/shared/icons";
import type { TutorialStepData } from "./types";

export const TUTORIAL_STEPS: TutorialStepData[] = [
  {
    id: "intro",
    title: "AutoVD 소개",
    Icon: Icons.Video,
    description: [
      "AutoVD는 기사 링크를 입력하면",
      "자동으로 영상을 생성해주는 서비스입니다.",
    ],
    hint: "몇 가지 간단한 단계를 통해 시작해봐요.",
  },
  {
    id: "input",
    title: "링크 입력하기",
    Icon: Icons.Enter,
    description: [
      "홈 화면의 입력창에 뉴스 기사 URL을 붙여넣고",
      "Enter를 누르면 영상 생성이 시작됩니다.",
    ],
    hint: "지원 형식: 뉴스 기사, 블로그 포스트",
  },
  {
    id: "result",
    title: "영상 확인하기",
    Icon: Icons.Home,
    description: [
      "생성이 완료되면 영상 목록에서 결과를 확인하고",
      "다운로드할 수 있습니다.",
    ],
    hint: "생성된 영상은 언제든지 다시 볼 수 있어요.",
  },
];
