"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import searchIcon from "@/../public/images/searchIcon.svg";
import editpen from "@/../public/images/editpen.svg";
import trashIco from "@/../public/images/trashIco.svg";
import ImageUploadBox from "@/components/forms/ImageUploadBox";

type ExtraTab = "All Extras" | "Active" | "Disabled";
type ModalMode = "add" | "edit" | null;

type ExtraItem = {
  id: number;
  name: string;
  linkedItems: string;
  available: boolean;
  price: string;
};

const ITEMS_PER_PAGE = 10;

const extraSeed: ExtraItem[] = Array.from({ length: 34 }, (_, index) => ({
  id: index + 1,
  name: "Cheddar Cheese",
  linkedItems: "12 Items",
  available: index !== 9,
  price: "45LE",
}));

const inputClass =
  "w-full rounded-[8px] border border-[#E0E0E0] bg-[#F8FAFC] px-4 h-[42px] text-[13px] text-[#2E2E2E] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#FF8A00]/30 focus:border-[#FF8A00] transition";

const labelClass = "block text-[13px] font-semibold text-[#2E2E2E] mb-2";

function Toggle({
  on,
  onChange,
  orange = false,
}: {
  on: boolean;
  onChange: (value: boolean) => void;
  orange?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className={`relative inline-flex h-[20px] w-[38px] cursor-pointer rounded-full transition-colors ${
        on ? (orange ? "bg-[#FF8A00]" : "bg-[#22C55E]") : "bg-[#8C8C8C]"
      }`}
    >
      <span
        className={`mt-[3px] inline-block h-[14px] w-[14px] rounded-full bg-white shadow transition-transform ${
          on ? "translate-x-[21px]" : "translate-x-[3px]"
        }`}
      />
    </button>
  );
}

function Tag({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-[4px] bg-[#FFF3E0] px-3 py-1 text-[12px] font-medium text-[#FF8A00]">
      {label}
      <X size={12} />
    </span>
  );
}

function ExtraModal({
  mode,
  onClose,
}: {
  mode: Exclude<ModalMode, null>;
  onClose: () => void;
}) {
  const isEdit = mode === "edit";
  const [active, setActive] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/35 px-4 py-6"
      onClick={onClose}
    >
      <div
        className="flex max-h-[calc(100vh-48px)] w-full max-w-[650px] flex-col overflow-hidden rounded-[8px] bg-white shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#EFEFEF] px-8 py-5">
          <h2 className="text-[18px] font-bold text-[#111827]">
            {isEdit ? "Edit Extra" : "Add New Extra"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-[#94A3B8] hover:text-[#2E2E2E]"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-6 overflow-y-auto px-8 py-7">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Extra Name</label>
              <input className={inputClass} defaultValue={isEdit ? "Extra Cheddar Cheese" : ""} placeholder="Extra Cheddar Cheese" />
            </div>
            <div>
              <label className={labelClass}>Price</label>
              <input className={inputClass} defaultValue={isEdit ? "6.00" : ""} placeholder="0.00" />
            </div>
            <div>
              <label className={labelClass}>Category Type</label>
              <input className={inputClass} defaultValue={isEdit ? "Linked Cheddar Cheese" : ""} placeholder="Extra Cheddar Cheese" />
            </div>
            <div>
              <label className={labelClass}>Availability</label>
              <div className="flex h-[42px] items-center gap-3">
                <Toggle on={active} onChange={setActive} orange />
                <span className="text-[13px] font-medium text-[#2E2E2E]">Active</span>
              </div>
            </div>
          </div>

          <div>
            <label className={labelClass}>Linked Menu Items</label>
            <div className="flex min-h-[42px] flex-wrap items-center gap-2 rounded-[8px] border border-[#E0E0E0] bg-white px-3 py-2">
              <Tag label="Classic Burger" />
              <Tag label="BBQ Burger" />
              <input
                className="min-w-[120px] flex-1 text-[13px] outline-none placeholder:text-[#9CA3AF]"
                placeholder="Search items..."
              />
            </div>
            <p className="mt-2 text-[11px] text-[#94A3B8]">
              This extra will appear as an option for these items.
            </p>
          </div>

          <div>
            <label className={labelClass}>Extra Image</label>
            <ImageUploadBox file={imageFile} onFileChange={setImageFile} />
          </div>

          <div className="flex flex-wrap justify-center gap-4 pt-8 sm:gap-8">
            <button className="min-w-[150px] rounded-[8px] bg-[#DC1213] px-8 py-2.5 text-[14px] font-bold text-white">
              {isEdit ? "Save" : "Create"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="min-w-[150px] rounded-[8px] border border-[#DC1213] px-8 py-2.5 text-[14px] font-bold text-[#DC1213]"
            >
              cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExtrasManagementTable() {
  const [items, setItems] = useState(extraSeed);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [tab, setTab] = useState<ExtraTab>("All Extras");
  const [modalMode, setModalMode] = useState<ModalMode>(null);

  const filtered = items.filter((item) => {
    const matchSearch = !search || item.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !status || (status === "Active" ? item.available : !item.available);
    const matchTab =
      tab === "All Extras" || (tab === "Active" ? item.available : !item.available);
    return matchSearch && matchStatus && matchTab;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const currentItems = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const toggleAvailability = (id: number) =>
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, available: !item.available } : item
      )
    );

  return (
    <div className="mt-16 space-y-7">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-5">
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
              <Image src={searchIcon} alt="Search" width={15} height={15} />
            </span>
            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by extra name or category..."
              className="h-[38px] max:w-[430px] lg:w-[430px] rounded-[8px] border border-gray-200 bg-white pl-9 pr-4 text-[13px] text-gray-700 placeholder-gray-300 focus:border-[#F5A623] focus:outline-none focus:ring-2 focus:ring-[#F5A623]/30"
            />
          </div>

          <select
            value={status}
            onChange={(event) => {
              setStatus(event.target.value);
              setCurrentPage(1);
            }}
            className="h-[38px] rounded-[8px] border border-gray-200 bg-white px-4 text-[13px] text-gray-700 focus:border-[#F5A623] focus:outline-none focus:ring-2 focus:ring-[#F5A623]/30"
          >
            <option value="">Status: All</option>
            <option value="Active">Active</option>
            <option value="Disabled">Disabled</option>
          </select>
        </div>

        <button
          onClick={() => setModalMode("add")}
          className="rounded-[8px] bg-[#DC1213] px-14 py-2.5 text-[14px] font-bold text-white"
        >
          Add New Extra
        </button>
      </div>

      <div className="flex border-b border-[#EFEFEF]">
        {(["All Extras", "Active", "Disabled"] as ExtraTab[]).map((item) => (
          <button
            key={item}
            onClick={() => {
              setTab(item);
              setCurrentPage(1);
            }}
            className={`px-4 py-3 text-[15px] font-medium ${
              tab === item
                ? "border-b-2 border-[#DC1213] text-[#DC1213]"
                : "text-[#9CA3AF]"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-[8px] border border-[#DCE0E5] bg-white">
        <Table className="min-w-[850px]">
          <TableHeader>
            <TableRow className="bg-[#F6F6F6] hover:bg-[#F6F6F6]">
              {["Image", "Extra Name", "Linked Menu Items", "Availability", "Price", "Actions"].map((head) => (
                <TableHead key={head} className="px-5 py-4 text-start text-[14px] font-semibold text-[#2E2E2E]">
                  {head}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((item) => (
              <TableRow key={item.id} className="border-b border-[#EFEFEF] hover:bg-transparent">
                <TableCell className="px-5 py-3">
                  <div className="h-[45px] w-[45px] rounded-[8px] bg-[#C8C8C8]" />
                </TableCell>
                <TableCell className="px-5 py-3 text-[13px] font-medium text-[#2E2E2EB3]">
                  {item.name}
                </TableCell>
                <TableCell className="px-5 py-3 text-[13px] font-medium text-[#2E2E2EB3]">
                  {item.linkedItems}
                </TableCell>
                <TableCell className="px-5 py-3">
                  <Toggle on={item.available} onChange={() => toggleAvailability(item.id)} />
                </TableCell>
                <TableCell className="px-5 py-3 text-[13px] font-medium text-[#2E2E2EB3]">
                  {item.price}
                </TableCell>
                <TableCell className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <button onClick={() => setModalMode("edit")} className="p-1.5">
                      <Image src={editpen} alt="Edit" width={28} height={28} />
                    </button>
                    <button className="p-1.5">
                      <Image src={trashIco} alt="Delete" width={28} height={28} />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex items-center justify-end gap-2 px-5 py-9">
          <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} className="text-[18px] font-bold text-[#FF8A00]">
            &lt;
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`h-7 w-7 rounded-[6px] text-[13px] font-semibold ${
                page === currentPage ? "bg-[#FF8A00] text-white" : "bg-[#F1F1F1] text-[#6E6E6E]"
              }`}
            >
              {page}
            </button>
          ))}
          <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} className="text-[18px] font-bold text-[#FF8A00]">
            &gt;
          </button>
        </div>
      </div>

      {modalMode && <ExtraModal mode={modalMode} onClose={() => setModalMode(null)} />}
    </div>
  );
}
