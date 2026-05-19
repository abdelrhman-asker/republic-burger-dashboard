"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import FilterSelect from "@/components/ui/filter-select";
import searchIcon from "@/../public/images/searchIcon.svg";
import viewEye from "@/../public/images/viewEye.svg";

type AuditLog = {
  id: number;
  userKey: string;
  timestampKey: string;
  roleKey: string;
  detailsKey: string;
  lastLoginKey: string;
  moduleKey: string;
  branchKey: string;
};

const auditLogs: AuditLog[] = [
  { id: 1, userKey: "auditUserAhmedAli", timestampKey: "auditTimestamp1", roleKey: "roleManager", detailsKey: "auditDetailsUpdatedMenuItem", lastLoginKey: "lastLoginTwoHours", moduleKey: "moduleMenu", branchKey: "branchAll" },
  { id: 2, userKey: "auditUserAhmedAli", timestampKey: "auditTimestamp2", roleKey: "roleManager", detailsKey: "auditDetailsUpdatedMenuItem", lastLoginKey: "lastLoginTwoHours", moduleKey: "moduleMenu", branchKey: "branchAll" },
  { id: 3, userKey: "auditUserAhmedAli", timestampKey: "auditTimestamp3", roleKey: "roleStaff", detailsKey: "auditDetailsUpdatedMenuItem", lastLoginKey: "lastLoginTwoHours", moduleKey: "moduleMenu", branchKey: "branchAll" },
  { id: 4, userKey: "auditUserAhmedAli", timestampKey: "auditTimestamp4", roleKey: "roleStaff", detailsKey: "auditDetailsUpdatedMenuItem", lastLoginKey: "lastLoginTwoHours", moduleKey: "moduleMenu", branchKey: "branchAll" },
  { id: 5, userKey: "auditUserAhmedAli", timestampKey: "auditTimestamp5", roleKey: "roleStaff", detailsKey: "auditDetailsUpdatedMenuItem", lastLoginKey: "lastLoginTwoHours", moduleKey: "moduleMenu", branchKey: "branchAll" },
  { id: 6, userKey: "auditUserAhmedAli", timestampKey: "auditTimestamp6", roleKey: "roleStaff", detailsKey: "auditDetailsUpdatedMenuItem", lastLoginKey: "lastLoginTwoHours", moduleKey: "moduleMenu", branchKey: "branchAll" },
  { id: 7, userKey: "auditUserAhmedAli", timestampKey: "auditTimestamp7", roleKey: "roleStaff", detailsKey: "auditDetailsUpdatedMenuItem", lastLoginKey: "lastLoginTwoHours", moduleKey: "moduleMenu", branchKey: "branchAll" },
  { id: 8, userKey: "auditUserAhmedAli", timestampKey: "auditTimestamp8", roleKey: "roleStaff", detailsKey: "auditDetailsUpdatedMenuItem", lastLoginKey: "lastLoginTwoHours", moduleKey: "moduleMenu", branchKey: "branchAll" },
  { id: 9, userKey: "auditUserAhmedAli", timestampKey: "auditTimestamp9", roleKey: "roleStaff", detailsKey: "auditDetailsUpdatedMenuItem", lastLoginKey: "lastLoginTwoHours", moduleKey: "moduleMenu", branchKey: "branchAll" },
  { id: 10, userKey: "auditUserAhmedAli", timestampKey: "auditTimestamp10", roleKey: "roleStaff", detailsKey: "auditDetailsUpdatedMenuItem", lastLoginKey: "lastLoginTwoHours", moduleKey: "moduleMenu", branchKey: "branchAll" },
];

const ITEMS_PER_PAGE = 10;

export default function AuditLogsTable() {
  const t = useTranslations("StaffDirectory");
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [branchFilter, setBranchFilter] = useState("");

  const filteredLogs = useMemo(
    () =>
      auditLogs.filter((log) => {
        const translatedSearchText = [
          t(log.userKey),
          t(log.timestampKey),
          t(log.roleKey),
          t(log.detailsKey),
          t(log.lastLoginKey),
          t(log.moduleKey),
        ]
          .join(" ")
          .toLowerCase();

        const matchesSearch = !search || translatedSearchText.includes(search.toLowerCase());
        const matchesDate = !dateFilter || t(log.timestampKey).includes(dateFilter);
        const matchesBranch = !branchFilter || log.branchKey === branchFilter;

        return matchesSearch && matchesDate && matchesBranch;
      }),
    [search, dateFilter, branchFilter, t]
  );

  const totalPages = Math.max(1, Math.ceil(filteredLogs.length / ITEMS_PER_PAGE));
  const currentLogs = filteredLogs.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="space-y-4 mx-1 mt-8">
      <div className="flex my-12 mb-8 items-center gap-3 flex-wrap">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <Image src={searchIcon} alt="Search" width={16} height={16} />
          </span>
          <input
            type="text"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setCurrentPage(1);
            }}
            placeholder={t("searchLogsPlaceholder")}
            className="pl-9 pr-4 py-2 rounded-[8px] border border-gray-200 text-sm text-gray-700 bg-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F5A623]/30 focus:border-[#F5A623] transition xl:w-[445px]"
          />
        </div>

        <FilterSelect
          value={dateFilter}
          onChange={(event) => {
            setDateFilter(event.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">{t("dateAll")}</option>
          <option value="Oct 24">{t("dateOct24")}</option>
        </FilterSelect>

        <FilterSelect
          value={branchFilter}
          onChange={(event) => {
            setBranchFilter(event.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="">{t("branchAll")}</option>
          <option value="branchAll">{t("branchAll")}</option>
        </FilterSelect>
      </div>

      <div className="w-full overflow-hidden border border-[#DCE0E5] rounded-[12px] rounded-b-none bg-white">
        <div className="overflow-x-auto">
          <Table className="min-w-[900px]">
            <TableHeader>
              <TableRow className="bg-[#F6F6F6] hover:bg-[#F5F5F5]">
                {[t("auditUser"), t("auditTimestamp"), t("auditRole"), t("auditDetails"), t("auditLastLogin"), t("auditModule"), t("auditActions")].map((label) => (
                  <TableHead key={label} className="px-5 py-4 text-[16px] font-semibold text-[#2E2E2E] text-start">
                    {label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentLogs.map((log) => (
                <TableRow key={log.id} className="border-b border-[#EFEFEF] hover:bg-transparent">
                  <TableCell className="px-5 py-4 text-[14px] text-start text-[#2E2E2EB3] font-medium leading-[20px] tracking-[0.5px]">{t(log.userKey)}</TableCell>
                  <TableCell className="px-5 py-4 text-[14px] text-start text-[#2E2E2EB3] font-medium leading-[20px] tracking-[0.5px]">{t(log.timestampKey)}</TableCell>
                  <TableCell className="px-5 py-4 text-[14px] text-start text-[#2E2E2EB3] font-medium leading-[20px] tracking-[0.5px]">{t(log.roleKey)}</TableCell>
                  <TableCell className="max-w-[220px] px-5 py-4 text-[14px] text-start text-[#2E2E2EB3] font-medium leading-[20px] tracking-[0.5px]">{t(log.detailsKey)}</TableCell>
                  <TableCell className="px-5 py-4 text-[14px] text-start text-[#2E2E2EB3] font-medium leading-[20px] tracking-[0.5px]">{t(log.lastLoginKey)}</TableCell>
                  <TableCell className="px-5 py-4 text-start">
                    <span className="inline-flex h-[28px] min-w-[90px] items-center justify-center rounded-[6px] bg-[#25BB001A] px-4 text-[10px] font-regular leading-[20px] tracking-[0.5px] text-[#20A300]">
                      {t(log.moduleKey)}
                    </span>
                  </TableCell>
                  <TableCell className="px-5 py-4 text-center">
                    <button type="button" className="w-8 rounded-lg text-gray-400 hover:text-[#F5A623] hover:bg-orange-50 transition-colors" aria-label={t("viewDetails")}>
                      <Image src={viewEye} alt={t("viewDetails")} width={32} height={32} />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-end gap-2 px-5 py-6">
          <button onClick={() => setCurrentPage((page) => Math.max(1, page - 1))} disabled={currentPage === 1} className="text-[18px] font-bold text-[#FF8A00] disabled:opacity-30 cursor-pointer">
          «
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`h-7 w-7 rounded-[6px] text-[13px] font-semibold transition-colors cursor-pointer ${page === currentPage ? "bg-[#FF8A00] text-white" : "bg-[#F1F1F1] text-[#6E6E6E] hover:bg-[#E5E5E5]"}`}
            >
              {page}
            </button>
          ))}
          <button onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))} disabled={currentPage === totalPages} className="text-[18px] font-bold text-[#FF8A00] disabled:opacity-30 cursor-pointer">
              »
          </button>
        </div>
      </div>
    </div>
  );
}
