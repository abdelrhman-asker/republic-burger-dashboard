"use client";

import { useState } from "react";
import arrDown from "@/./../public/images/arrdownBlack.svg";
import Image from "next/image";
import StatsCards from "@/components/StatsCards";
import { useTranslations } from "next-intl";
import DashboardCharts from "@/components/DashboardCharts";
import LatestOrdersTable from "@/components/tables/LatestOrdersTable";
export default function Home() {
    const t = useTranslations("Dashboard");
  
  const [selectedRange, setSelectedRange] = useState("Today");
  const [selectedBranch, setSelectedBranch] = useState("All Branches");

  const ranges = ["Today", "Week", "Month"];
  const branches = ["All Branches", "Branch 1", "Branch 2", "Branch 3"];

  return (
    <main className="flex-1 flex flex-col p-8 px-4">
      <div className="flex items-start justify-between max-w-[80%]">
      <div>

        <h1 className="font-headFont font-extrabold text-[28px]">{t("mainTitle")}</h1>
  <h5 className="mt-2 text-lg font-normal text-[#24282C]">
      {t("welcomeMessage")} Admin</h5>
      </div>
        <div className="flex items-center gap-6">
          <div className="relative">
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="appearance-none min-w-[130px] rounded-[8px] border border-[#DEDEDE] bg-white px-2 py-2  text-[12px] font-medium text-black outline-none"
            >
              {branches.map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
              <Image src={arrDown} alt="Arrow Down" className="absolute right-2 top-1/2 -translate-y-1/2 text-black"/>
            {/* <ChevronDown
              size={18}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-black"
            /> */}
          </div>

          <div className="flex rounded-lg border border-[#DEDEDE] p-0.25">
            {ranges.map((range) => (
              <button
                key={range}
                onClick={() => setSelectedRange(range)}
                className={`px-4 py-1.75 text-[12px] rounded-lg transition cursor-pointer ${
                  selectedRange === range
                    ? "bg-[#E0E0E0] font-medium"
                    : "bg-transparent"
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </div>
<StatsCards />
    <DashboardCharts />
    <LatestOrdersTable />
    </main>
  );
}