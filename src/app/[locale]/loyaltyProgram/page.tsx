"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import EditIcon from "@/.././public/images/Container.svg";
import resetBtn from "@/.././public/images/resetBtn.svg";
import AddNew from "@/.././public/images/AddNew.svg";
import silver from "@/.././public/images/silver.svg";
import bronze from "@/.././public/images/bronze.svg";
import gold from "@/.././public/images/gold.svg";
import editblack from "@/.././public/images/editblack.svg";

const TIER_COLORS = {
  Bronze: {
    label:   "text-[#CD7F32]",
    bar:     "bg-[#CD7F32]",
    iconBg:  "bg-[#CD7F321A]",
  },
  Silver: {
    label:   "text-[#64748B]",
    bar:     "bg-[#64748B]",
    iconBg:  "bg-[#E2E8F0]",
  },
  Gold: {
    label:   "text-[#FFB800]",
    bar:     "bg-[#FFB800]",
    iconBg:  "bg-[#FFB8001A]",
  },
};

const INITIAL_TIERS = [
  { id: 1, name: "Bronze", thresholdMin: 0, thresholdMax: 500, cashback: 2, currency: "L.E" },
  { id: 2, name: "Silver", thresholdMin: 0, thresholdMax: 500, cashback: 2, currency: "L.E" },
  { id: 3, name: "Gold",   thresholdMin: 0, thresholdMax: 500, cashback: 2, currency: "L.E" },
];

/* ── Toggle ──────────────────────────────────────────────────── */
function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative flex-shrink-0 w-11 h-6 rounded-full border-none p-0 cursor-pointer transition-colors duration-200 ${
        checked ? "bg-[#DC1213]" : "bg-gray-300"
      }`}
    >
      <span
        className={`absolute top-[3px] w-[18px] h-[18px] rounded-full bg-white shadow transition-all duration-200 ${
          checked ? "left-[23px]" : "left-[3px]"
        }`}
      />
    </button>
  );
}

/* ── Edit Tier Modal ─────────────────────────────────────────── */
function EditTierModal({ tier, onClose, onSave }) {
  const t = useTranslations("LoyaltyProgram");

  const [tierName,  setTierName]  = useState(`${tier.name} Tier`);
  const [threshold, setThreshold] = useState(1000);
  const [cashback,  setCashback]  = useState(tier.cashback);

  const hasError = threshold <= 250;

  function handleSave() {
    onSave({ ...tier, cashback, thresholdMax: threshold });
    onClose();
  }

  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/35"
    >
      <div className="relative bg-white rounded-2xl p-6 pb-7 w-[90%] max-w-[680px] max-h-[608px] shadow-2xl">

        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 bg-transparent border-none cursor-pointer text-gray-400 hover:text-gray-600 text-lg leading-none p-1"
        >
          ✕
        </button>

        {/* Header */}
        <div>

        <h2 className="text-xl font-bold text-[#1F2937] mb-1.5">
          {t("editLoyaltyTier")}
        </h2>
        <p className="text-[13px] text-gray-400 mb-6">
          {t("editLoyaltySubTier")}
        </p>
        </div>

        {/* Tier Name */}
        <label className="block text-[14px] font-regular text-[#334155] mb-1.5 mt-18">
          {t("tierNameLabel")}
        </label>
        <input
          type="text"
          value={tierName}
          onChange={(e) => setTierName(e.target.value)}
          className="w-full px-3.5 py-3.5 rounded-lg border border-[#E5E7EB] text-sm text-[#1F2937] bg-[#F9FAFB] outline-none focus:border-[#FF8A00] focus:ring-2 focus:ring-[#FF8A00]/20 transition"
        />

        {/* Spend Threshold */}
        <label className="block text-[14px] font-regular text-[#334155] mb-1.5 mt-4">
          {t("spendThresholdLabel")}
        </label>
        <input
          type="number"
          value={threshold}
          onChange={(e) => setThreshold(Number(e.target.value))}
          className={`w-full px-3.5 py-3.5 rounded-lg border text-sm text-[#1F2937] bg-[#F9FAFB] outline-none focus:ring-2 transition ${
            hasError
              ? "border-[#DC1213] focus:ring-[#DC1213]/20"
              : "border-[#E5E7EB] focus:border-[#FF8A00] focus:ring-[#FF8A00]/20"
          }`}
        />
        {hasError && (
          <p className="flex items-center gap-1.5 text-[12px] text-[#DC1213] mt-1.5">
            <span className="text-sm">⊙</span>
            {t("mustBeHigher")}
          </p>
        )}

        {/* Cashback Percentage */}
        <label className="block text-[14px] font-regular text-[#334155] mb-1.5 mt-4">
          {t("cashbackPercentage")}
        </label>
        <div className="relative  mb-14">
          <input
            type="number"
            value={cashback}
            onChange={(e) => setCashback(Number(e.target.value))}
            className="w-full px-3.5 py-3.5 pr-9 rounded-lg border border-[#E5E7EB] text-sm text-[#1F2937] bg-[#F9FAFB] outline-none focus:border-[#FF8A00] focus:ring-2 focus:ring-[#FF8A00]/20 transition"
          />
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">
            %
          </span>
        </div>

        {/* Buttons */}
          <div className="flex gap-8 lg:mt-16 lg:mb-8 justify-center min:w-fit m-auto">
          <button
            onClick={onClose}
            className="max-w-[179px] min-w-[30%] py-2 rounded-[8px] border border-[#DC1213] text-[#DC1213] font-bold text-[16px] transition hover:bg-red-50"
          >
            {t("cancel")}
          </button>
          
            <button
            onClick={onClose}
            className="max-w-[179px] min-w-[30%] py-2 rounded-[8px] bg-[#DC1213] text-white font-bold text-[16px] transition hover:bg-red-700"
          >
            {t("save")}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Tier Card ───────────────────────────────────────────────── */
function TierCard({ tier, onEdit }) {
  const t      = useTranslations("LoyaltyProgram");
  const colors = TIER_COLORS[tier.name];
  const emoji  = tier.name === "Bronze" ? 
  <Image src={bronze} alt="Bronze" width={20} height={20} />
  : tier.name === "Silver" ? 
  <Image src={silver} alt="Silver" width={20} height={20} />
  : 
  <Image src={gold} alt="Gold" width={20} height={20} />;

  return (
    <div className="flex-1 min-w-[190px] bg-white border border-[#DCE0E5] rounded-2xl p-6">

      {/* Icon + name */}
      <div className="flex items-center justify-between mb-6">
        <div className={`w-13.5 h-13.5 rounded-xl ${colors.iconBg} flex items-center justify-center text-2xl`}>
          {emoji}
        </div>
        <div className="text-right">
          <div className={`text-[24px] font-black ${colors.label}`}>
            {t(tier.name.toLowerCase())}
          </div>
          <div className="text-[12px] font-bold text-[#94A3B8] tracking-[1.2px]">
            {t("baseTier")}
          </div>
        </div>
      </div>

      {/* Spend threshold */}
      <div className="flex justify-between items-center mb-4 mt-6">
        <span className="text-[14px] font-regular text-[#64748B]">{t("spendThreshold")}</span>
        <span className="text-[14px] font-bold text-[#0F172A]">
          {tier.thresholdMin} – {tier.thresholdMax} {tier.currency}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-2 rounded-full bg-[#F1F1F1] mb-4">
        <div className={`h-1.5 rounded-full w-[40%] ${colors.bar}`} />
      </div>

      {/* Cashback rate */}
      <div className="flex justify-between items-center mb-6 pb-2">
        <span className="text-[14px] font-regular text-[#64748B]">{t("cashbackRate")}</span>
        <span className="text-[16px] bg-[#EC49131A] border rounded-[4px] p-2 py-1 font-black text-[#EC4913]">{tier.cashback}%</span>
      </div>

      {/* Edit button */}
      <button
        type="button"
        onClick={() => onEdit(tier)}
        className="w-full mt-6 py-3 rounded-lg border border-[#EC49130D] bg-[#F8F6F6] text-[14px] font-bold text-[#0F172A] cursor-pointer flex items-center justify-center gap-1.5 hover:bg-gray-50 transition"
      >
        <Image src={editblack} alt="Edit" width={16} height={16} />
        
         {t("editTier")}
      </button>
    </div>
  );
}

/* ── Main Page ───────────────────────────────────────────────── */
export default function LoyaltyProgramPage() {
  const t = useTranslations("LoyaltyProgram");

  const [programOn,   setProgramOn]   = useState(true);
  const [currency,    setCurrency]    = useState("L.E");
  const [cashback,    setCashback]    = useState(1.5);
  const [expiry,      setExpiry]      = useState(365);
  const [tiers,       setTiers]       = useState(INITIAL_TIERS);
  const [editingTier, setEditingTier] = useState(null);

  function handleSaveTier(updated) {
    setTiers((prev) => prev.map((tier) => (tier.id === updated.id ? updated : tier)));
  }

  return (
    <main className="flex-1 flex flex-col p-8 px-4 w-full">

      {/* ── Page Header ── */}
      <div className="mb-8">
        <h1 className="font-headFont font-extrabold text-[28px] text-[#1F2937]">
          {t("pageTitle")}
        </h1>
     
      </div>

      {/* ── Section title ── */}
      <h2 className="text-[32px] font-extrabold text-[#000000] font-headFont mb-8 mt-12">
        {t("manageRewards")}
      </h2>

      {/* ── Settings card ── */}
<div className="border border-[#EC49131A] rounded-[12px] bg-white p-8 grid grid-cols-1 md:grid-cols-3 gap-24 mb-9 xl:w-[1111px] items-stretch">


        {/* Column 1 – Status + Currency */}
        <div className="h-full flex flex-col justify-between">
          <div className="flex items-center justify-between mb-14">
            <span className="text-[16px] font-semibold text-[#0F172A]">
              {t("programStatus")}
            </span>
            <Toggle checked={programOn} onChange={setProgramOn} />
          </div>
          <p className="text-[14px] font-medium text-[#0F172A] mb-2">
            {t("primaryCurrency")}
          </p>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="w-full px-3 py-2 rounded-[8px] border border-[#E5E7EB] text-[14px] text-[#0F172A] bg-[#F8F6F6] cursor-pointer outline-none  transition"
          >
            <option value="L.E">L.E</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>

        {/* Column 2 – Cashback */}
        <div className="h-full flex flex-col justify-between">
          <p className="text-[16px] font-semibold text-[#0F172A] mb-1">
            {t("cashback")}
          </p>
          <p className="text-[14px] font-regular text-[#64748B] mb-3.5">
            {t("cashbackSubtitle")}
          </p>
       <div className="flex items-center gap-2">
  <div className="relative flex-1">
    <input
      type="number"
      value={cashback}
      step={0.1}
      min={0}
      onChange={(e) => setCashback(Number(e.target.value))}
      className="w-full px-3 py-2 pr-10 rounded-lg border border-[#E5E7EB] text-[16px] font-bold text-[#1F2937] bg-[#F9FAFB] outline-none focus:border-[#FF8A00] focus:ring-2 focus:ring-[#FF8A00]/20 transition"
    />
    <button
      type="button"
      onClick={() => setCashback(1.5)}
      className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-md bg-[#FFF3E0] text-[#FF8A00] cursor-pointer text-[15px] flex items-center justify-center hover:bg-orange-200 transition"
    >
      <Image src={resetBtn} alt="Reset" width={16} height={16} />
    </button>
  </div>
  <span className="text-[16px] font-semibold text-[#0F172A]">%</span>
</div>
        </div>

        {/* Column 3 – Point Expiration */}
        <div className="h-full flex flex-col justify-between">
          <p className="text-[16px] font-semibold text-[#0F172A] mb-1">
            {t("pointExpiration")}
          </p>
          <p className="text-[14px] font-regular text-[#64748B] mb-3.5">
            {t("pointExpirationSubtitle")}
          </p>
         <div className="flex items-center gap-2">
  <div className="relative flex-1">
    <input
      type="number"
      value={expiry}
      min={1}
      onChange={(e) => setExpiry(Number(e.target.value))}
      className="w-full px-3 py-2 pr-14 rounded-lg border border-[#E5E7EB] text-[16px] font-bold text-[#1F2937] bg-[#F9FAFB] outline-none focus:border-[#FF8A00] focus:ring-2 focus:ring-[#FF8A00]/20 transition"
    />
    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[14px] text-gray-400 pointer-events-none">
      {t("days")}
    </span>
  </div>
  <button
    type="button"
    className="w-8 h-8 rounded-lg border-none bg-[#FFF3E0] text-[#FF8A00] cursor-pointer text-[15px] flex items-center justify-center hover:bg-orange-200 transition"
  >
    <Image src={EditIcon} alt="Edit" width={16} height={16} />
  </button>
</div>
        </div>
      </div>

      {/* ── Loyalty Tiers header ── */}
      <div className="flex items-center justify-between leading-[28px] mb-16 mt-14">
        <span className="text-[18px] font-bold text-[#0F172A]">
          {t("loyaltyTiers")}
        </span>
        <button
          type="button"
          className="flex items-center gap-2 bg-transparent border-none cursor-pointer text-[#FF8A00] font-bold text-[14px] p-0 hover:opacity-80 transition"
        >
          <Image src={AddNew} alt="Add New" width={16} height={16} />
          {t("addNewTier")}
        </button>
      </div>

      {/* ── Tier cards ── */}
      <div className="flex gap-13.25 flex-wrap xl:w-[1018px] min-w-fit ">
        {tiers.map((tier) => (
          <TierCard key={tier.id} tier={tier} onEdit={setEditingTier} />
        ))}
      </div>

      {/* ── Edit modal ── */}
      {editingTier !== null && (
        <EditTierModal
          tier={editingTier}
          onClose={() => setEditingTier(null)}
          onSave={handleSaveTier}
        />
      )}
    </main>
  );
}