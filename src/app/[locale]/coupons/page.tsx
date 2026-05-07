"use client";

import StatsCards from "@/components/StatsCards";
import CouponsTable from "@/components/tables/CouponsTable";
import { useTranslations } from "next-intl";
import { StatItem } from "@/types/stats";
import copu1 from "@/./../public/images/copu1.svg";
import copu2 from "@/./../public/images/copu2.svg";
import copu3 from "@/./../public/images/copu3.svg";
import copu4 from "@/./../public/images/copu4.svg";

export default function CouponsPage() {
  const t = useTranslations("Coupons");

  const couponStats: StatItem[] = [
    { title: t("totalActive"),      value: "19",         change: "6 %",  type: "up",   image: copu1 },
    { title: t("redemptionRate"),   value: "12.4%",      change: "High", type: "up",   image: copu2 },
    { title: t("totalSavings"),     value: "4,285 L.E",  change: "16 %", type: "up",   image: copu3 },
    { title: t("expiringSoon"),     value: "3",          change: "4 %",  type: "down", image: copu4 },
  ];

  return (
    <main className="flex-1 flex flex-col p-8 px-4">
      <div className="flex items-start justify-between max-w-[80%]">
        <div>
          <h1 className="font-headFont font-extrabold text-[28px]">
            {t("mainTitle")}
          </h1>
        </div>
      </div>

      <StatsCards stats={couponStats} />
      <CouponsTable />
    </main>
  );
}