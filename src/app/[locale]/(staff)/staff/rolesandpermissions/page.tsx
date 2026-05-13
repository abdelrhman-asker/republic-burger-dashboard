"use client";

import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

type RoleKey = "admin" | "manager" | "cashier";

type Permission = {
  titleKey: string;
  descriptionKey: string;
  admin: boolean;
  manager: boolean;
  cashier: boolean;
};

const initialPermissions: Permission[] = [
  {
    titleKey: "permissionViewActiveOrders",
    descriptionKey: "permissionViewActiveOrdersDescription",
    admin: true,
    manager: true,
    cashier: true,
  },
  {
    titleKey: "permissionEditMenuItems",
    descriptionKey: "permissionEditMenuItemsDescription",
    admin: true,
    manager: true,
    cashier: false,
  },
  {
    titleKey: "permissionProcessRefunds",
    descriptionKey: "permissionProcessRefundsDescription",
    admin: true,
    manager: true,
    cashier: false,
  },
  {
    titleKey: "permissionManageStaff",
    descriptionKey: "permissionManageStaffDescription",
    admin: true,
    manager: false,
    cashier: false,
  },
  {
    titleKey: "permissionViewFinancialReports",
    descriptionKey: "permissionViewFinancialReportsDescription",
    admin: true,
    manager: false,
    cashier: false,
  },
  {
    titleKey: "permissionViewFinancialReports",
    descriptionKey: "permissionViewFinancialReportsDescription",
    admin: true,
    manager: false,
    cashier: false,
  },
  {
    titleKey: "permissionViewFinancialReports",
    descriptionKey: "permissionViewFinancialReportsDescription",
    admin: true,
    manager: false,
    cashier: false,
  },
  {
    titleKey: "permissionViewFinancialReports",
    descriptionKey: "permissionViewFinancialReportsDescription",
    admin: true,
    manager: false,
    cashier: false,
  },
  {
    titleKey: "permissionViewFinancialReports",
    descriptionKey: "permissionViewFinancialReportsDescription",
    admin: true,
    manager: false,
    cashier: false,
  },
  {
    titleKey: "permissionViewFinancialReports",
    descriptionKey: "permissionViewFinancialReportsDescription",
    admin: true,
    manager: false,
    cashier: false,
  },
  {
    titleKey: "permissionViewFinancialReports",
    descriptionKey: "permissionViewFinancialReportsDescription",
    admin: true,
    manager: false,
    cashier: false,
  },
];

function PermissionCheckbox({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`mx-auto flex h-[18px] w-[18px] items-center justify-center border transition ${
        checked
          ? "border-[#DC1213] bg-[#DC1213]"
          : "border-[#9CA3AF] bg-white"
      }`}
      aria-pressed={checked}
    >
      {checked && (
        <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
          <path
            d="M1 3.4L3.2 5.6L8 1"
            stroke="white"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}

export default function RolesAndPermissionsPage() {
  const t = useTranslations("StaffDirectory");

  const [permissions, setPermissions] =
    useState<Permission[]>(initialPermissions);

  const togglePermission = (index: number, role: RoleKey) => {
    setPermissions((prev) =>
      prev.map((permission, permissionIndex) =>
        permissionIndex === index
          ? {
              ...permission,
              [role]: !permission[role],
            }
          : permission
      )
    );
  };

  const handleCancel = () => {
    setPermissions(initialPermissions);
  };

  const handleSave = () => {
    console.log("Static permissions:", permissions);
  };

  return (
    <main className="flex min-h-screen flex-1 flex-col bg-white px-4 py-6">
      <h1 className="mb-14 text-[22px] font-extrabold text-black">
        {t("rolesAndPermissionsTitle")}
      </h1>

      <section className="overflow-hidden rounded-[6px] border border-[#E5E7EB] bg-white">
        {/* Tabs */}
        <div className="flex gap-8 h-[63px] items-end border-b border-[#E5E7EB] px-4 pt-2">
          <button
            type="button"
            className="h-full min-w-[95px] border-b-2 border-redprimary text-[14px] font-bold text-redprimary"
          >
            {t("accessMatrixTab")}
          </button>

          <Link
            href="/staff/auditlogs"
            className="flex h-full min-w-[95px] items-center justify-center text-[14px] font-medium text-[#64748B]"
          >
            {t("auditLogsTab")}
          </Link>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-[1.7fr_1fr_1fr_1fr]  px-3 py-4 min-h-[85px]">
          <div className="flex items-end">
            <p className="text-[16px] font-medium text-[#0F172A]">
              {t("functionalPermissions")}
            </p>
          </div>

          <div className="text-center">
            <p className="mb-1 text-[10px] font-bold uppercase text-secondary">
              {t("level3")}
            </p>
            <p className="text-[14px] font-bold text-[#0F172A]">
              {t("adminRole")}
            </p>
          </div>

          <div className="text-center">
            <p className="mb-1 text-[10px] font-bold uppercase text-[#94A3B8]">
              {t("level2")}
            </p>
            <p className="text-[14px] font-bold text-[#0F172A]">
              {t("managerRole")}
            </p>
          </div>

          <div className="text-center">
            <p className="mb-1 text-[10px] font-bold uppercase text-[#94A3B8]">
              {t("level1")}
            </p>
            <p className="text-[14px] font-bold text-[#0F172A]">
              {t("cashierRole")}
            </p>
          </div>
        </div>

        {/* Table Body */}
        <div>
          {permissions.map((permission, index) => (
            <div
              key={`${permission.titleKey}-${index}`}
              className="grid min-h-[66px] grid-cols-[1.7fr_1fr_1fr_1fr] items-center border-t border-[#EEF0F3] px-3"
            >
              <div>
                <p className="text-[16px] font-medium text-[#0F172A]">
                  {t(permission.titleKey)}
                </p>
                <p className="text-[12px] font-regular leading-4 text-[#64748B]">
                  {t(permission.descriptionKey)}
                </p>
              </div>

              <PermissionCheckbox
                checked={permissions[index].admin}
                onChange={() => togglePermission(index, "admin")}
              />

              <PermissionCheckbox
                checked={permissions[index].manager}
                onChange={() => togglePermission(index, "manager")}
              />

              <PermissionCheckbox
                checked={permissions[index].cashier}
                onChange={() => togglePermission(index, "cashier")}
              />
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end gap-5 bg-[#F5F6F8] px-3 py-3">
          <button
            type="button"
            onClick={handleCancel}
            className="cursor-pointer px-6 py-2 min-w-[179px] rounded-[10px] border border-[#DC1213] text-[#DC1213] font-bold text-[16px]"
          >
            {t("cancelButton")}
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="cursor-pointer px-6 py-2 min-w-[179px] rounded-[10px] bg-[#DC1213] text-[16px] font-bold text-white"
          >
            {t("saveButton")}
          </button>
        </div>
      </section>
    </main>
  );
}