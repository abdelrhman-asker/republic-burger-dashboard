"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
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
import redirectArrow from "@/.././public/images/redirectArrow.svg";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { Link } from "@/i18n/navigation";

type OrderStatus = "Approved" | "Rejected" | "Pending";

const statusClass: Record<OrderStatus, string> = {
  Approved:      "bg-[#25BB001A] text-[#25BB00] hover:bg-[#E8F8E5]",
  Rejected: "bg-[#FF5E2C1A] text-[#FF5E2C] hover:bg-[#FFECE6]",
  Pending:   "bg-[#FFEAB3] text-[#FF8A00] hover:bg-[#FEF9C3]",
};

const ITEMS_PER_PAGE = 10;

const allRefunds = [
  { id: 1, refundId: "#REF-10293", user: "Ali Ahmed", orderId: "#ORD-5542", amount: "45LE", reason: "Item missing from order: E...", date: "Oct 24, 2023", status: "Approved"    as OrderStatus },
  { id: 2, refundId: "#REF-10293", user: "Ali Ahmed", orderId: "#ORD-5542", amount: "45LE", reason: "Item missing from order: E...", date: "Oct 24, 2023", status: "Approved"    as OrderStatus },
  { id: 3, refundId: "#REF-10293", user: "Ali Ahmed", orderId: "#ORD-5542", amount: "45LE", reason: "Item missing from order: E...", date: "Oct 24, 2023", status: "Approved"    as OrderStatus },
  { id: 4, refundId: "#REF-10293", user: "Ali Ahmed", orderId: "#ORD-5542", amount: "45LE", reason: "Item missing from order: E...", date: "Oct 24, 2023", status: "Pending"    as OrderStatus },
  { id: 5, refundId: "#REF-10293", user: "Ali Ahmed", orderId: "#ORD-5542", amount: "45LE", reason: "Item missing from order: E...", date: "Oct 24, 2023", status: "Pending"    as OrderStatus },
  { id: 6, refundId: "#REF-10293", user: "Ali Ahmed", orderId: "#ORD-5542", amount: "45LE", reason: "Item missing from order: E...", date: "Oct 24, 2023", status: "Pending"    as OrderStatus },
  { id: 7, refundId: "#REF-10293", user: "Ali Ahmed", orderId: "#ORD-5542", amount: "45LE", reason: "Item missing from order: E...", date: "Oct 24, 2023", status: "Pending"    as OrderStatus },
  { id: 8, refundId: "#REF-10293", user: "Ali Ahmed", orderId: "#ORD-5542", amount: "45LE", reason: "Item missing from order: E...", date: "Oct 24, 2023", status: "Pending"    as OrderStatus },
  { id: 9, refundId: "#REF-10293", user: "Ali Ahmed", orderId: "#ORD-5542", amount: "45LE", reason: "Item missing from order: E...", date: "Oct 24, 2023", status: "Rejected"    as OrderStatus },
  { id: 10, refundId: "#REF-10293", user: "Ali Ahmed", orderId: "#ORD-5542", amount: "45LE", reason: "Item missing from order: E...", date: "Oct 24, 2023", status: "Rejected"    as OrderStatus },
];
export default function OrdersTable() {
  const t = useTranslations("Refund");


  const [currentPage, setCurrentPage]   = useState(1);
  const [search, setSearch]             = useState("");
  const [branch, setBranch]             = useState("");
  const [status, setStatus]           = useState("");




  const totalPages    = Math.ceil(allRefunds.length / ITEMS_PER_PAGE);
  const startIndex    = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentRefunds = allRefunds.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="space-y-4">

      {/* Filters */}
      <div className="flex my-24 items-center gap-3 flex-wrap">

        {/* Search */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">
            <Image src={searchIcon} alt="Search" width={16} height={16} />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-sm text-gray-700 bg-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F5A623]/30 focus:border-[#F5A623] transition xl:w-[445px]"
          />
        </div>

        {/* Branch */}
        <select
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          className="px-4 py-2 rounded-xl border border-gray-200 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#F5A623]/30 focus:border-[#F5A623] transition"
        >
          <option value="">{t("allBranches")}</option>
          <option>Down Town</option>
          <option>Uptown</option>
        </select>

        {/* Payment */}
       <select
  value={status}
  onChange={(e) => setStatus(e.target.value)}
  className="px-4 py-2 rounded-xl border border-gray-200 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#F5A623]/30 focus:border-[#F5A623] transition"
>
  <option value="">{t("statusAll")} All</option>
  <option value="Done">Done</option>
  <option value="Cancelled">Cancelled</option>
  <option value="Process">Process</option>
  <option value="Pending">Pending</option>
</select>

    
      </div>

      {/* Table Card */}
      <div className="w-full overflow-hidden rounded-[12px] rounded-b-none bg-white">


        {/* Table */}
<div className="overflow-x-auto">
  <Table className="min-w-[750px]">
   <TableHeader>
  <TableRow className="bg-[#F6F6F6] hover:bg-[#F5F5F5]">
    {["Refund ID", "User", "Order ID", "Amount", "Reason", "Status", "Date", "Actions"].map((col) => {
      const isCentered = ["Reason", "Amount", "Actions"].includes(col);

      return (
        <TableHead
          key={col}
          className={`px-5 py-4 text-[16px] font-semibold text-[#2E2E2E] ${
            isCentered ? "text-center" : "text-start"
          }`}
        >
          {col}
        </TableHead>
      );
    })}
  </TableRow>
</TableHeader>

    <TableBody>
      {currentRefunds.map((refund, index) => (
        <TableRow key={index} className="border-b border-[#EFEFEF] hover:bg-transparent">
          <TableCell className="px-5 py-4 text-[14px] text-start text-[#2E2E2EB3] font-medium leading-[20px] tracking-[0.5px]">{refund.refundId}</TableCell>
          <TableCell className="px-5 py-4 text-[14px] text-start text-[#2E2E2EB3] font-medium leading-[20px] tracking-[0.5px]">{refund.user}</TableCell>
          <TableCell className="px-5 py-4 text-[14px] text-start text-[#2E2E2EB3] font-medium leading-[20px] tracking-[0.5px]">{refund.orderId}</TableCell>
          <TableCell className="px-5 py-4 text-[14px] text-center text-[#2E2E2EB3] font-medium leading-[20px] tracking-[0.5px]">{refund.amount}</TableCell>
          <TableCell className="px-5 py-4 text-[14px] text-center text-[#2E2E2EB3] font-medium leading-[20px] tracking-[0.5px] max-w-[180px] truncate">{refund.reason}</TableCell>
          <TableCell className="px-5 py-4 text-start">
            <Badge className={`rounded-[6px] px-4 py-3 text-[10px] text-start font-regular shadow-none leading-[20px] tracking-[0.5px] min-w-[90px] inline-flex justify-center ${statusClass[refund.status]}`}>
              {refund.status}
            </Badge>
          </TableCell>
          <TableCell className="px-5 py-4 text-[14px] text-start text-[#2E2E2EB3] font-medium leading-[20px] tracking-[0.5px]">{refund.date}</TableCell>
          <TableCell className="px-5 py-4 text-center">
            <div className="flex items-center justify-center gap-0">
                <Link href={`/refund/${refund.id}`} className="p-1.5 rounded-lg text-gray-400 hover:text-[#F5A623] hover:bg-orange-50 transition-colors">
                    <Image src={editpen} alt="Edit" width={32} height={32} />
                    </Link>
              <button className="p-1.5 rounded-lg text-gray-400 hover:text-[#F5A623] hover:bg-orange-50 transition-colors">
                <Image src={viewEye} alt="View" width={32} height={32} />
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