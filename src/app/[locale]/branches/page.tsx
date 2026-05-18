"use client";

import { useTranslations } from "next-intl";
import StatsCards from "@/components/StatsCards";
import BranchesTable from "@/components/tables/BranchesTable";
import { StatItem } from "@/types/stats";
import branchIcon from "@/../public/images/totalBranch.svg";
import orderIcon from "@/../public/images/ordersTod.svg";
import revenueIcon from "@/../public/images/RevTod.svg";
import activeBranchIcon from "@/../public/images/ActiveBran.svg";

export default function BranchesPage() {
  const t = useTranslations("Branches");

  const branchStats: StatItem[] = [
    { title: t("totalBranches"), value: "12", change: "2", type: "up", image: branchIcon },
    { title: t("ordersToday"), value: "328", change: "15 %", type: "up", image: orderIcon },
    { title: t("revenuesToday"), value: "24.500.20 L.E", change: "15 %", type: "up", image: revenueIcon },
    { title: t("activeBranches"), value: "328", change: null, type: null, image: activeBranchIcon },
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

      <StatsCards stats={branchStats} />
      <BranchesTable />
    </main>
  );
}
