"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BannerFormData {
  title: string;
  redirectLink: string;
  startDate: string;
  endDate: string;
  mediaFile: File | null;
}

export interface BannerModalProps {
  mode: "add" | "edit";
  initialData?: Partial<BannerFormData>;
  onClose: () => void;
  onSave: (data: BannerFormData) => void;
}

// ─── Defaults ─────────────────────────────────────────────────────────────────

const emptyForm: BannerFormData = {
  title: "",
  redirectLink: "",
  startDate: "",
  endDate: "",
  mediaFile: null,
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function BannerModal({ mode, initialData, onClose, onSave }: BannerModalProps) {
  const t      = useTranslations("PromotionalBanners");
  const isEdit = mode === "edit";

  const [form, setForm]       = useState<BannerFormData>({ ...emptyForm, ...initialData });
  const [dragging, setDragging] = useState(false);

  const handleChange =
    (key: keyof BannerFormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) setForm((prev) => ({ ...prev, mediaFile: file }));
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setForm((prev) => ({ ...prev, mediaFile: file }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-[480px] mx-4 bg-white rounded-[16px] shadow-xl p-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[18px] font-bold text-[#2E2E2E]">
            {isEdit ? t("editModalTitle") : t("addModalTitle")}
          </h2>
          <button
            onClick={onClose}
            aria-label={t("closeModal")}
            className="text-[#9E9E9E] hover:text-[#2E2E2E] transition-colors text-xl leading-none"
          >
            ✕
          </button>
        </div>

        {/* Fields */}
        <div className="space-y-5">

          {/* Banner Title */}
          <div>
            <label className="block text-[14px] font-semibold text-[#2E2E2E] mb-2">
              {t("bannerTitle")}
            </label>
            <input
              type="text"
              value={form.title}
              onChange={handleChange("title")}
              placeholder="Summer Deal 2024"
              className="w-full px-4 py-[10px] rounded-[8px] border border-[#E0E0E0] text-sm text-[#2E2E2E] placeholder-[#BDBDBD] focus:outline-none focus:ring-2 focus:ring-[#F5A623]/30 focus:border-[#F5A623] transition"
            />
          </div>

          {/* Media Upload */}
          <div>
            <label className="block text-[14px] font-semibold text-[#2E2E2E] mb-2">
              {t("media")}
            </label>
            <div
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              className={`relative flex flex-col items-center justify-center h-[120px] rounded-[10px] border-2 border-dashed transition-colors cursor-pointer
                ${dragging ? "border-[#F5A623] bg-orange-50" : "border-[#E0E0E0] bg-[#FAFAFA]"}`}
            >
              <input
                type="file"
                accept=".svg,.png,.jpg,.jpeg"
                onChange={handleFileInput}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              {form.mediaFile ? (
                <p className="text-[13px] text-[#20A300] font-medium px-4 text-center truncate max-w-full">
                  {form.mediaFile.name}
                </p>
              ) : (
                <>
                  <svg className="mb-2 text-[#BDBDBD]" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  <p className="text-[13px] text-[#9E9E9E]">{t("mediaUploadLabel")}</p>
                  <p className="text-[11px] text-[#BDBDBD] mt-1">{t("mediaFormats")}</p>
                </>
              )}
            </div>
          </div>

          {/* Redirect Link */}
          <div>
            <label className="block text-[14px] font-semibold text-[#2E2E2E] mb-2">
              {t("redirectLink")}
            </label>
            <input
              type="text"
              value={form.redirectLink}
              onChange={handleChange("redirectLink")}
              placeholder="/promo/summer-deal"
              className="w-full px-4 py-[10px] rounded-[8px] border border-[#E0E0E0] text-sm text-[#2E2E2E] placeholder-[#BDBDBD] focus:outline-none focus:ring-2 focus:ring-[#F5A623]/30 focus:border-[#F5A623] transition"
            />
          </div>

          {/* Start & End Date */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-[14px] font-semibold text-[#2E2E2E] mb-2">
                {t("startDate")}
              </label>
              <input
                type="date"
                value={form.startDate}
                onChange={handleChange("startDate")}
                className="w-full px-4 py-[10px] rounded-[8px] border border-[#E0E0E0] text-sm text-[#2E2E2E] focus:outline-none focus:ring-2 focus:ring-[#F5A623]/30 focus:border-[#F5A623] transition"
              />
            </div>
            <div className="flex-1">
              <label className="block text-[14px] font-semibold text-[#2E2E2E] mb-2">
                {t("endDate")}
              </label>
              <input
                type="date"
                value={form.endDate}
                onChange={handleChange("endDate")}
                className="w-full px-4 py-[10px] rounded-[8px] border border-[#E0E0E0] text-sm text-[#2E2E2E] focus:outline-none focus:ring-2 focus:ring-[#F5A623]/30 focus:border-[#F5A623] transition"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-1">
            <button
              onClick={() => onSave(form)}
              className="flex-1 py-[10px] rounded-[10px] bg-[#DC1213] text-white text-[15px] font-bold hover:bg-[#b80f10] transition-colors"
            >
              {isEdit ? t("saveButton") : t("createButton")}
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-[10px] rounded-[10px] border border-[#DC1213] text-[#DC1213] text-[15px] font-semibold hover:bg-red-50 transition-colors"
            >
              {t("cancelButton")}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}