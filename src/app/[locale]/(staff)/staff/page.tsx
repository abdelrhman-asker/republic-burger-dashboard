"use client";

import { useTranslations } from "next-intl";
import StatsCards from "@/components/StatsCards";
import StaffDirectoryTable from "@/components/tables/Staffdirectorytable";
import { StatItem } from "@/types/stats";
import activeStaffIcon   from "@/.././public/images/copu1.svg";
import inactiveStaffIcon from "@/.././public/images/copu2.svg";

export default function StaffDirectoryPage() {
  const t = useTranslations("StaffDirectory");

  const staffStats: StatItem[] = [
    { title: t("activeStaff"),   value: "111", change: null,  type: null,   image: activeStaffIcon   },
    { title: t("inactiveStaff"), value: "14",  change: null,  type: null,   image: inactiveStaffIcon },
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

      <StatsCards stats={staffStats} />
      <StaffDirectoryTable />
    </main>
  );
}