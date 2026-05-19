"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import AuditLogsTable from "@/components/tables/AuditLogsTable";

export default function AuditLogsPage() {
  const t = useTranslations("StaffDirectory");

  return (
    <main className="flex min-h-screen flex-1 flex-col bg-white px-4 py-6">
      <h1 className="mb-14 text-[22px] font-extrabold text-black">
        {t("rolesAndPermissionsTitle")}
      </h1>

      <section className="overflow-hidden rounded-[6px] border border-[#E5E7EB] bg-white">
        <div className="flex h-[63px] items-end gap-8 border-b border-[#E5E7EB] px-4 pt-2">
          <button
            type="button"
            className="h-full min-w-[95px] border-b-2 border-[#DC1213] text-[14px] font-bold text-[#DC1213]"
          >
            {t("auditLogsTab")}
          </button>
          <Link
            href="/staff/rolesandpermissions"
            className="flex h-full min-w-[95px] items-center justify-center text-[14px] font-medium text-[#64748B]"
          >
            {t("accessMatrixTab")}
          </Link>
        </div>

        <AuditLogsTable />
      </section>
    </main>
  );
}
