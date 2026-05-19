"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import searchIcon from "@/../public/images/searchIcon.svg";
import editpen from "@/../public/images/editpen.svg";
import viewEye from "@/../public/images/viewEye.svg";

type BranchStatus = "Active" | "Inactive";

type Branch = {
  id: number;
  name: string;
  city: string;
  area: string;
  orders: number;
  revenue: string;
  status: BranchStatus;
};

const statusClass: Record<BranchStatus, string> = {
  Active: "bg-[#25BB001A] text-[#20A300] hover:bg-[#E8F8E5]",
  Inactive: "bg-[#FF5E2C1A] text-[#FF5E2C] hover:bg-[#FFECE6]",
};

const ITEMS_PER_PAGE = 10;

const branchRows: Branch[] = Array.from({ length: 38 }, (_, index) => {
  const id = index + 1;
  const city = id <= 5 ? "Alexandria" : id <= 22 ? "Cairo" : id <= 30 ? "Giza" : "Mansoura";
  const inactiveIds = new Set([2, 10, 18, 27, 36]);

  return {
    id,
    name: "Doki",
    city,
    area: "Down Town",
    orders: 450,
    revenue: id > 7 && id < 15 ? "45LE" : "45000LE",
    status: inactiveIds.has(id) ? "Inactive" : "Active",
  };
});

export default function BranchesTable() {
  const t = useTranslations("Branches");

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [status, setStatus] = useState("");

  const filtered = branchRows.filter((branch) => {
    const needle = search.toLowerCase();
    const matchSearch =
      !search ||
      branch.name.toLowerCase().includes(needle) ||
      branch.city.toLowerCase().includes(needle) ||
      branch.area.toLowerCase().includes(needle);
    const matchCity = !city || branch.city === city;
    const matchStatus = !status || branch.status === status;

    return matchSearch && matchCity && matchStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentBranches = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleFilterChange =
    (setter: (value: string) => void) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setter(event.target.value);
      setCurrentPage(1);
    };

  const statusLabel: Record<BranchStatus, string> = {
    Active: t("statusActive"),
    Inactive: t("statusInactive"),
  };

  return (
    <div className="space-y-4 mx-1 mt-8">
      <div className="flex my-12 mb-16 items-center gap-3 flex-wrap justify-between">
        <div className="flex items-center gap-5 flex-wrap mx-4">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <Image src={searchIcon} alt="Search" width={16} height={16} />
            </span>
            <input
              type="text"
              value={search}
              onChange={handleFilterChange(setSearch)}
              placeholder={t("searchPlaceholder")}
              className="pl-9 pr-4 py-2 rounded-[8px] border border-gray-200 text-sm text-gray-700 bg-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F5A623]/30 focus:border-[#F5A623] transition xl:w-[445px]"
            />
          </div>

          <select
            value={city}
            onChange={handleFilterChange(setCity)}
            className="px-4 py-2 rounded-[8px] border border-gray-200 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#F5A623]/30 focus:border-[#F5A623] transition"
          >
            <option value="">{t("allCities")}</option>
            <option value="Alexandria">Alexandria</option>
            <option value="Cairo">Cairo</option>
            <option value="Giza">Giza</option>
            <option value="Mansoura">Mansoura</option>
          </select>

          <select
            value={status}
            onChange={handleFilterChange(setStatus)}
            className="px-4 py-2 rounded-[8px] border border-gray-200 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#F5A623]/30 focus:border-[#F5A623] transition"
          >
            <option value="">{t("statusAll")}</option>
            <option value="Active">{t("statusActive")}</option>
            <option value="Inactive">{t("statusInactive")}</option>
          </select>
        </div>

        <Link
          href="/branches/create"
          className="px-10 py-2 rounded-xl bg-[#DC1213] text-white text-[16px] font-bold whitespace-nowrap hover:bg-[#b80f10] transition-colors"
        >
          {t("addNewBranchButton")}
        </Link>
      </div>

      <div className="w-full overflow-hidden border border-[#DCE0E5] rounded-[12px] rounded-b-none bg-white">
        <div className="overflow-x-auto">
          <Table className="min-w-[850px]">
            <TableHeader>
              <TableRow className="bg-[#F6F6F6] hover:bg-[#F5F5F5]">
                {[
                  t("colBranchName"),
                  t("colCity"),
                  t("colArea"),
                  t("colOrders"),
                  t("colRevenue"),
                  t("colStatus"),
                  t("colActions"),
                ].map((label) => (
                  <TableHead
                    key={label}
                    className="px-5 py-4 text-[16px] font-semibold text-[#2E2E2E] text-start"
                  >
                    {label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {currentBranches.map((branch) => (
                <TableRow key={branch.id} className="border-b border-[#EFEFEF] hover:bg-transparent">
                  <TableCell className="px-5 py-4 text-[14px] text-start text-[#2E2E2EB3] font-medium leading-[20px] tracking-[0.5px]">
                    {branch.name}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-[14px] text-start text-[#2E2E2EB3] font-medium leading-[20px] tracking-[0.5px]">
                    {branch.city}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-[14px] text-start text-[#2E2E2EB3] font-medium leading-[20px] tracking-[0.5px]">
                    {branch.area}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-[14px] text-start text-[#2E2E2EB3] font-medium leading-[20px] tracking-[0.5px]">
                    {branch.orders}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-[14px] text-start text-[#2E2E2EB3] font-medium leading-[20px] tracking-[0.5px]">
                    {branch.revenue}
                  </TableCell>
                  <TableCell className="px-5 py-4 text-start">
                    <Badge
                      className={`rounded-[6px] px-4 py-3 text-[10px] font-regular shadow-none leading-[20px] tracking-[0.5px] min-w-[90px] inline-flex justify-center ${statusClass[branch.status]}`}
                    >
                      {statusLabel[branch.status]}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-5 py-4 text-start">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/branches/${branch.id}/edit`}
                        className="w-8 rounded-lg text-gray-400 hover:text-[#F5A623] hover:bg-orange-50 transition-colors"
                      >
                        <Image src={editpen} alt={t("edit")} width={32} height={32} />
                      </Link>
                      <Link
                        href={`/branches/${branch.id}/view`}
                        className="w-8 rounded-lg text-gray-400 hover:text-[#F5A623] hover:bg-orange-50 transition-colors"
                      >
                        <Image src={viewEye} alt={t("view")} width={32} height={32} />
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-end gap-2 px-5 py-6">
          <button
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            disabled={currentPage === 1}
            className="text-[18px] font-bold text-[#FF8A00] disabled:opacity-30 cursor-pointer"
          >
            {t("paginationPrevious")}
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`h-7 w-7 rounded-[6px] text-[13px] font-semibold transition-colors cursor-pointer ${
                page === currentPage
                  ? "bg-[#FF8A00] text-white"
                  : "bg-[#F1F1F1] text-[#6E6E6E] hover:bg-[#E5E5E5]"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
            disabled={currentPage === totalPages}
            className="text-[18px] font-bold text-[#FF8A00] disabled:opacity-30 cursor-pointer"
          >
            {t("paginationNext")}
          </button>
        </div>
      </div>
    </div>
  );
}
