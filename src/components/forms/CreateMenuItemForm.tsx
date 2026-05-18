// components/forms/CreateMenuItemForm.tsx

"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import upload from "@/.././public/images/upload.svg";
import Image from "next/image";

// ─── Types ────────────────────────────────────────────────────────────────────
interface ExtraItem {
  id:    number;
  name:  string;
  price: string;
}

interface BranchItem {
  id:      number;
  label:   string;
  checked: boolean;
}

type FormState = {
  name:        string;
  category:    string;
  description: string;
  price:       string;
  imageFile:   File | null;
};

// ─── Shared style tokens (mirrors CreateCouponForm) ───────────────────────────
const inputClass =
  "w-full rounded-[8px] border border-[#E0E0E0] bg-white px-4 py-2.5 text-[13px] text-[#2E2E2E] placeholder-[#BDBDBD] focus:outline-none focus:ring-2 focus:ring-[#FF8A00]/30 focus:border-[#FF8A00] transition";

const labelClass = "block text-[13px] font-semibold text-[#2E2E2E] mb-1.5";

const BRANCHES = ["Downtown", "Uptown", "Heliopolis", "Maadi", "Zamalek"];

// ─── CreateMenuItemForm ───────────────────────────────────────────────────────
export default function CreateMenuItemForm() {
  const t      = useTranslations("CreateMenuItem");
  const router = useRouter();

  // ── form state ──────────────────────────────────────────────────────────────
  const [form, setForm] = useState<FormState>({
    name:        "",
    category:    "Burgers",
    description: "",
    price:       "",
    imageFile:   null,
  });

  const [extras, setExtras] = useState<ExtraItem[]>([
    { id: 1, name: "Extra Cheese", price: "1.50 LE" },
    { id: 2, name: "Extra Cheese", price: "1.50 LE" },
  ]);

  const [branches, setBranches] = useState<BranchItem[]>(
    BRANCHES.map((label, i) => ({ id: i + 1, label, checked: true }))
  );

  const [branchSearch, setBranchSearch] = useState<string>("");
  const [dragging,     setDragging]     = useState<boolean>(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // ── helpers ──────────────────────────────────────────────────────────────────
  const set =
    (key: keyof Omit<FormState, "imageFile">) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const addExtra = () =>
    setExtras((prev) => [...prev, { id: Date.now(), name: "", price: "" }]);

  const removeExtra = (id: number) =>
    setExtras((prev) => prev.filter((x) => x.id !== id));

  const updateExtra = (id: number, field: keyof Omit<ExtraItem, "id">, value: string) =>
    setExtras((prev) => prev.map((x) => (x.id === id ? { ...x, [field]: value } : x)));

  const toggleBranch = (id: number) =>
    setBranches((prev) =>
      prev.map((b) => (b.id === id ? { ...b, checked: !b.checked } : b))
    );

  const selectAll = () =>
    setBranches((prev) => prev.map((b) => ({ ...b, checked: true })));

  const filteredBranches = branches.filter((b) =>
    b.label.toLowerCase().includes(branchSearch.toLowerCase())
  );

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) setForm((prev) => ({ ...prev, imageFile: file }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setForm((prev) => ({ ...prev, imageFile: file }));
  };

  const handleSubmit = () => {
    console.log("Submit:", { form, extras, branches });
    // wire to API here
  };

  // ── render ───────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col gap-6 items-start max-w-[1069px] mt-14">

      {/* ══════════════════════════════════════════════
          LEFT COLUMN
      ══════════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col gap-5 w-full">

        {/* ── Item Information ────────────────────────────────────────────── */}
        <section className="bg-white pb-8 w-full">
          <h2 className="text-[20px] font-semibold text-[#111827] mb-6 leading-5 mx-6">
            {t("sections.itemInformation")}
          </h2>

          <div className="flex flex-col gap-8 rounded-b-[12px] border border-[#EFEFEF] p-6 pb-9 w-full">

            {/* Name + Category */}
            <div className="flex gap-4 ">
              <div className="flex-1">
                <label className={labelClass}>{t("fields.itemName")}</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={set("name")}
                  placeholder={t("fields.itemNamePlaceholder")}
                  className={inputClass}
                />
              </div>

              <div className="flex-1">
                <label className={labelClass}>{t("fields.category")}</label>
                <div className="relative">
                  <select
                    value={form.category}
                    onChange={set("category")}
                    className={`${inputClass} appearance-none pr-8`}
                  >
                    <option value="Burgers">{t("categories.burgers")}</option>
                    <option value="Side">{t("categories.side")}</option>
                    <option value="Drink">{t("categories.drink")}</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#BDBDBD]">
                    ▾
                  </span>
                </div>
              </div>
            </div>

            {/* Description + Price */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className={labelClass}>{t("fields.itemDescription")}</label>
                <textarea
                  value={form.description}
                  onChange={set("description")}
                  placeholder={t("fields.itemDescriptionPlaceholder")}
                  rows={3}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <div className="flex-1">
                <label className={labelClass}>{t("fields.price")}</label>
                <input
                  type="number"
                  value={form.price}
                  onChange={set("price")}
                  placeholder="0.00"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className={labelClass}>{t("fields.itemImage")}</label>
              <div
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileRef.current?.click()}
                className={`flex flex-col items-center justify-center gap-1 h-[146px] w-[443px] rounded-[8px] border-2 border-dashed cursor-pointer transition-colors ${
                  dragging
                    ? "border-[#FF8A00] bg-[#FFF7ED]"
                    : "border-[#E0E0E0] bg-[#FAFAFA] hover:border-[#FF8A00] hover:bg-[#FFF7ED]"
                }`}
              >
                {form.imageFile ? (
                  <span className="text-[13px] text-[#25BB00] font-medium">
                    {form.imageFile.name}
                  </span>
                ) : (
                  <>
                    <Image  src={upload} alt="Upload" width={24} height={24}/>
                    <span className="text-[12px] text-[#0F172A]">{t("fields.imageUploadLabel")}</span>
                    <span className="text-[11px] text-[#94A3B8]">{t("fields.imageUploadHint")}</span>
                  </>
                )}
                <input
                  ref={fileRef}
                  type="file"
                  accept=".svg,.png,.jpg,.jpeg"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Extra ───────────────────────────────────────────────────────── */}
        <section className="bg-white pb-8 w-full">
                    <div className="flex items-center justify-between w-full">
          <h2 className="text-[20px] font-semibold text-[#111827] mb-6 leading-5 mx-6">
            {t("sections.extra")}
          </h2>
   <button
              type="button"
              onClick={addExtra}
              className="self-end text-[14px] font-bold text-[#DC1213]  transition"
            >
              {t("extra.addExtra")}
            </button>
            </div>
          <div className="flex flex-col gap-4 rounded-b-[12px] border border-[#EFEFEF] p-6 pb-9">

            {extras.map((ex) => (
              <div key={ex.id} className="flex items-center gap-3">
                <input
                  type="text"
                  value={ex.name}
                  onChange={(e) => updateExtra(ex.id, "name", e.target.value)}
                  placeholder={t("extra.namePlaceholder")}
                  className={`${inputClass} flex-1`}
                />
                <input
                  type="text"
                  value={ex.price}
                  onChange={(e) => updateExtra(ex.id, "price", e.target.value)}
                  placeholder="0.00 LE"
                  className={`${inputClass} w-[120px]`}
                />
                <button
                  type="button"
                  onClick={() => removeExtra(ex.id)}
                  className="p-2 rounded-[8px] text-[#BDBDBD] hover:text-[#DC1213] hover:bg-red-50 transition-colors"
                  aria-label={t("extra.remove")}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                    <path d="M10 11v6M14 11v6" />
                    <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                  </svg>
                </button>
              </div>
            ))}

         
          </div>
        </section>

      </div>

      {/* ══════════════════════════════════════════════
          RIGHT COLUMN — Branch Availability
      ══════════════════════════════════════════════ */}
      <div className="w-full relative shrink-0 bg-white p-5 flex flex-col gap-2">

        {/* Header */}
        <div className="flex flex-col items-center justify-between">
          <div className="flex items-center justify-between w-full">
            <h2 className="text-[20px] font-semibold text-[#111827] mb-6 leading-5 mx-6">
              {t("sections.branchAvailability")}
            </h2>
          
          </div>
        </div>

        <div className="rounded-b-[12px] border border-[#E5E7EB] pb-16 pt-8 px-2">

          {/* Branch search */}
          <div className="relative mb-4">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#BDBDBD]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <input
              type="text"
              value={branchSearch}
              onChange={(e) => setBranchSearch(e.target.value)}
              placeholder={t("branches.searchPlaceholder")}
              className="w-full rounded-[8px] border border-[#E0E0E0] bg-white pl-8 pr-3 py-1 text-[14px] text-[#6B7280] placeholder-[#BDBDBD] focus:outline-none focus:ring-2 focus:ring-[#FF8A00]/30 focus:border-[#FF8A00] transition"
            />
          </div>

          {/* Branch list */}
          <div className="flex flex-wrap justify-start gap-4 gap-3">
            {filteredBranches.map((branch) => (
              <label
                key={branch.id}
                className="flex items-center justify-start gap-4 w-[215px] px-3 py-3 rounded-[8px] border border-[#E2E8F0] cursor-pointer bg-[#E084000D] transition"
              >
                 <div
                  className={`h-[18px] w-[18px] rounded-[4px] border-2 flex items-center justify-center transition-colors ${
                    branch.checked
                      ? "bg-[#DC1213] border-[#DC1213]"
                      : "bg-white border-[#DEDEDE]"
                  }`}
                >
                  {branch.checked && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path
                        d="M1 4L3.5 6.5L9 1"
                        stroke="white"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <span className="text-[13px] text-[#2E2E2E] font-medium">
                  {branch.label}
                </span>
                <input
                  type="checkbox"
                  checked={branch.checked}
                  onChange={() => toggleBranch(branch.id)}
                  className="hidden"
                />
               
              </label>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-16">
          <button
            onClick={handleSubmit}
            className="cursor-pointer px-8 py-2 min-w-[179px] rounded-[10px] bg-[#DC1213] text-white font-bold text-[16px]"
          >
            {t("actions.save")}
          </button>
           <button
            onClick={() => router.back()}
            className="cursor-pointer px-6 py-2 min-w-[179px] rounded-[10px] border border-[#DC1213] text-[#DC1213] font-bold text-[16px]"
          >
            {t("actions.cancel")}
          </button>
        </div>
      </div>

    </div>
  );
}