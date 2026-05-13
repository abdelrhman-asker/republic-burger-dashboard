// components/StatsCards.tsx
import Image, { StaticImageData } from "next/image";
import stat1 from "@/./../public/images/stat1.svg";
import stat2 from "@/./../public/images/stat2.svg";
import stat3 from "@/./../public/images/stat3.svg";
import stat4 from "@/./../public/images/stat4.svg";
import redarrdown from "@/./../public/images/redarrdown.svg";
import greenarrUp from "@/./../public/images/greenarrUp.svg";
import { useTranslations } from "next-intl";
import { StatItem } from "@/types/stats";

type StatsCardsProps = {
  stats?: StatItem[];
};

export default function StatsCards({ stats }: StatsCardsProps) {
  const t = useTranslations("statsCards");

  const defaultStats: StatItem[] = [
    { title: t("ordersTotal"), value: "328", change: "15 %", type: "up", image: stat1 },
    { title: t("revenues"), value: "24.500.20 L.E", change: "15 %", type: "up", image: stat2 },
    { title: t("refundRequests"), value: "8", change: "4 %", type: "down", image: stat3 },
    { title: t("pendingOrders"), value: "328", change: "4 %", type: "down", image: stat4 },
  ];

  const items = stats ?? defaultStats;

  return (
    <div className="mt-8 flex max-w-[95%] gap-[25px] w-full flex-wrap ">
      {items.map((item) => {
        const isUp = item.type === "up";

        return (
          <div
            key={item.title}
            className="rounded-[12px] flex-1 border border-[#DEDEDE] bg-white px-6 py-6 min-h-[148px]"
          >
            <div className="flex items-center gap-2">
              <div className="flex h-[26px] w-[26px] items-center justify-center rounded-[5px] bg-[#FF8A00]">
                <Image src={item.image} alt={item.title} />
              </div>
              <h3 className="text-[16px] font-bold text-mainBlack">
                {item.title}
              </h3>
            </div>

            <h2 className="mt-6 text-[28px] font-semibold text-mainBlack">
              {item.value}
            </h2>
            {item.change && (
            <div className="mt-2 flex items-center gap-2 text-[11px]">
              <span
                className="flex items-center gap-1/2 text-[12px] font-medium"
                style={{ color: isUp ? "#4CAF50" : "#F44336" }}
              >
                {isUp ? (
                  <Image src={greenarrUp} alt="up" />
                ) : (
                  <Image src={redarrdown} alt="down" />
                )}{" "}
                {item.change}
              </span>
              <span className="text-[#787878] text-[12px] font-normal">
                {t("changeDate")}
              </span>
            </div>
            )}

          </div>
        );
      })}
    </div>
  );
}