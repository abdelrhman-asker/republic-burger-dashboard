import { StaticImageData } from "next/image";

export type StatItem = {
  title: string;
  value: string;
  change: string;
  type: "up" | "down";
  image: StaticImageData;
};