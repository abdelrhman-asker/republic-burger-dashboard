"use client";

import { useTranslations } from "next-intl";
import StatsCards from "@/components/StatsCards";
import PromotionalBannersTable from "@/components/tables/Promotionalbannerstable";
import { StatItem } from "@/types/stats";
import impressionsIcon from "@/.././public/images/copu1.svg";
import ctrIcon from "@/.././public/images/copu2.svg";
import conversionIcon from "@/.././public/images/copu3.svg";

export default function PromotionalBannersPage() {
  const t = useTranslations("PromotionalBanners");

  const bannerStats: StatItem[] = [
    { title: t("totalImpressions"), value: "124.5k", change: "15 %", type: "up", image: impressionsIcon },
    { title: t("avgCTR"),           value: "3.4%",   change: "15 %", type: "up", image: ctrIcon         },
    { title: t("conversionRate"),   value: "1.2%",   change: "15 %", type: "up", image: conversionIcon  },
  ];

  return (
    <main className="flex-1 flex flex-col p-8 px-4">
      <div className="flex items-start justify-between max-w-[80%] mb-8">
        <div>
          <h1 className="font-headFont font-extrabold text-[28px]">
            {t("mainTitle")}
          </h1>
        </div>
      </div>

      <StatsCards stats={bannerStats} />
      <PromotionalBannersTable />
    </main>
  );
}