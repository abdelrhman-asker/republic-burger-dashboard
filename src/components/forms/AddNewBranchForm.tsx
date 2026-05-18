"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Clock, Truck } from "lucide-react";
import { useRouter } from "@/i18n/navigation";

type BranchFormData = {
  branchName: string;
  branchAddress: string;
  city: string;
  managerName: string;
  openingHours: string;
  closingHours: string;
  deliveryAvailable: boolean;
};

const emptyForm: BranchFormData = {
  branchName: "",
  branchAddress: "",
  city: "",
  managerName: "",
  openingHours: "",
  closingHours: "",
  deliveryAvailable: true,
};

const staticBranches: Record<string, BranchFormData> = {
  "1": {
    branchName: "Doki",
    branchAddress: "26 Tahrir Street, Downtown",
    city: "Alexandria",
    managerName: "Ahmed Ali",
    openingHours: "09:00",
    closingHours: "23:00",
    deliveryAvailable: true,
  },
  "2": {
    branchName: "Doki",
    branchAddress: "14 Corniche Road, Down Town",
    city: "Alexandria",
    managerName: "Mona Hassan",
    openingHours: "10:00",
    closingHours: "22:30",
    deliveryAvailable: false,
  },
  "3": {
    branchName: "Doki",
    branchAddress: "8 Lebanon Street, Down Town",
    city: "Cairo",
    managerName: "Omar Khaled",
    openingHours: "08:30",
    closingHours: "00:00",
    deliveryAvailable: true,
  },
};

const inputClass =
  "w-full rounded-[8px] border border-[#E0E0E0] bg-[#F8FAFC] px-4 h-[50px] text-[13px] text-[#2E2E2E] placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#FF8A00]/30 focus:border-[#FF8A00] transition";

const disabledInputClass =
  "disabled:cursor-default disabled:border-[#E5E7EB] disabled:bg-[#F8FAFC] disabled:text-[#2E2E2E] disabled:opacity-100";

const labelClass = "block text-[13px] font-semibold text-[#2E2E2E] mb-1.5";

function DeliveryToggle({
  checked,
  onChange,
  disabled = false,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`relative inline-flex h-[22px] w-[40px] shrink-0 cursor-pointer rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF8A00]/30 ${
        checked ? "bg-[#FF8A00]" : "bg-gray-300"
      } ${disabled ? "cursor-default" : ""}`}
    >
      <span
        className={`mt-[3px] inline-block h-[16px] w-[16px] rounded-full bg-white shadow transition-transform duration-200 ${
          checked ? "translate-x-[21px]" : "translate-x-[3px]"
        }`}
      />
    </button>
  );
}

type AddNewBranchFormProps = {
  mode?: "create" | "edit" | "view";
  branchId?: string;
};

export default function AddNewBranchForm({
  mode = "create",
  branchId,
}: AddNewBranchFormProps) {
  const t = useTranslations("Branches");
  const router = useRouter();
  const isView = mode === "view";
  const isCreate = mode === "create";
  const initialForm =
    !isCreate && branchId ? staticBranches[branchId] ?? staticBranches["1"] : emptyForm;

  const [form, setForm] = useState<BranchFormData>(initialForm);

  const set =
    (key: keyof Omit<BranchFormData, "deliveryAvailable">) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      !isView &&
      setForm((prev) => ({ ...prev, [key]: event.target.value }));

  const handleSubmit = () => {
    router.push("/branches");
  };

  return (
    <div className="max-w-[1100px] space-y-8">
      <section className="bg-white pb-8">
        <h2 className="text-[20px] font-semibold text-[#111827] mb-6 leading-5 mx-6">
          {t("branchInformation")}
        </h2>

        <div className="rounded-b-[12px] border border-[#EFEFEF] p-6 pb-16">
          <div className="grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-2">
            <div>
              <label className={labelClass}>{t("fieldBranchName")}</label>
              <input
                type="text"
                value={form.branchName}
                onChange={set("branchName")}
                placeholder={t("placeholderBranchName")}
                disabled={isView}
                className={`${inputClass} ${disabledInputClass}`}
              />
            </div>

            <div>
              <label className={labelClass}>{t("fieldBranchAddress")}</label>
              <input
                type="text"
                value={form.branchAddress}
                onChange={set("branchAddress")}
                placeholder={t("placeholderBranchAddress")}
                disabled={isView}
                className={`${inputClass} ${disabledInputClass}`}
              />
            </div>

            <div>
              <label className={labelClass}>{t("fieldCity")}</label>
              <div className="relative">
                <select
                  value={form.city}
                  onChange={set("city")}
                  disabled={isView}
                  className={`${inputClass} ${disabledInputClass} appearance-none pr-10`}
                >
                  <option value="" disabled>
                    {t("placeholderCity")}
                  </option>
                  <option value="Alexandria">Alexandria</option>
                  <option value="Cairo">Cairo</option>
                  <option value="Giza">Giza</option>
                  <option value="Mansoura">Mansoura</option>
                </select>
                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
              </div>
            </div>

            <div>
              <label className={labelClass}>{t("fieldManagerName")}</label>
              <input
                type="text"
                value={form.managerName}
                onChange={set("managerName")}
                placeholder={t("placeholderManagerName")}
                disabled={isView}
                className={`${inputClass} ${disabledInputClass}`}
              />
            </div>

            <div>
              <label className={labelClass}>{t("fieldOpeningHours")}</label>
              <div className="relative">
                <Clock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
                <input
                  type="time"
                  value={form.openingHours}
                  onChange={set("openingHours")}
                  disabled={isView}
                  className={`${inputClass} ${disabledInputClass} pl-10`}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>{t("fieldClosingHours")}</label>
              <div className="relative">
                <Clock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
                <input
                  type="time"
                  value={form.closingHours}
                  onChange={set("closingHours")}
                  disabled={isView}
                  className={`${inputClass} ${disabledInputClass} pl-10`}
                />
              </div>
            </div>
          </div>

          <div className="mt-16 flex items-center justify-between rounded-[8px] bg-[#F8FAFC] px-5 py-4">
            <div className="flex items-center gap-3">
              <Truck className="h-5 w-5 text-[#FF8A00]" />
              <div>
                <p className="text-[13px] font-semibold text-[#2E2E2E]">
                  {t("deliveryAvailable")}
                </p>
                <p className="text-[11px] text-[#9CA3AF]">
                  {t("deliveryAvailableDescription")}
                </p>
              </div>
            </div>

            <DeliveryToggle
              checked={form.deliveryAvailable}
              disabled={isView}
              onChange={(value) =>
                setForm((prev) => ({ ...prev, deliveryAvailable: value }))
              }
            />
          </div>
        </div>
      </section>

      <div className="flex gap-8 pb-8">
        {!isView && (
          <button
            type="button"
            onClick={handleSubmit}
            className="cursor-pointer px-8 py-2 min-w-[179px] rounded-[10px] bg-[#DC1213] text-white font-bold text-[16px] hover:bg-[#b80f10] transition-colors"
          >
            {t("saveButton")}
          </button>
        )}
        <button
          type="button"
          onClick={() => router.back()}
          className="cursor-pointer px-6 py-2 min-w-[179px] rounded-[10px] border border-[#DC1213] text-[#DC1213] font-bold text-[16px] hover:bg-red-50 transition-colors"
        >
          {t("cancelButton")}
        </button>
      </div>
    </div>
  );
}
