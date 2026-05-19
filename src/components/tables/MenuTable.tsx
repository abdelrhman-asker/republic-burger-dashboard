// components/tables/MenuTable.tsx

"use client";

import { useState } from "react";
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

// ─── Types ────────────────────────────────────────────────────────────────────
type ItemStatus   = "Active" | "Inactive" | "Out Stock";
type ItemCategory = "Burger" | "Side" | "Drink";

interface MenuItem {
  id:        number;
  name:      string;
  category:  ItemCategory;
  available: boolean;
  price:     string;
  status:    ItemStatus;
}

interface MenuTableProps {
  onAddNew: () => void;
}

// ─── Badge colour maps ────────────────────────────────────────────────────────
const statusClass: Record<ItemStatus, string> = {
  Active:      "bg-[#25BB001A] text-[#25BB00] hover:bg-[#E8F8E5]",
  Inactive:    "bg-[#FF8A001A] text-[#FF8A00] hover:bg-[#FFF3E0]",
  "Out Stock": "bg-[#FF5E2C1A] text-[#FF5E2C] hover:bg-[#FFECE6]",
};

// ─── Toggle ───────────────────────────────────────────────────────────────────
interface ToggleProps {
  on:       boolean;
  onChange: (value: boolean) => void;
}

function Toggle({ on, onChange }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className={`relative inline-flex h-[22px] w-[40px] cursor-pointer rounded-full transition-colors duration-200 focus:outline-none ${
        on ? "bg-[#25BB00]" : "bg-gray-300"
      }`}
    >
      <span
        className={`inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow transition-transform duration-200 mt-[3px] ${
          on ? "translate-x-[21px]" : "translate-x-[3px]"
        }`}
      />
    </button>
  );
}

// ─── Seed data ────────────────────────────────────────────────────────────────
const STATUS_SEED: ItemStatus[] = [
  "Active", "Active", "Inactive", "Out Stock",
  "Active", "Active", "Active",   "Active",
  "Active", "Active", "Active",   "Active",
];

const CATEGORY_SEED: ItemCategory[] = ["Burger", "Side", "Drink"];

const allItems: MenuItem[] = Array.from({ length: 12 }, (_, i) => ({
  id:        i + 1,
  name:      "Juicy Lucy",
  category:  CATEGORY_SEED[i % 3],
  available: i !== 3,
  price:     "49 L.E",
  status:    STATUS_SEED[i],
}));

// ─── Constants ────────────────────────────────────────────────────────────────
const ITEMS_PER_PAGE = 10;

// ─── MenuTable ────────────────────────────────────────────────────────────────
export default function MenuTable({ onAddNew }: MenuTableProps) {
  const t = useTranslations("Menu");

  // Tab keys stay as English data values (used for filtering).
  // Only the displayed label is translated.
  type TabValue = "All" | ItemCategory;

  const TABS: { key: TabValue; label: string }[] = [
    { key: "All",    label: t("tabs.all")    },
    { key: "Burger", label: t("tabs.burger") },
    { key: "Side",   label: t("tabs.side")   },
    { key: "Drink",  label: t("tabs.drink")  },
  ];

  const [tab,         setTab]  = useState<TabValue>("All");
  const [search,   setSearch]  = useState<string>("");
  const [branch,   setBranch]  = useState<string>("");
  const [status,   setStatus]  = useState<string>("");
  const [currentPage, setPage] = useState<number>(1);
  const [items,     setItems]  = useState<MenuItem[]>(allItems);

  // ── filtering ──────────────────────────────────────────────────────────────
  const filtered = items.filter((item) => {
    const matchTab    = tab === "All" || item.category === tab;
    const matchSearch = !search || item.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !status  || item.status === status;
    return matchTab && matchSearch && matchStatus;
  });

  const totalPages   = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const startIndex   = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // ── helpers ────────────────────────────────────────────────────────────────
  const handleFilter =
    (setter: (v: string) => void) =>
    (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
      setter(e.target.value);
      setPage(1);
    };

  const toggleAvail = (id: number): void =>
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, available: !it.available } : it))
    );

  // Translated status labels — keeps badge data key intact, only display changes
  const statusLabel: Record<ItemStatus, string> = {
    Active:      t("status.active"),
    Inactive:    t("status.inactive"),
    "Out Stock": t("status.outStock"),
  };

  // Translated category labels for table cells
  const categoryLabel: Record<ItemCategory, string> = {
    Burger: t("tabs.burger"),
    Side:   t("tabs.side"),
    Drink:  t("tabs.drink"),
  };

  const selectCls =
    "px-4 py-2 rounded-xl border border-gray-200 text-sm text-gray-700 bg-white " +
    "focus:outline-none focus:ring-2 focus:ring-[#F5A623]/30 focus:border-[#F5A623] transition";

  // ── render ─────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-4 mt-17.5">
      {/* Filters */}
      <div className="flex  items-center gap-3 flex-wrap justify-between my-6 mb-15">
        <div className="flex items-center gap-5 flex-wrap mx-4">
        {/* Search */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">
            <Image src={searchIcon} alt="Search" width={16} height={16} />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("filters.searchPlaceholder")}
            className="pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-sm text-gray-700 bg-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F5A623]/30 focus:border-[#F5A623] transition xl:w-[445px]"
          />
        </div>

        {/* Branch */}
        <select value={branch} onChange={handleFilter(setBranch)} className={selectCls}>
          <option value="">{t("filters.allBranches")}</option>
          <option value="Downtown">{t("filters.downtown")}</option>
          <option value="Uptown">{t("filters.uptown")}</option>
        </select>

        {/* Status — option values stay English (used as filter keys) */}
        <select value={status} onChange={handleFilter(setStatus)} className={selectCls}>
          <option value="">{t("filters.statusAll")}</option>
          <option value="Active">{t("filters.statusActive")}</option>
          <option value="Inactive">{t("filters.statusInactive")}</option>
          <option value="Out Stock">{t("filters.statusOutStock")}</option>
        </select>
</div>
        {/* Add New Item */}
        <button
          onClick={onAddNew}
          className="px-13 w-[212px] py-2 rounded-xl bg-[#DC1213] text-white text-[16px] font-bold  whitespace-nowrap"
        >
          {t("addNewItem")}
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex border-b border-gray-200">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => { setTab(key); setPage(1); }}
            className={`py-1 px-3 mx-2.5 text-lg font-medium border-b-2 -mb-px transition-colors duration-150 ${
              tab === key
                ? "border-[#E53935] text-[#E53935] font-bold"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Table Card */}
      <div className="w-full overflow-hidden border border-[#DCE0E5] rounded-[12px] rounded-b-none bg-white">
        <div className="overflow-x-auto">
          <Table className="min-w-[850px]">

            <TableHeader>
              <TableRow className="bg-[#F6F6F6] hover:bg-[#F5F5F5]">
                {[
                  t("table.image"),
                  t("table.itemName"),
                  t("table.category"),
                  t("table.availability"),
                  t("table.price"),
                  t("table.status"),
                  t("table.actions"),
                ].map((h) => (
                  <TableHead
                    key={h}
                    className="px-5 py-4 text-[14px] font-semibold text-[#2E2E2E] text-start"
                  >
                    {h}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {currentItems.map((item) => (
                <TableRow key={item.id} className="border-b border-[#EFEFEF] hover:bg-transparent">

                  {/* Image */}
                  <TableCell className="px-5 py-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-200" />
                  </TableCell>

                  {/* Name */}
                  <TableCell className="px-5 py-3 text-[13px] text-[#2E2E2EB3] font-medium">
                    {item.name}
                  </TableCell>

                  {/* Category */}
                  <TableCell className="px-5 py-3 text-[13px] text-[#2E2E2EB3] font-medium">
                    {categoryLabel[item.category]}
                  </TableCell>

                  {/* Availability */}
                  <TableCell className="px-5 py-3">
                    <Toggle on={item.available} onChange={() => toggleAvail(item.id)} />
                  </TableCell>

                  {/* Price */}
                  <TableCell className="px-5 py-3 text-[13px] text-[#2E2E2EB3] font-medium">
                    {item.price}
                  </TableCell>

                  {/* Status */}
                  <TableCell className="px-5 py-3">
                    <Badge
                      className={`rounded-[6px] px-4 py-1.5 text-[10px] font-semibold shadow-none min-w-[80px] inline-flex justify-center ${statusClass[item.status]}`}
                    >
                      {statusLabel[item.status]}
                    </Badge>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 rounded-lg text-gray-400 hover:text-[#F5A623] hover:bg-orange-50 transition-colors text-base">
                        <Image src={editpen} alt="Edit" width={32} height={32} />
                      </button>
                      <button className="p-1.5 rounded-lg text-gray-400 hover:text-[#F5A623] hover:bg-orange-50 transition-colors text-base">
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
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="text-[18px] font-bold text-[#FF8A00] disabled:opacity-30 cursor-pointer"
          >
            {t("pagination.previous")}
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`h-7 w-7 rounded-[6px] text-[13px] font-semibold transition-colors cursor-pointer ${
                p === currentPage
                  ? "bg-[#FF8A00] text-white"
                  : "bg-[#F1F1F1] text-[#6E6E6E] hover:bg-[#E5E5E5]"
              }`}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="text-[18px] font-bold text-[#FF8A00] disabled:opacity-30 cursor-pointer"
          >
            {t("pagination.next")}
          </button>
        </div>
      </div>
    </div>
  );
}