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
import FilterSelect from "@/components/ui/filter-select";
import Image from "next/image";
import searchIcon from "@/.././public/images/searchIcon.svg";
import editpen from "@/.././public/images/editpen.svg";
import viewEye from "@/.././public/images/viewEye.svg";
import redirectArrow from "@/.././public/images/redirectArrow.svg";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

type OrderStatus = "Done" | "Cancelled" | "Process" | "Pending";

const statusClass: Record<OrderStatus, string> = {
  Done:      "bg-[#25BB001A] text-[#25BB00] hover:bg-[#E8F8E5]",
  Cancelled: "bg-[#FF5E2C1A] text-[#FF5E2C] hover:bg-[#FFECE6]",
  Process:   "bg-[#0046BB1A] text-[#0046BB] hover:bg-[#E8F0FF]",
  Pending:   "bg-[#FFEAB3] text-[#FF8A00] hover:bg-[#FEF9C3]",
};

const ITEMS_PER_PAGE = 10;

const allOrders = [
  { id: "FD-8095", customer: "Ali Ahmed", branch: "Down Town", payment: "Credit Card", total: "45LE", status: "Done"      as OrderStatus },
  { id: "FD-8096", customer: "Ali Ahmed", branch: "Down Town", payment: "PayPal",      total: "45LE", status: "Cancelled" as OrderStatus },
  { id: "FD-8097", customer: "Ali Ahmed", branch: "Down Town", payment: "Debit Card",  total: "45LE", status: "Process"   as OrderStatus },
  { id: "FD-8098", customer: "Ali Ahmed", branch: "Down Town", payment: "Cash",        total: "45LE", status: "Done"      as OrderStatus },
  { id: "FD-8099", customer: "Ali Ahmed", branch: "Down Town", payment: "Cash",        total: "45LE", status: "Pending"   as OrderStatus },
  { id: "FD-8100", customer: "Ali Ahmed", branch: "Down Town", payment: "Cash",        total: "45LE", status: "Done"      as OrderStatus },
  { id: "FD-8101", customer: "Ali Ahmed", branch: "Down Town", payment: "Cash",        total: "45LE", status: "Done"      as OrderStatus },
  { id: "FD-8102", customer: "Ali Ahmed", branch: "Down Town", payment: "Cash",        total: "45LE", status: "Done"      as OrderStatus },
  { id: "FD-8103", customer: "Ali Ahmed", branch: "Down Town", payment: "Cash",        total: "45LE", status: "Done"      as OrderStatus },
  { id: "FD-8104", customer: "Ali Ahmed", branch: "Down Town", payment: "Cash",        total: "45LE", status: "Done"      as OrderStatus },
  { id: "FD-8105", customer: "Ali Ahmed", branch: "Down Town", payment: "Cash",        total: "45LE", status: "Done"      as OrderStatus },
  { id: "FD-8106", customer: "Ali Ahmed", branch: "Down Town", payment: "Cash",        total: "45LE", status: "Done"      as OrderStatus },
  { id: "FD-8107", customer: "Ali Ahmed", branch: "Down Town", payment: "Cash",        total: "45LE", status: "Done"      as OrderStatus },
  { id: "FD-8108", customer: "Ali Ahmed", branch: "Down Town", payment: "Cash",        total: "45LE", status: "Done"      as OrderStatus },
  { id: "FD-8109", customer: "Ali Ahmed", branch: "Down Town", payment: "Cash",        total: "45LE", status: "Done"      as OrderStatus },
];

export default function OrdersTable() {
  const t = useTranslations("Orders");

  const TABS = [t("all"), t("Pending"), t("Preparing"), t("Delivered"), t("Cancelled")] as const;

  const [activeTab, setActiveTab]       = useState<string>(t("all"));
  const [currentPage, setCurrentPage]   = useState(1);
  const [search, setSearch]             = useState("");
  const [branch, setBranch]             = useState("");
  const [payment, setPayment]           = useState("");
  const [selected, setSelected]         = useState<Date | undefined>(undefined);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const calendarRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (calendarRef.current && !calendarRef.current.contains(e.target as Node)) {
        setCalendarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

const formatDate = (date: Date | undefined) => {
  const displayDate = date ?? new Date();
  return displayDate.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
};
  const totalPages    = Math.ceil(allOrders.length / ITEMS_PER_PAGE);
  const startIndex    = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentOrders = allOrders.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="space-y-4">

      {/* Filters */}
      <div className="flex my-16 items-center gap-3 flex-wrap">

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
        <FilterSelect value={branch} onChange={(e) => setBranch(e.target.value)}>
          <option value="">{t("allBranches")}</option>
          <option>Down Town</option>
          <option>Uptown</option>
        </FilterSelect>

        {/* Payment */}
        <FilterSelect value={payment} onChange={(e) => setPayment(e.target.value)}>
          <option value="">{t("paymentAll")}</option>
          <option>Cash</option>
          <option>Credit Card</option>
          <option>PayPal</option>
          <option>Debit Card</option>
        </FilterSelect>

        {/* Date Picker */}
        <div className="relative" ref={calendarRef}>
          {/* Trigger Button */}
          <button
            onClick={() => setCalendarOpen((o) => !o)}
            className={`px-4 py-2 ps-1 rounded-xl border border-gray-200 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#F5A623]/30 focus:border-[#F5A623] transition
              ${calendarOpen || selected ? "border-[#F5A623] text-[#2E2E2E]" : "border-gray-200 text-gray-400"}
            `}
          >

<span className="text-[#2E2E2E]">
  {t("dateLabel")}: {formatDate(selected)}
</span>
            {/* Clear button */}
            {selected && (
              <span
                onClick={(e) => { e.stopPropagation(); setSelected(undefined); }}
                className="ml-1 text-gray-300 hover:text-gray-500 text-lg leading-none"
              >
                ×
              </span>
            )}
          </button>

          {/* Dropdown Calendar */}
     {calendarOpen && (
  <div className="absolute z-50 mt-1 bg-white border border-gray-200 rounded-2xl shadow-lg p-2">
    <style>{`
      .rdp-root {
        --rdp-accent-color: #FF8A00;
        --rdp-accent-background-color: #FFF3E0;
        --rdp-day-width: 36px;
        --rdp-day-height: 36px;
        --rdp-selected-border: none;
        font-family: inherit;
        font-size: 13px;
      }
      .rdp-day_button {
        border-radius: 50% !important;
        font-size: 13px;
        font-weight: 500;
      }
      .rdp-selected .rdp-day_button {
        background-color: #FF8A00 !important;
        color: white !important;
      }
      .rdp-today:not(.rdp-selected) .rdp-day_button {
        border: 1.5px solid #FF8A00 !important;
        color: #FF8A00 !important;
      }
      .rdp-day_button:hover {
        background-color: #FFF3E0 !important;
        color: #FF8A00 !important;
      }
      .rdp-chevron {
        fill: #6B7280;
      }
      .rdp-nav button:hover .rdp-chevron {
        fill: #FF8A00;
      }
      .rdp-caption_label {
        font-size: 14px;
        font-weight: 600;
        color: #2E2E2E;
      }
      .rdp-weekday {
        font-size: 11px;
        font-weight: 600;
        color: #9CA3AF;
      }
      .rdp-outside .rdp-day_button {
        color: #D1D5DB !important;
      }
    `}</style>
    <DayPicker
      animate
      mode="single"
      selected={selected}
      onSelect={(date) => {
        setSelected(date);
        setCalendarOpen(false);
      }}
    />
  </div>
)}
        </div>

      </div>

      {/* Table Card */}
      <div className="w-full overflow-hidden rounded-[12px] rounded-b-none bg-white">

        {/* Tabs */}
        <div className="flex border-b border-[#EFEFEF] mb-6">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setCurrentPage(1); }}
              className={`py-1 px-3 mx-2.5 text-lg font-medium border-b-2 -mb-px transition-colors duration-150 ${
                activeTab === tab
                  ? "border-[#E53935] text-[#E53935] font-bold"
                  : "border-transparent text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table className="min-w-[750px]">
            <TableHeader>
              <TableRow className="bg-[#F6F6F6] hover:bg-[#F5F5F5]">
                {["Number ID", "Customer", "Branch", "Payment", "Total", "Status", "Actions"].map((col) => (
                  <TableHead key={col} className="px-5 py-4 text-[16px] font-semibold text-[#2E2E2E]">
                    {col}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {currentOrders.map((order, index) => (
                <TableRow key={index} className="border-b border-[#EFEFEF] hover:bg-transparent">
                  <TableCell className="px-5 py-4 text-[14px] text-[#2E2E2EB3] leading-[20px] tracking-[0.5px]">{order.id}</TableCell>
                  <TableCell className="px-5 py-4 text-[14px] text-[#2E2E2EB3] leading-[20px] tracking-[0.5px]">{order.customer}</TableCell>
                  <TableCell className="px-5 py-4 text-[14px] text-[#2E2E2EB3] leading-[20px] tracking-[0.5px]">{order.branch}</TableCell>
                  <TableCell className="px-5 py-4 text-[14px] text-[#2E2E2EB3] leading-[20px] tracking-[0.5px]">{order.payment}</TableCell>
                  <TableCell className="px-5 py-4 text-[14px] text-[#2E2E2EB3] leading-[20px] tracking-[0.5px]">{order.total}</TableCell>
           <TableCell className="px-5 py-4">
  <Badge className={`rounded-[6px] px-4 py-3 text-[10px] font-regular shadow-none leading-[20px] tracking-[0.5px] min-w-[90px] inline-flex justify-center ${statusClass[order.status]}`}>
    {order.status}
  </Badge>
</TableCell>
                  <TableCell className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button className="w-8 rounded-lg text-gray-400 hover:text-[#F5A623] hover:bg-orange-50 transition-colors">
                        <Image src={editpen} alt="Edit" width={32} height={32} />
                      </button>
                      <button className="w-8 rounded-lg text-gray-400 hover:text-[#F5A623] hover:bg-orange-50 transition-colors">
                        <Image src={viewEye} alt="View" width={32} height={32} />
                      </button>
                      <button className="w-8 rounded-lg text-gray-400 hover:text-[#E53935] hover:bg-red-50 transition-colors">
                        <Image src={redirectArrow} alt="Delete" width={32} height={32} />
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
