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
import { Badge } from "@/components/ui/badge";
import searchIcon from "@/../public/images/searchIcon.svg";
import editpen from "@/../public/images/editpen.svg";
import trashIco from "@/../public/images/trashIco.svg";
import burgerImage from "@/../public/images/burger.svg";
import ImageUploadBox from "@/components/forms/ImageUploadBox";

type CategoryStatus = "Active" | "Disabled";

type CategoryItem = {
  id: number;
  name: string;
  productsCount: string;
  available: boolean;
  status: CategoryStatus;
};

type ModalMode = "add" | "edit" | null;

const ITEMS_PER_PAGE = 10;

const categorySeed: CategoryItem[] = Array.from({ length: 36 }, (_, index) => ({
  id: index + 1,
  name: "Signature Beef",
  productsCount: "12 Items",
  available: index !== 9,
  status: index === 9 ? "Disabled" : "Active",
}));

const statusClass: Record<CategoryStatus, string> = {
  Active: "bg-[#25BB001A] text-[#20A300] hover:bg-[#E8F8E5]",
  Disabled: "bg-[#E5E7EB] text-[#9CA3AF] hover:bg-[#E5E7EB]",
};

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

function CategoryModal({
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
        className="flex max-h-[calc(100vh-48px)] w-full max-w-[590px] flex-col overflow-hidden rounded-[8px] bg-white shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#EFEFEF] px-8 py-5">
          <h2 className="text-[18px] font-bold text-[#111827]">
            {isEdit ? "Edit Category: Burgers" : "Add New Category"}
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
          <div>
            <label className={labelClass}>Category Name</label>
            <input className={inputClass} defaultValue="Burgers" />
          </div>

          {!isEdit && (
            <div>
              <label className={labelClass}>Description</label>
              <textarea
                className={`${inputClass} h-[104px] resize-none py-3`}
                placeholder="Brief description of the items in this category..."
              />
            </div>
          )}

          <div>
            <label className={labelClass}>Category Image</label>
            <ImageUploadBox file={imageFile} onFileChange={setImageFile} />
          </div>

          {isEdit && (
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-[6px]">
                <Image src={burgerImage} alt="Current category image" />
              </div>
              <span className="text-[12px] font-medium text-[#64748B]">
                Current: burger_main.jpg
              </span>
            </div>
          )}

          <div className={isEdit ? "" : "grid grid-cols-1 gap-8 sm:grid-cols-2"}>
            {!isEdit && (
              <div>
                <label className={labelClass}>Display Order</label>
                <input className={inputClass} defaultValue="1" />
              </div>
            )}

            <div>
              <label className={labelClass}>Status</label>
              <div className="flex h-[42px] items-center gap-3">
                <Toggle on={active} onChange={setActive} orange />
                <span className="text-[13px] font-medium text-[#2E2E2E]">Active</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 pt-4 sm:gap-8">
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

export default function CategoryManagementTable() {
  const [items, setItems] = useState(categorySeed);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [modalMode, setModalMode] = useState<ModalMode>(null);

  const filtered = items.filter((item) => {
    const matchSearch = !search || item.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !status || item.status === status;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const currentItems = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const toggleAvailability = (id: number) =>
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              available: !item.available,
              status: item.available ? "Disabled" : "Active",
            }
          : item
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
              placeholder="Search categories by name..."
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
          Add New Category
        </button>
      </div>

      <div className="overflow-hidden rounded-[8px] border border-[#DCE0E5] bg-white">
        <Table className="min-w-[850px]">
          <TableHeader>
            <TableRow className="bg-[#F6F6F6] hover:bg-[#F6F6F6]">
              {["Image", "Category Name", "Products Count", "Availability", "Status", "Actions"].map((head) => (
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
                  {item.productsCount}
                </TableCell>
                <TableCell className="px-5 py-3">
                  <Toggle on={item.available} onChange={() => toggleAvailability(item.id)} />
                </TableCell>
                <TableCell className="px-5 py-3">
                  <Badge className={`min-w-[80px] rounded-[6px] px-4 py-2 text-[10px] font-medium shadow-none ${statusClass[item.status]}`}>
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell className="px-5 py-3">
                  <div className="flex items-center gap-1">
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

      {modalMode && <CategoryModal mode={modalMode} onClose={() => setModalMode(null)} />}
    </div>
  );
}
