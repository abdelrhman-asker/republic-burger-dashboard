"use client";
import Image from "next/image";
import PhoneGray from "@/.././public/images/phoneGray.svg";
import locationGray from "@/.././public/images/locationGray.svg";
import searchIcon from "@/.././public/images/searchIcon.svg";
import EyeDet from "@/.././public/images/EyeDet.svg";
import { Bell, MoreVertical, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { use, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// ─── Types ────────────────────────────────────────────────────────────────────

type OrderStatus = "Completed" | "Refunded" | "Pending" | "Cancelled";
type WalletType  = "Credit" | "Debit";

// ─── Status styling ───────────────────────────────────────────────────────────

const statusClass: Record<OrderStatus, string> = {
  Completed: "bg-[#25BB001A] text-[#20A300] hover:bg-[#E8F8E5]",
  Refunded:  "bg-[#DC12131A] text-[#DC1213] hover:bg-[#FFECE6]",
  Pending:   "bg-[#FFEAB3]   text-[#FF8A00] hover:bg-[#FEF9C3]",
  Cancelled: "bg-[#F0F0F0]   text-[#6E6E6E] hover:bg-[#E5E5E5]",
};

const walletAmountClass: Record<WalletType, string> = {
  Credit: "text-[#20A300]",
  Debit:  "text-[#DC1213]",
};

// ─── Mock data ────────────────────────────────────────────────────────────────

const ITEMS_PER_PAGE = 10;

const allOrders = [
  { id: "#BR-1024", date: "Oct 24, 2023", summary: "2x Classic Burgers, 1x Fries", total: "24.50", status: "Completed" as OrderStatus },
  { id: "#BR-1021", date: "Oct 20, 2023", summary: "Family Combo Bundle",           total: "45.00", status: "Completed" as OrderStatus },
  { id: "#BR-0998", date: "Oct 15, 2023", summary: "Strawberry Milkshake",          total: "6.50",  status: "Refunded"  as OrderStatus },
  { id: "#BR-0850", date: "Sep 28, 2023", summary: "Republic Special",              total: "18.25", status: "Refunded"  as OrderStatus },
  { id: "#BR-0722", date: "Sep 10, 2023", summary: "Double Cheeseburger",           total: "12.99", status: "Completed" as OrderStatus },
  { id: "#BR-0722", date: "Sep 10, 2023", summary: "Double Cheeseburger",           total: "12.99", status: "Completed" as OrderStatus },
  { id: "#BR-0722", date: "Sep 10, 2023", summary: "Double Cheeseburger",           total: "12.99", status: "Completed" as OrderStatus },
  { id: "#BR-0722", date: "Sep 10, 2023", summary: "Double Cheeseburger",           total: "12.99", status: "Completed" as OrderStatus },
  { id: "#BR-0722", date: "Sep 10, 2023", summary: "Double Cheeseburger",           total: "12.99", status: "Completed" as OrderStatus },
  { id: "#BR-0722", date: "Sep 10, 2023", summary: "Double Cheeseburger",           total: "12.99", status: "Completed" as OrderStatus },
  { id: "#BR-0722", date: "Sep 10, 2023", summary: "Double Cheeseburger",           total: "12.99", status: "Completed" as OrderStatus },
  { id: "#BR-0700", date: "Aug 30, 2023", summary: "Chicken Wrap",                  total: "9.50",  status: "Cancelled" as OrderStatus },
];

const allRefunds = allOrders.filter((o) => o.status === "Refunded");

const allWalletTransactions = [
  { id: "TX1023", amount: "+100 EGP", reason: "Refund",         type: "Credit" as WalletType, date: "Mar 10" },
  { id: "TX1023", amount: "-80 EGP",  reason: "Order payment",  type: "Debit"  as WalletType, date: "Mar 10" },
  { id: "TX1023", amount: "+100 EGP", reason: "Refund",         type: "Debit"  as WalletType, date: "Mar 10" },
  { id: "TX1023", amount: "+100 EGP", reason: "Refund",         type: "Credit" as WalletType, date: "Mar 10" },
  { id: "TX1023", amount: "+100 EGP", reason: "Refund",         type: "Credit" as WalletType, date: "Mar 10" },
  { id: "TX1023", amount: "+100 EGP", reason: "Refund",         type: "Credit" as WalletType, date: "Mar 10" },
  { id: "TX1023", amount: "+100 EGP", reason: "Refund",         type: "Credit" as WalletType, date: "Mar 10" },
  { id: "TX1023", amount: "+100 EGP", reason: "Refund",         type: "Credit" as WalletType, date: "Mar 10" },
  { id: "TX1023", amount: "+100 EGP", reason: "Refund",         type: "Credit" as WalletType, date: "Mar 10" },
];

const tabs = [ "Orders History", "Refunds", "Wallet"] as const;
type Tab = (typeof tabs)[number];

// ─── Pagination helper ────────────────────────────────────────────────────────

function Pagination({
  currentPage,
  totalPages,
  onChange,
}: {
  currentPage: number;
  totalPages: number;
  onChange: (p: number) => void;
}) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-end gap-2 px-5 py-6">
      <button
        onClick={() => onChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="text-[18px] font-bold text-[#FF8A00] disabled:opacity-30 cursor-pointer"
      >
        «
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onChange(page)}
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
        onClick={() => onChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="text-[18px] font-bold text-[#FF8A00] disabled:opacity-30 cursor-pointer"
      >
        »
      </button>
    </div>
  );
}

// ─── Add Wallet Credit Modal ──────────────────────────────────────────────────

function AddWalletCreditModal({
  onClose,
  t,
}: {
  onClose: () => void;
  t: ReturnType<typeof useTranslations>;
}) {
  const [amount, setAmount]   = useState("");
  const [reason, setReason]   = useState("Refund");
  const [notes, setNotes]     = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 px-4 py-6">
      <div className="flex max-h-[calc(100vh-48px)] w-full max-w-[708px] flex-col overflow-hidden rounded-[12px] bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#EFEFEF] px-6 py-5">
          <h2 className="text-[20px] font-semibold text-[#0F172A]">
            {t("addWalletCredit")}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="overflow-y-auto p-6">
        {/* Amount */}
        <div className="mb-9 mx-0 sm:mx-6">
          <label className="block text-[14px] font-semibold text-[#0F172A] mb-2">
            {t("amount")}
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full border border-[#E2E8F0] rounded-[8px] px-3 py-3 min-h-[48px] text-sm text-[#111827] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F5A623]/30 focus:border-[#F5A623] transition"
          />
        </div>

        {/* Reason */}
        <div className="mb-9 mx-0 sm:mx-6">
          <label className="block text-[14px] font-semibold text-[#0F172A] mb-2">
            {t("reason")}
          </label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full border border-[#E2E8F0] rounded-[8px] px-3 py-3 min-h-[48px] text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#F5A623]/30 focus:border-[#F5A623] transition appearance-none bg-white"
          >
            <option value="Refund">{t("reasonRefund")}</option>
            <option value="Compensation">{t("reasonCompensation")}</option>
            <option value="Adjustment">{t("reasonAdjustment")}</option>
          </select>
        </div>

        {/* Notes */}
        <div className="mb-9 mx-0 sm:mx-6">
          <label className="block text-[14px] font-semibold text-[#0F172A] mb-2">
            {t("notesOptional")}
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={t("notesPlaceholder")}
            rows={4}
            className="w-full border border-[#E2E8F0] rounded-[8px] px-3 py-2 text-sm text-[#111827] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F5A623]/30 focus:border-[#F5A623] transition min-h-[138px]"
          />
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-4 lg:gap-8 lg:mt-16 lg:mb-8 justify-center min:w-fit m-auto">
            <button
            onClick={onClose}
            className="max-w-[179px] min-w-[30%] py-2 rounded-[8px] bg-[#DC1213] text-white font-bold text-[16px] transition hover:bg-red-700"
          >
            {t("save")}
          </button>
          <button
            onClick={onClose}
            className="max-w-[179px] min-w-[30%] py-2 rounded-[8px] border border-[#DC1213] text-[#DC1213] font-bold text-[16px] transition hover:bg-red-50"
          >
            {t("cancel")}
          </button>
          
        </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function UserDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  console.log(id);

  const t = useTranslations("Users");

  const [activeTab, setActiveTab]         = useState<Tab>("Orders History");
  const [currentPage, setCurrentPage]     = useState(1);
  const [search, setSearch]               = useState("");
  const [showWalletModal, setShowWalletModal] = useState(false);

  // ── Filtered + paginated data ──────────────────────────────────────────────

  const filteredOrders = allOrders.filter(
    (o) =>
      !search ||
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.summary.toLowerCase().includes(search.toLowerCase())
  );

  const filteredRefunds = allRefunds.filter(
    (o) =>
      !search ||
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.summary.toLowerCase().includes(search.toLowerCase())
  );

  const filteredWallet = allWalletTransactions.filter(
    (tx) =>
      !search ||
      tx.id.toLowerCase().includes(search.toLowerCase()) ||
      tx.reason.toLowerCase().includes(search.toLowerCase())
  );

  const startIndex    = (currentPage - 1) * ITEMS_PER_PAGE;

  const currentOrders  = filteredOrders.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const currentRefunds = filteredRefunds.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const currentWallet  = filteredWallet.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // ── Tab labels (translated) ────────────────────────────────────────────────

  const tabLabels: Record<Tab, string> = {
    "Orders History": t("Orders History"),
    "Refunds":        t("Refunds History"),
    "Wallet":         t("walletTab"),
  };

  return (
    <>
      {showWalletModal && (
        <AddWalletCreditModal onClose={() => setShowWalletModal(false)} t={t} />
      )}

      <main className="min-h-screen bg-white px-8 py-6">
        <div className="max-w-[1160px]">

          {/* Page Header */}
          <div className="flex items-start justify-between mb-8">
            <h1 className="font-headFont text-[28px] font-extrabold">{t("mainTitleDetails")}</h1>
            <div className="flex items-center gap-5">
              <button className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center">
                <Bell size={16} />
              </button>
              <div className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden" />
            </div>
          </div>

          {/* Body */}
          <div className="flex gap-6 items-start flex-wrap flex-col xl:flex-row mt-24">

            {/* ── Left Sidebar ── */}
            <div className="w-[330px] min-w-[200px] space-y-10 mb-5">

              {/* Profile Card */}
              <div className="border rounded-[10px] overflow-hidden" style={{ borderColor: "#E08400" }}>
                <div className="p-5 space-y-3 pt-10 pb-16">

                  {/* Name + tier */}
                  <div>
                    <div className="flex flex-wrap align-center justify-between">
                        {/* Soon from the endpoint */}
                      <p className="font-bold text-[24px] leading-8">Ahmed Ali</p>
                      <span className="h-fit self-end px-2 py-0.5 rounded-full bg-[#FFF1C7] text-[#F5A623] text-[10px] font-medium flex align-middle justify-center">
                        Gold Member
                      </span>
                    </div>
                    <p className="text-[14px] text-[#6B7280] mt-1">
                      {t("CustomerSince")} Oct 2021
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="flex justify-between pt-4 pb-4">
                    <div className="flex flex-col align-middle justify-center py-4 px-7 bg-[#EC49130D] rounded-[8px]">
                      <p className="text-[12px] text-[#6B7280] font-medium">
                        {t("WalletBalance")}
                      </p>
                      <p className="text-[24px] font-bold leading-8 text-[#E08400]">$145.50</p>
                    </div>
                    <div className="flex flex-col align-middle justify-center text-center py-4 px-7">
                      <p className="text-[12px] text-[#6B7280] font-medium">
                        {t("totalOrders")}
                      </p>
                      <p className="text-[24px] font-bold leading-8">42</p>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-3 space-y-3">
                    {/* Phone */}
                    <div className="flex items-start gap-2 mb-8">
                      <Image src={PhoneGray} alt="Phone" width={18} height={18} />
                      <div>
                        <p className="text-[14px] text-[#111827] leading-5 font-medium">
                          {t("Phone")}
                        </p>
                        <p className="text-sm text-[#6B7280] leading-5">+1 (555) 012-3456</p>
                      </div>
                    </div>
                    {/* Address */}
                    <div className="flex items-start gap-2">
                      <Image src={locationGray} alt="Location" width={14} height={18} />
                      <div>
                        <p className="text-[14px] text-[#111827] leading-5 font-medium">
                          {t("DefaultAddress")}
                        </p>
                        <p className="text-sm text-[#6B7280] leading-5">
                          123 Burger Lane, Foodie City, FC 90210
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-between gap-2">
                <button className="cursor-pointer px-6 py-2 min-w-[157px] rounded-[10px] border border-[#DC1213] text-[#DC1213] font-bold text-[16px]">
                  {t("SuspendUser")}
                </button>
                <button className="cursor-pointer px-8 py-2 min-w-[152px] rounded-[10px] bg-[#DC1213] text-white font-bold text-[16px]">
                  {t("EditProfile")}
                </button>
              </div>
            </div>

            {/* ── Right Content ── */}
            <div className="flex-1 max-w-full overflow-x-auto">

              {/* Tabs */}
              <div className="flex gap-8 border-b border-gray-200 mb-16">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => { setActiveTab(tab); setCurrentPage(1); setSearch(""); }}
                    className={`pb-3 text-sm font-medium transition-colors ${
                      activeTab === tab
                        ? "text-[#E50914] border-b-2 border-[#E50914]"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    {tabLabels[tab]}
                  </button>
                ))}
              </div>

              <div className="rounded-[12px] rounded-b-none bg-white border border-gray-200">

                {/* Search + optional wallet action */}
                <div className="flex items-center justify-between gap-3 m-4 mb-5">
                  <div className="relative flex-1 max-w-[541px]">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                      <Image src={searchIcon} alt={t("search")} width={16} height={16} />
                    </span>
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                      placeholder={t("searchOrdersPlaceholder")}
                      className="pl-9 pr-4 py-2 w-full rounded-xl border border-gray-200 text-sm text-gray-700 bg-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F5A623]/30 focus:border-[#F5A623] transition"
                    />
                  </div>

                  {activeTab === "Wallet" && (
                    <button
                      onClick={() => setShowWalletModal(true)}
                      className="cursor-pointer px-4 py-2 rounded-[8px] bg-[#DC1213] text-white font-bold text-[13px] whitespace-nowrap transition hover:bg-red-700"
                    >
                      {t("addWalletCredit")}
                    </button>
                  )}
                </div>

                {/* ── Orders History Tab ── */}
                {activeTab === "Orders History" && (
                  <div className="w-full overflow-hidden">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-[#F6F6F6] hover:bg-[#F5F5F5]">
                            {[
                              t("orderId"),
                              t("dateLabel"),
                              t("summary"),
                              t("total"),
                              t("status"),
                              "",
                            ].map((col, i) => (
                              <TableHead
                                key={i}
                                className={`uppercase px-5 py-4 text-[12px] font-medium text-[#6B7280] leading-4 ${
                                  col === t("status") ? "text-center" : "text-start"
                                }`}
                              >
                                {col}
                              </TableHead>
                            ))}
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {currentOrders.map((order, index) => (
                            <TableRow
                              key={index}
                              className="border-t border-[#EFEFEF] hover:bg-gray-50 transition-colors"
                            >
                              <TableCell className="px-5 py-4 text-[14px] font-medium text-[#E08400] leading-5">
                                {order.id}
                              </TableCell>
                              <TableCell className="px-5 py-4 text-[14px] text-[#6B7280] leading-5">
                                {order.date}
                              </TableCell>
                              <TableCell className="px-5 py-4 text-[14px] text-[#111827] leading-5">
                                {order.summary}
                              </TableCell>
                              <TableCell className="px-5 py-4 text-[14px] text-[#111827] leading-5">
                                {order.total}
                              </TableCell>
                              <TableCell className="px-5 py-4 text-center">
                                <Badge
                                  className={`rounded-[6px] px-4 py-3 text-[10px] font-regular shadow-none leading-[20px] tracking-[0.5px] min-w-[90px] inline-flex justify-center ${statusClass[order.status]}`}
                                >
                                  {order.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="px-5 py-4 text-center">
                                <button className="p-1 rounded-lg text-gray-400 hover:text-[#F5A623] hover:bg-orange-50 transition-colors">
                                  <MoreVertical size={16} />
                                </button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    <Pagination
                      currentPage={currentPage}
                      totalPages={Math.ceil(filteredOrders.length / ITEMS_PER_PAGE)}
                      onChange={setCurrentPage}
                    />
                  </div>
                )}

                {/* ── Refunds Tab ── */}
                {activeTab === "Refunds" && (
                  <div className="w-full overflow-hidden">
                    {currentRefunds.length === 0 ? (
                      <div className="p-8 text-center text-gray-400 text-sm">
                        {t("noRefundsFound")}
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-[#F6F6F6] hover:bg-[#F5F5F5]">
                              {[
                                t("orderId"),
                                t("dateLabel"),
                                t("summary"),
                                t("total"),
                                t("status"),
                                "",
                              ].map((col, i) => (
                                <TableHead
                                  key={i}
                                  className={`uppercase px-5 py-4 text-[12px] font-medium text-[#6B7280] leading-4 ${
                                    col === t("status") ? "text-center" : "text-start"
                                  }`}
                                >
                                  {col}
                                </TableHead>
                              ))}
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {currentRefunds.map((order, index) => (
                              <TableRow
                                key={index}
                                className="border-t border-[#EFEFEF] hover:bg-gray-50 transition-colors"
                              >
                                <TableCell className="px-5 py-4 text-[14px] font-medium text-[#E08400] leading-5">
                                  {order.id}
                                </TableCell>
                                <TableCell className="px-5 py-4 text-[14px] text-[#6B7280] leading-5">
                                  {order.date}
                                </TableCell>
                                <TableCell className="px-5 py-4 text-[14px] text-[#111827] leading-5">
                                  {order.summary}
                                </TableCell>
                                <TableCell className="px-5 py-4 text-[14px] text-[#111827] leading-5">
                                  {order.total}
                                </TableCell>
                                <TableCell className="px-5 py-4 text-center">
                                  <Badge
                                    className={`rounded-[6px] px-4 py-3 text-[10px] font-regular shadow-none leading-[20px] tracking-[0.5px] min-w-[90px] inline-flex justify-center ${statusClass[order.status]}`}
                                  >
                                    {order.status}
                                  </Badge>
                                </TableCell>
                                <TableCell className="px-5 py-4 text-center">
                                  <button className="p-1 rounded-lg text-gray-400 hover:text-[#F5A623] hover:bg-orange-50 transition-colors">
                                    <MoreVertical size={16} />
                                  </button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                    <Pagination
                      currentPage={currentPage}
                      totalPages={Math.ceil(filteredRefunds.length / ITEMS_PER_PAGE)}
                      onChange={setCurrentPage}
                    />
                  </div>
                )}

                {/* ── Wallet Tab ── */}
                {activeTab === "Wallet" && (
                  <div className="w-full overflow-hidden">
                    {currentWallet.length === 0 ? (
                      <div className="p-8 text-center text-gray-400 text-sm">
                        {t("walletEmpty")}
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-[#F6F6F6] hover:bg-[#F5F5F5]">
                              {[
                                t("transactionId"),
                                t("amount"),
                                t("reason"),
                                t("type"),
                                t("dateLabel"),
                                t("actions"),
                                ""
                              ].map((col, i) => (
                                <TableHead
                                  key={i}
                                  className="uppercase px-5 py-4 text-[12px] font-medium text-[#6B7280] leading-4 text-start"
                                >
                                  {col}
                                </TableHead>
                              ))}
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {currentWallet.map((tx, index) => (
                              <TableRow
                                key={index}
                                className="border-t border-[#EFEFEF] hover:bg-gray-50 transition-colors"
                              >
                                <TableCell className="px-5 py-4 text-[14px] font-medium text-[#E08400] leading-5">
                                  {tx.id}
                                </TableCell>
                                <TableCell
                                  className={`px-5 py-4 text-[14px] font-semibold leading-5 ${walletAmountClass[tx.type]}`}
                                >
                                  {tx.amount}
                                </TableCell>
                                <TableCell className="px-5 py-4 text-[14px] text-[#111827] leading-5">
                                  {tx.reason}
                                </TableCell>
                                <TableCell className="px-5 py-4 text-[14px] text-[#111827] leading-5">
                                  {tx.type}
                                </TableCell>
                                <TableCell className="px-5 py-4 text-[14px] text-[#6B7280] leading-5">
                                  {tx.date}
                                </TableCell>
                                <TableCell className="px-5 py-4">
                                  <div className="flex items-center gap-2">
                                    <button className="p-1 rounded-lg text-gray-400 hover:text-[#F5A623] hover:bg-orange-50 transition-colors">
                                      <Image src={EyeDet} alt="View" width={32} height={32} />
                                    </button>
                                   
                                  </div>
                                </TableCell>
                                <TableCell>
                                     <button className="p-1 rounded-lg text-gray-400 hover:text-[#F5A623] hover:bg-orange-50 transition-colors">
                                      <MoreVertical size={16} />
                                    </button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                    <Pagination
                      currentPage={currentPage}
                      totalPages={Math.ceil(filteredWallet.length / ITEMS_PER_PAGE)}
                      onChange={setCurrentPage}
                    />
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
