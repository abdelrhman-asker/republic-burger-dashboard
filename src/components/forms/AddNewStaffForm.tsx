"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

// ─── Types ────────────────────────────────────────────────────────────────────

type StaffFormData = {
  fullName: string;
  email: string;
  phoneNumber: string;
  staffPosition: string;
  branchAccess: string[];
};

// ─── Constants ────────────────────────────────────────────────────────────────

const ROLES = ["Manager", "Shift Supervisor", "Staff", "Cashier", "Kitchen Staff"];

const BRANCHES = [
  { id: "branch_1", label: "Eastside Drive-Thru" },
  { id: "branch_2", label: "Eastside Drive-Thru" },
  { id: "branch_3", label: "Eastside Drive-Thru" },
  { id: "branch_4", label: "Eastside Drive-Thru" },
];

const emptyForm: StaffFormData = {
  fullName: "",
  email: "",
  phoneNumber: "",
  staffPosition: "",
  branchAccess: [],
};

const inputClass =
  "w-full rounded-[8px] border border-[#E0E0E0] bg-white px-4 h-[55px] text-[13px] text-[#2E2E2E] placeholder-[#BDBDBD] focus:outline-none focus:ring-2 focus:ring-[#FF8A00]/30 focus:border-[#FF8A00] transition";

const labelClass = "block text-[13px] font-semibold text-[#2E2E2E] mb-1.5";

// ─── Component ────────────────────────────────────────────────────────────────

export default function AddNewStaffForm() {
  const t      = useTranslations("StaffDirectory");
  const router = useRouter();

  const [form, setForm] = useState<StaffFormData>(emptyForm);

  const set =
    (key: keyof StaffFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const toggleBranch = (id: string) =>
    setForm((prev) => ({
      ...prev,
      branchAccess: prev.branchAccess.includes(id)
        ? prev.branchAccess.filter((b) => b !== id)
        : [...prev.branchAccess, id],
    }));

  const handleSubmit = () => {
    // TODO: wire up API call
    router.push("/staff");
  };

  return (
    <div className="max-w-[994px] space-y-6">

      {/* ── Personal Information ── */}
      <section className="bg-white pb-8">
        <h2 className="text-[20px] font-semibold text-[#111827] mb-6 leading-5 mx-8">
          {t("sectionPersonalInfo")}
        </h2>

        <div className="flex flex-row flex-wrap justify-between gap-y-12 rounded-b-[12px] border border-[#EFEFEF] p-6 pb-9">
          {/* Full Name */}
          <div className="xl:min-w-[438px]">
            <label className={labelClass}>{t("fieldFullName")}</label>
            <input
              type="text"
              value={form.fullName}
              onChange={set("fullName")}
              placeholder={t("placeholderFullName")}
              className={inputClass}
            />
          </div>

          {/* Email Address */}
          <div className="xl:min-w-[438px]">
            <label className={labelClass}>{t("fieldEmail")}</label>
            <input
              type="email"
              value={form.email}
              onChange={set("email")}
              placeholder="mohang@burgersrepublic.com"
              className={inputClass}
            />
          </div>

          {/* Phone Number */}
          <div className="xl:min-w-[665px]">
            <label className={labelClass}>{t("fieldPhone")}</label>
            <input
              type="tel"
              value={form.phoneNumber}
              onChange={set("phoneNumber")}
              placeholder="+1 (555) 000-0000"
              className={inputClass}
            />
          </div>
        </div>
      </section>

      {/* ── Role Assignment ── */}
      <section className="bg-white pb-8">
        <h2 className="text-[20px] font-semibold text-[#111827] mb-6 leading-5 mx-8">
          {t("sectionRoleAssignment")}
        </h2>

        <div className="flex flex-col gap-12 rounded-b-[12px] border border-[#EFEFEF] p-6 pb-9">
          <div className="xl:min-w-[438px] max-w-[438px]">
            <label className={labelClass}>{t("fieldStaffPosition")}</label>
            <div className="relative">
              <select
                value={form.staffPosition}
                onChange={set("staffPosition")}
                className={`${inputClass} appearance-none pr-10`}
              >
                <option value="" disabled>{t("placeholderSelectRole")}</option>
                {ROLES.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#9E9E9E]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Branch Access ── */}
      <section className="bg-white pb-8">
        <h2 className="text-[20px] font-semibold text-[#111827] mb-6 leading-5 mx-8">
          {t("sectionBranchAccess")}
        </h2>

        <div className="flex flex-row flex-wrap justify-between gap-y-4 rounded-b-[12px] border border-[#EFEFEF] p-6 pb-9">
          {BRANCHES.map((branch) => {
            const checked = form.branchAccess.includes(branch.id);
            return (
              <label
                key={branch.id}
                className="xl:min-w-[438px] flex items-center gap-3 px-4 py-3 h-[55px] rounded-[8px] border border-[#E0E0E0] cursor-pointer hover:border-[#FF8A00]/50 transition"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleBranch(branch.id)}
                  className="hidden"
                />
                <div
                  className={`h-[18px] w-[18px] shrink-0 rounded-[4px] border-2 flex items-center justify-center transition-colors ${
                    checked ? "bg-[#FF8A00] border-[#FF8A00]" : "bg-white border-[#DEDEDE]"
                  }`}
                >
                  {checked && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span className="text-[13px] font-medium text-[#2E2E2E]">{branch.label}</span>
              </label>
            );
          })}
        </div>
      </section>

      {/* ── Action Buttons ── */}
      <div className="flex gap-3 pb-8">
        <button
          onClick={() => router.back()}
          className="cursor-pointer px-6 py-2 min-w-[179px] rounded-[10px] border border-[#DC1213] text-[#DC1213] font-bold text-[16px]"
        >
          {t("cancelButton")}
        </button>
        <button
          onClick={handleSubmit}
          className="cursor-pointer px-8 py-2 min-w-[179px] rounded-[10px] bg-[#DC1213] text-white font-bold text-[16px]"
        >
          {t("saveButton")}
        </button>
      </div>

    </div>
  );
}