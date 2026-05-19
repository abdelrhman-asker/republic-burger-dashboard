"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import searchIcon from "@/.././public/images/searchIcon.svg";
import editpen from "@/.././public/images/editpen.svg";
import viewEye from "@/.././public/images/viewEye.svg";
import trashIco from "@/.././public/images/trashIco.svg";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";


type CouponStatus = "Active" | "Expired" | "Disabled";

const statusClass: Record<CouponStatus, string> = {
  Active:   "bg-[#25BB001A] text-[#20A300] hover:bg-[#E8F8E5]",
  Expired:  "bg-[#FF5E2C1A] text-[#FF5E2C] hover:bg-[#FFECE6]",
  Disabled: "bg-[#FF5E2C1A]   text-[#FFB800] hover:bg-[#E5E5E5]",
};

const ITEMS_PER_PAGE = 10;

const allCoupons = [
  { id: 1,  code: "BURGERLOVE24", type: "Percentage",   value: "25% OFF",  usageUsed: 490, usageTotal: 500, status: "Active"   as CouponStatus, expiry: "Oct 15, 2024" },
  { id: 2,  code: "BURGERLOVE24", type: "Fixed Amount",  value: "$15.00 OFF", usageUsed: 100, usageTotal: 500, status: "Expired"  as CouponStatus, expiry: "Oct 15, 2024" },
  { id: 3,  code: "BURGERLOVE24", type: "Free Shipping", value: "FREE",     usageUsed: 5, usageTotal: 500, status: "Disabled" as CouponStatus, expiry: "Oct 15, 2024" },
  { id: 4,  code: "BURGERLOVE24", type: "Percentage",   value: "25% OFF",  usageUsed: 320, usageTotal: 500, status: "Active"   as CouponStatus, expiry: "Oct 15, 2024" },
  { id: 5,  code: "BURGERLOVE24", type: "Percentage",   value: "25% OFF",  usageUsed: 500, usageTotal: 500, status: "Active"   as CouponStatus, expiry: "Oct 15, 2024" },
  { id: 6,  code: "BURGERLOVE24", type: "Percentage",   value: "25% OFF",  usageUsed: 420, usageTotal: 500, status: "Active"   as CouponStatus, expiry: "Oct 15, 2024" },
  { id: 7,  code: "BURGERLOVE24", type: "Percentage",   value: "25% OFF",  usageUsed: 420, usageTotal: 500, status: "Active"   as CouponStatus, expiry: "Oct 15, 2024" },
  { id: 8,  code: "BURGERLOVE24", type: "Percentage",   value: "25% OFF",  usageUsed: 420, usageTotal: 500, status: "Active"   as CouponStatus, expiry: "Oct 15, 2024" },
  { id: 9,  code: "BURGERLOVE24", type: "Percentage",   value: "25% OFF",  usageUsed: 420, usageTotal: 500, status: "Active"   as CouponStatus, expiry: "Oct 15, 2024" },
  { id: 10, code: "BURGERLOVE24", type: "Percentage",   value: "25% OFF",  usageUsed: 420, usageTotal: 500, status: "Expired"  as CouponStatus, expiry: "Oct 15, 2024" },
];

export default function CouponsTable() {
    const t = useTranslations("Coupons");
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch]           = useState("");
  const [branch, setBranch]           = useState("");
  const [status, setStatus]           = useState("");

  const filtered = allCoupons.filter((c) => {
    const matchSearch = !search || c.code.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !status || c.status === status;
    return matchSearch && matchStatus;
  });

  const totalPages      = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex      = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentCoupons  = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleFilterChange =
    (setter: (v: string) => void) =>
    (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
      setter(e.target.value);
      setCurrentPage(1);
    };

  // Usage bar color: red when >80% used, orange otherwise
  const barColor = (used: number, total: number) =>
    used / total >= 0.8 ? "#EC4913" : "#FF8A00";

  return (
    <div className="space-y-4 mx-1 mt-8">

      {/* Filters */}
      <div className="flex my-12  items-center gap-3 flex-wrap justify-between">
        <div className="flex items-center gap-5 flex-wrap mx-4">

          {/* Search */}
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

          {/* Branch */}
          <select
            value={branch}
            onChange={handleFilterChange(setBranch)}
            className="px-4 py-2 rounded-[8px] border border-gray-200 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#F5A623]/30 focus:border-[#F5A623] transition"
          >
            <option value="">{t("allBranches")}</option>
            <option>Downtown</option>
            <option>Uptown</option>
          </select>

          {/* Status */}
          <select
            value={status}
            onChange={handleFilterChange(setStatus)}
            className="px-4 py-2 rounded-[8px] border border-gray-200 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#F5A623]/30 focus:border-[#F5A623] transition"
          >
            <option value="">Status: All</option>
            <option value="Active">Active</option>
            <option value="Expired">Expired</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Create button */}
        <Link
          href="/coupons/create"
          className="px-8 py-2 rounded-xl bg-[#DC1213] text-white text-[16px] font-bold  whitespace-nowrap"
        >
          {t("createCopButton")}
        </Link>
      </div>

      {/* Table Card */}
      <div className="w-full overflow-hidden border border-[#DCE0E5] rounded-[12px] rounded-b-none bg-white">
        <div className="overflow-x-auto">
          <Table className="min-w-[850px]">
            <TableHeader>
              <TableRow className="bg-[#F6F6F6] ">
                {[
                  { label:  t("code"),  center: false },
                  { label: t("description"),         center: false },
                  { label: t("discountType"),        center: false },
                  { label: t("discountValue"),        center: false },
                  { label: t("status"),       center: false },
                  { label: t("expiryDate"),  center: false },
                  { label: t("actions"),      center: true  },
                ].map(({ label, center }) => (
                  <TableHead
                    key={label}
                    className={` px-5 py-4 text-[16px] font-semibold text-[#2E2E2E] ${center ? "text-center" : "text-start"}`}
                  >
                    {label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {currentCoupons.map((coupon, index) => (
                <TableRow key={index} className="border-b border-[#EFEFEF] hover:bg-transparent">

                  {/* Coupon Code */}
                  <TableCell className="px-5 py-4 text-[14px] text-start text-[#2E2E2EB3] font-medium leading-[20px] tracking-[0.5px]">
                    {coupon.code}
                  </TableCell>

                  {/* Type */}
                  <TableCell className="px-5 py-4 text-[14px] text-start text-[#2E2E2EB3] font-medium leading-[20px] tracking-[0.5px]">
                    {coupon.type}
                  </TableCell>

                  {/* Value */}
                  <TableCell className="px-5 py-4 text-[14px] text-start text-[#2E2E2EB3] font-medium leading-[20px] tracking-[0.5px]">
                    {coupon.value}
                  </TableCell>

                  {/* Usage with progress bar */}
                  <TableCell className="px-5 py-4 text-start">
                    <div className="flex flex-col gap-1 min-w-[100px]">
                      <span className="text-[13px] text-[#2E2E2EB3] font-medium">
                        {coupon.usageUsed} / {coupon.usageTotal}
                      </span>
                      <div className="h-2! w-full rounded-full bg-[#F1F1F1]">
                        <div
                          className=" h-2! rounded-full transition-all"
                          style={{
                            width: `${(coupon.usageUsed / coupon.usageTotal) * 100}%`,
                            backgroundColor: barColor(coupon.usageUsed, coupon.usageTotal),
                          }}
                        />
                      </div>
                    </div>
                  </TableCell>

                  {/* Status Badge */}
                  <TableCell className="px-5 py-4 text-start">
                    <Badge
                      className={`rounded-[6px] px-4 py-3 text-[10px] font-regular shadow-none leading-[20px] tracking-[0.5px] min-w-[90px] inline-flex justify-center ${statusClass[coupon.status]}`}
                    >
                      {coupon.status}
                    </Badge>
                  </TableCell>

                  {/* Expiry Date */}
                  <TableCell className="px-5 py-4 text-[14px] text-start text-[#2E2E2EB3] font-medium leading-[20px] tracking-[0.5px]">
                    {coupon.expiry}
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="px-5 py-4 text-center">
                    <div className="flex items-center justify-center gap-0">
                      <Link
                        href={`/coupons/${coupon.id}/edit`}
                        className="w-8 rounded-lg text-gray-400 hover:text-[#F5A623] hover:bg-orange-50 transition-colors"
                      >
                        <Image src={editpen} alt="Edit" width={32} height={32} />
                      </Link>
                      <button className="w-8 rounded-lg text-gray-400 hover:text-[#F5A623] hover:bg-orange-50 transition-colors">
                        <Image src={viewEye} alt="View" width={32} height={32} />
                      </button>
                      <button className="w-8 rounded-lg text-gray-400 hover:text-[#FF5E2C] hover:bg-red-50 transition-colors">
                        <Image src={trashIco} alt="Delete" width={32} height={32} />
                      </button>
                    </div>
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-end gap-2 px-5 py-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="text-[18px] font-bold text-[#FF8A00] disabled:opacity-30 cursor-pointer"
          >
            «
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="text-[18px] font-bold text-[#FF8A00] disabled:opacity-30 cursor-pointer"
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
}