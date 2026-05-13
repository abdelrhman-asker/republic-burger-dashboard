import { StaticImageData } from "next/image";

export type StatItem = {
  title: string;
  value: string;
  change: string | null;
  type: "up" | "down" | null;
  image: StaticImageData;
};