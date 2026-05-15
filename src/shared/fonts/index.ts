import { Kavoon, Stack_Sans_Text } from "next/font/google";

const _kavoon = Kavoon({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const _stackLight = Stack_Sans_Text({
  subsets: ["latin"],
  weight: "300",
  display: "swap",
});
const _stackDefault = Stack_Sans_Text({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});
const _stackBold = Stack_Sans_Text({
  subsets: ["latin"],
  weight: "700",
  display: "swap",
});

export const Font = {
  kavoon: _kavoon,
  stackSans: {
    light: _stackLight,
    default: _stackDefault,
    bold: _stackBold,
  },
} as const;
