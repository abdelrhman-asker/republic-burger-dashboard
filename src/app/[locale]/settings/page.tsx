"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

export default function Home() {
  const t = useTranslations("Settings");

  const [emailAlerts, setEmailAlerts] = useState(true);
  const [refundAlerts, setRefundAlerts] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("••••••••");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const Toggle = ({
    enabled,
    onToggle,
  }: {
    enabled: boolean;
    onToggle: () => void;
  }) => (
    <button
      onClick={onToggle}
      className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-200 focus:outline-none ${
        enabled ? "bg-[#F5A623]" : "bg-gray-200"
      }`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-200 ${
          enabled ? "translate-x-8" : "translate-x-1"
        }`}
      />
    </button>
  );

  return (
    <main className="flex-1 flex flex-col p-8 px-4">
      <div className="flex items-start justify-between max-w-[80%]">
        <div>
          <h1 className="font-headFont font-extrabold text-[28px]">
            {t("mainTitle")}
          </h1>
        </div>
      </div>

      <div className="mt-8 max-w-[80%] space-y-6">
        {/* Alerts & Notifications */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900">
            {t("alertsTitle") }
          </h2>
          <p className="text-sm text-gray-400 mt-0.5">
            {t("alertsSubtitle")}
          </p>

          <div className="mt-12 space-y-6">
            {/* Email Alerts */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {t("emailAlerts")}
                </p>
                <p className="text-xs text-[#64748B] mt-0.5">
                  {t("emailAlertsDesc")}
                </p>
              </div>
              <Toggle
                enabled={emailAlerts}
                onToggle={() => setEmailAlerts(!emailAlerts)}
              />
            </div>

            <hr className="border-gray-100" />

            {/* Refund Alerts */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {t("refundAlerts")}
                </p>
                <p className="text-xs text-[#64748B] mt-0.5">
                  {t("refundAlertsDesc")}
                </p>
              </div>
              <Toggle
                enabled={refundAlerts}
                onToggle={() => setRefundAlerts(!refundAlerts)}
              />
            </div>

            <hr className="border-gray-100" />

            {/* Weekly Performance Reports */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {t("weeklyReports")}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {t("weeklyReportsDesc")}
                </p>
              </div>
              <Toggle
                enabled={weeklyReports}
                onToggle={() => setWeeklyReports(!weeklyReports)}
              />
            </div>
          </div>
        </div>

        {/* Security & Privacy */}
        <div className="bg-white mt-12 rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900">
            {t("securityTitle")}
          </h2>
          <p className="text-sm text-gray-400 mt-0.5">
            {t("securitySubtitle")}
          </p>

          <div className="mt-12 grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm color-[#0F172A] font-semibold " htmlFor="currentPassword"> {t("currentPasswordLabel")} </label>
              <input
              id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder={t("currentPassword") }
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F5A623]/40 focus:border-[#F5A623] transition"
              />
            </div>
            <div>
              <label className="text-sm color-[#0F172A] font-semibold " htmlFor="password"> {t("newPasswordLabel")} </label>
              <input
              id="password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder={t("newPassword")}
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F5A623]/40 focus:border-[#F5A623] transition"
              />
            </div>
            <div>
              <label className="text-sm color-[#0F172A] font-semibold " htmlFor="confirmPassword"> {t("confirmPasswordLabel")} </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={t("confirmPassword")}
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F5A623]/40 focus:border-[#F5A623] transition"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 pt-2 mt-16">
          <button className="bg-[#E53935] hover:bg-[#C62828] text-white min-w-[179px] text-[16px] font-bold px-9 py-2 rounded-lg transition-colors duration-150 shadow-sm">
            {t("saveChange")}
          </button>
          <button className="border border-[#E53935] text-[#E53935] min-w-[179px] hover:bg-red-50 text-[16px] font-bold px-9 py-2 rounded-lg transition-colors duration-150">
            {t("cancel")}
          </button>
        </div>
      </div>
    </main>
  );
}