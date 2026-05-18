"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import ImageUploadBox from "@/components/forms/ImageUploadBox";

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

  const [form, setForm] = useState<BannerFormData>({ ...emptyForm, ...initialData });

  const handleChange =
    (key: keyof BannerFormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
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
            <ImageUploadBox
              file={form.mediaFile}
              onFileChange={(file) => setForm((prev) => ({ ...prev, mediaFile: file }))}
              label={t("mediaUploadLabel")}
              hint={t("mediaFormats")}
              className="h-[120px] rounded-[10px]"
            />
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
