"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import searchIcon from "@/.././public/images/searchIcon.svg";
import Image from "next/image";
import { useTranslations } from "next-intl";

const branches = ["Downtown", "Uptown", "Heliopolis", "Maadi", "Zamalek"];

type FormState = {
  couponCode: string;
  description: string;
  discountType: string;
  value: string;
  minOrderAmount: string;
  startDate: string;
  expiryDate: string;
  usageLimitPerUser: string;
  totalCampaignLimit: string;
  selectedBranches: string[];
};

const inputClass =
  "w-full rounded-[8px] border border-[#E0E0E0] bg-white px-4 py-2.5 text-[13px] text-[#2E2E2E] placeholder-[#BDBDBD] focus:outline-none focus:ring-2 focus:ring-[#FF8A00]/30 focus:border-[#FF8A00] transition";

const labelClass = "block text-[13px] font-semibold text-[#2E2E2E] mb-1.5";

export default function CreateCouponForm() {
 const t = useTranslations("Coupons");
  const router = useRouter();

  const [form, setForm] = useState<FormState>({
    couponCode: "",
    description: "",
    discountType: "Percentage (%)",
    value: "",
    minOrderAmount: "",
    startDate: "",
    expiryDate: "",
    usageLimitPerUser: "",
    totalCampaignLimit: "",
    selectedBranches: [...branches], // all selected by default
  });

  const [branchSearch, setBranchSearch] = useState("");

  const set = (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const toggleBranch = (branch: string) =>
    setForm((prev) => ({
      ...prev,
      selectedBranches: prev.selectedBranches.includes(branch)
        ? prev.selectedBranches.filter((b) => b !== branch)
        : [...prev.selectedBranches, branch],
    }));

  const selectAll = () =>
    setForm((prev) => ({ ...prev, selectedBranches: [...branches] }));

  const filteredBranches = branches.filter((b) =>
    b.toLowerCase().includes(branchSearch.toLowerCase())
  );

  const handleSubmit = () => {
    console.log("Submit:", form);
    // wire up your API call here
  };

  return (
    <div className="flex gap-6 items-start flex-wrap">

      {/* ── Left column ── */}
      <div className="flex-1 flex flex-col gap-5">

        {/* Basic Information */}
        <section className=" bg-white pb-8">
          <h2 className="text-[20px] font-semibold text-[#111827] mb-6 leading-5 mx-6">
            {t("basicInfo")}
          </h2>

          <div className="flex flex-col gap-12 rounded-b-[12px] border border-[#EFEFEF]  p-6 pb-9" >
            <div>
              <label className={labelClass}>Coupon Code</label>
              <input
                type="text"
                value={form.couponCode}
                onChange={set("couponCode")}
                placeholder="e.g. BURGERLOVE24"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Public Description</label>
              <textarea
                value={form.description}
                onChange={set("description")}
                placeholder="Get 20% off on all signature burgers this weekend!"
                rows={3}
                className={`${inputClass} resize-none`}
              />
            </div>
          </div>
        </section>

        {/* Discount Settings */}
        <section className=" bg-white pb-8">
          <h2 className="text-[20px] font-semibold text-[#111827] mb-6 leading-5 mx-6">
            {t("discountSettings")}
          </h2>

          <div className="flex flex-col gap-12 rounded-[12px] border border-[#EFEFEF]  p-6 pb-9">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className={labelClass}>Discount Type</label>
                <div className="relative">
                  <select
                    value={form.discountType}
                    onChange={set("discountType")}
                    className={`${inputClass} appearance-none pr-8`}
                  >
                    <option>Percentage (%)</option>
                    <option>Fixed Amount</option>
                    <option>Free Shipping</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#BDBDBD]">
                    ▾
                  </span>
                </div>
              </div>

              <div className="flex-1">
                <label className={labelClass}>Value</label>
                <input
                  type="text"
                  value={form.value}
                  onChange={set("value")}
                  placeholder="20%"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Minimum Order Amount</label>
              <input
                type="text"
                value={form.minOrderAmount}
                onChange={set("minOrderAmount")}
                placeholder="150 L.E"
                className={inputClass}
              />
            </div>
          </div>
        </section>

        {/* Validity & Usage Limits */}
        <section className="  bg-white p-8">
          <h2 className="text-[20px] font-semibold text-[#111827] mb-6 leading-5 mx-6">
            {t("validityAndUsageLimits")}
          </h2>

          <div className="flex flex-col gap-12 rounded-[12px] border border-[#EFEFEF]  p-6 pb-9">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className={labelClass}>Start Date</label>
                <div className="relative">
                  <input
                    type="date"
                    value={form.startDate}
                    onChange={set("startDate")}
                    className={`${inputClass} pr-9`}
                  />
                </div>
              </div>

              <div className="flex-1">
                <label className={labelClass}>Expiry Date</label>
                <div className="relative">
                  <input
                    type="date"
                    value={form.expiryDate}
                    onChange={set("expiryDate")}
                    className={`${inputClass} pr-9`}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className={labelClass}>Usage Limit Per User</label>
                <input
                  type="number"
                  value={form.usageLimitPerUser}
                  onChange={set("usageLimitPerUser")}
                  placeholder="1"
                  min={1}
                  className={inputClass}
                />
              </div>

              <div className="flex-1">
                <label className={labelClass}>Total Campaign Limit</label>
                <input
                  type="number"
                  value={form.totalCampaignLimit}
                  onChange={set("totalCampaignLimit")}
                  placeholder="200"
                  min={1}
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ── Right column — Branches ── */}
      <div className="w-[452px] relative  shrink-0  bg-white p-5 flex flex-col gap-2">

        <div className="flex flex-col items-center justify-between ">
        <div className="flex items-center justify-between w-[90%]">
          <h2 className="text-[20px] font-semibold text-[#111827]">Branches</h2>
          <button
            onClick={selectAll}
            className="text-[14px] font-medium leading-5 text-[#DC1213] "
            >
                {t("selectAll")}
          </button>
              </div>
        </div>
        <div className="rounded-b-[12px] border border-[#E5E7EB] pb-16 pt-8 px-2">
        {/* Branch search */}
        <div className="relative mb-4">
          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[#BDBDBD] text-[13px]">
            <Image src={searchIcon} alt="search" width={13.5} height={13.2} />
          </span>
          <input
            type="text"
            value={branchSearch}
            onChange={(e) => setBranchSearch(e.target.value)}
            placeholder={t("searchBranchesPlaceholder")}
            className="w-full rounded-[8px] border border-[#E0E0E0] bg-white pl-8 pr-3 py-1 text-[14px] text-[#6B7280] placeholder-[#BDBDBD] focus:outline-none focus:ring-2 focus:ring-[#FF8A00]/30 focus:border-[#FF8A00] transition"
          />
        </div>

        {/* Branch list */}
        <div className="flex flex-col gap-8">
          {filteredBranches.map((branch) => {
            const checked = form.selectedBranches.includes(branch);
            return (
              <label
                key={branch}
                className="flex items-center justify-between px-3 py-3 rounded-[8px] border border-[#E0E0E0] cursor-pointer hover:border-[#FF8A00]/50 transition"
              >
                <span className="text-[13px] text-[#2E2E2E] font-medium">
                  {branch}
                </span>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleBranch(branch)}
                  className="hidden"
                />
                <div
                  className={`h-[18px] w-[18px] rounded-[4px] border-2 flex items-center justify-center transition-colors ${
                    checked
                      ? "bg-[#FF8A00] border-[#FF8A00]"
                      : "bg-white border-[#DEDEDE]"
                  }`}
                >
                  {checked && (
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
              </label>
            );
          })}
        </div>
</div>
        {/* Actions */}
        <div className="flex gap-3 mt-16 mx-auto">
          <button
            onClick={() => router.back()}
            className="cursor-pointer px-6 py-2 min-w-[179px] rounded-[10px] border border-[#DC1213] text-[#DC1213] font-bold text-[16px]"
          >
            cancel
          </button>
          <button
            onClick={handleSubmit}
            className="cursor-pointer px-8 py-2 min-w-[179px] rounded-[10px] bg-[#DC1213] text-white font-bold text-[16px]"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}