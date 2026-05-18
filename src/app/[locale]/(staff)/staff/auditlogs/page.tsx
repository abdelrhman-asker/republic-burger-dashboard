"use client";

import { useMemo, useState } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

type AuditLog = {
  id: number;
  userKey: string;
  timestampKey: string;
  roleKey: string;
  detailsKey: string;
  lastLoginKey: string;
  moduleKey: string;
  branchKey: string;
};

const auditLogs: AuditLog[] = [
  {
    id: 1,
    userKey: "auditUserAhmedAli",
    timestampKey: "auditTimestamp1",
    roleKey: "roleManager",
    detailsKey: "auditDetailsUpdatedMenuItem",
    lastLoginKey: "lastLoginTwoHours",
    moduleKey: "moduleMenu",
    branchKey: "branchAll",
  },
  {
    id: 2,
    userKey: "auditUserAhmedAli",
    timestampKey: "auditTimestamp2",
    roleKey: "roleManager",
    detailsKey: "auditDetailsUpdatedMenuItem",
    lastLoginKey: "lastLoginTwoHours",
    moduleKey: "moduleMenu",
    branchKey: "branchAll",
  },
  {
    id: 3,
    userKey: "auditUserAhmedAli",
    timestampKey: "auditTimestamp3",
    roleKey: "roleStaff",
    detailsKey: "auditDetailsUpdatedMenuItem",
    lastLoginKey: "lastLoginTwoHours",
    moduleKey: "moduleMenu",
    branchKey: "branchAll",
  },
  {
    id: 4,
    userKey: "auditUserAhmedAli",
    timestampKey: "auditTimestamp4",
    roleKey: "roleStaff",
    detailsKey: "auditDetailsUpdatedMenuItem",
    lastLoginKey: "lastLoginTwoHours",
    moduleKey: "moduleMenu",
    branchKey: "branchAll",
  },
  {
    id: 5,
    userKey: "auditUserAhmedAli",
    timestampKey: "auditTimestamp5",
    roleKey: "roleStaff",
    detailsKey: "auditDetailsUpdatedMenuItem",
    lastLoginKey: "lastLoginTwoHours",
    moduleKey: "moduleMenu",
    branchKey: "branchAll",
  },
  {
    id: 6,
    userKey: "auditUserAhmedAli",
    timestampKey: "auditTimestamp6",
    roleKey: "roleStaff",
    detailsKey: "auditDetailsUpdatedMenuItem",
    lastLoginKey: "lastLoginTwoHours",
    moduleKey: "moduleMenu",
    branchKey: "branchAll",
  },
  {
    id: 7,
    userKey: "auditUserAhmedAli",
    timestampKey: "auditTimestamp7",
    roleKey: "roleStaff",
    detailsKey: "auditDetailsUpdatedMenuItem",
    lastLoginKey: "lastLoginTwoHours",
    moduleKey: "moduleMenu",
    branchKey: "branchAll",
  },
  {
    id: 8,
    userKey: "auditUserAhmedAli",
    timestampKey: "auditTimestamp8",
    roleKey: "roleStaff",
    detailsKey: "auditDetailsUpdatedMenuItem",
    lastLoginKey: "lastLoginTwoHours",
    moduleKey: "moduleMenu",
    branchKey: "branchAll",
  },
  {
    id: 9,
    userKey: "auditUserAhmedAli",
    timestampKey: "auditTimestamp9",
    roleKey: "roleStaff",
    detailsKey: "auditDetailsUpdatedMenuItem",
    lastLoginKey: "lastLoginTwoHours",
    moduleKey: "moduleMenu",
    branchKey: "branchAll",
  },
  {
    id: 10,
    userKey: "auditUserAhmedAli",
    timestampKey: "auditTimestamp10",
    roleKey: "roleStaff",
    detailsKey: "auditDetailsUpdatedMenuItem",
    lastLoginKey: "lastLoginTwoHours",
    moduleKey: "moduleMenu",
    branchKey: "branchAll",
  },
];

const ITEMS_PER_PAGE = 10;

function SearchIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      className="text-[#64748B]"
    >
      <path
        d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path
        d="M2 12C2 12 5.5 6 12 6C18.5 6 22 12 22 12C22 12 18.5 18 12 18C5.5 18 2 12 2 12Z"
        stroke="#0F172A"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 14.5C13.3807 14.5 14.5 13.3807 14.5 12C14.5 10.6193 13.3807 9.5 12 9.5C10.6193 9.5 9.5 10.6193 9.5 12C9.5 13.3807 10.6193 14.5 12 14.5Z"
        stroke="#0F172A"
        strokeWidth="1.7"
      />
    </svg>
  );
}

export default function AuditLogsPage() {
  const t = useTranslations("StaffDirectory");

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [branchFilter, setBranchFilter] = useState("");

  const filteredLogs = useMemo(() => {
    return auditLogs.filter((log) => {
      const translatedSearchText = [
        t(log.userKey),
        t(log.timestampKey),
        t(log.roleKey),
        t(log.detailsKey),
        t(log.lastLoginKey),
        t(log.moduleKey),
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !search || translatedSearchText.includes(search.toLowerCase());

      const matchesDate =
        !dateFilter || t(log.timestampKey).includes(dateFilter);

      const matchesBranch =
        !branchFilter || log.branchKey === branchFilter;

      return matchesSearch && matchesDate && matchesBranch;
    });
  }, [search, dateFilter, branchFilter, t]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredLogs.length / ITEMS_PER_PAGE)
  );

  const currentLogs = filteredLogs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <main className="flex min-h-screen flex-1 flex-col bg-white px-4 py-6">
      <h1 className="mb-14 text-[22px] font-extrabold text-black">
        {t("rolesAndPermissionsTitle")}
      </h1>

      <section className="overflow-hidden rounded-[6px] border border-[#E5E7EB] bg-white">
        {/* Tabs */}
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

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 border-b border-[#EEF0F3] px-4 py-7">
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
              <SearchIcon />
            </span>

            <input
              type="text"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setCurrentPage(1);
              }}
              placeholder={t("searchLogsPlaceholder")}
              className="h-[28px] max:w-[275px] lg:w-[275px] rounded-[4px] border border-[#E2E8F0] bg-white pl-8 pr-3 text-[11px] font-medium text-[#0F172A] placeholder:text-[#64748B] focus:border-[#DC1213] focus:outline-none"
            />
          </div>

          <select
            value={dateFilter}
            onChange={(event) => {
              setDateFilter(event.target.value);
              setCurrentPage(1);
            }}
            className="h-[28px] min-w-[92px] rounded-[4px] border border-[#E2E8F0] bg-white px-3 text-[11px] font-medium text-[#0F172A] focus:border-[#DC1213] focus:outline-none"
          >
            <option value="">{t("dateAll")}</option>
            <option value="Oct 24">{t("dateOct24")}</option>
          </select>

          <select
            value={branchFilter}
            onChange={(event) => {
              setBranchFilter(event.target.value);
              setCurrentPage(1);
            }}
            className="h-[28px] min-w-[96px] rounded-[4px] border border-[#E2E8F0] bg-white px-3 text-[11px] font-medium text-[#0F172A] focus:border-[#DC1213] focus:outline-none"
          >
            <option value="">{t("branchAll")}</option>
            <option value="branchAll">{t("branchAll")}</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse">
            <thead>
              <tr className="h-[48px] bg-[#F5F6F8]">
                <th className="px-4 text-start text-[12px] font-semibold text-[#0F172A]">
                  {t("auditUser")}
                </th>
                <th className="px-4 text-start text-[12px] font-semibold text-[#0F172A]">
                  {t("auditTimestamp")}
                </th>
                <th className="px-4 text-start text-[12px] font-semibold text-[#0F172A]">
                  {t("auditRole")}
                </th>
                <th className="px-4 text-start text-[12px] font-semibold text-[#0F172A]">
                  {t("auditDetails")}
                </th>
                <th className="px-4 text-start text-[12px] font-semibold text-[#0F172A]">
                  {t("auditLastLogin")}
                </th>
                <th className="px-4 text-start text-[12px] font-semibold text-[#0F172A]">
                  {t("auditModule")}
                </th>
                <th className="px-4 text-center text-[12px] font-semibold text-[#0F172A]">
                  {t("auditActions")}
                </th>
              </tr>
            </thead>

            <tbody>
              {currentLogs.map((log) => (
                <tr
                  key={log.id}
                  className="h-[61px] border-b border-[#EEF0F3] bg-white"
                >
                  <td className="px-4 text-[12px] font-medium text-[#64748B]">
                    {t(log.userKey)}
                  </td>

                  <td className="px-4 text-[12px] font-medium text-[#64748B]">
                    {t(log.timestampKey)}
                  </td>

                  <td className="px-4 text-[12px] font-medium text-[#64748B]">
                    {t(log.roleKey)}
                  </td>

                  <td className="max-w-[190px] px-4 text-[12px] font-medium leading-4 text-[#0F172A]">
                    {t(log.detailsKey)}
                  </td>

                  <td className="px-4 text-[12px] font-medium text-[#64748B]">
                    {t(log.lastLoginKey)}
                  </td>

                  <td className="px-4">
                    <span className="inline-flex h-[20px] min-w-[58px] items-center justify-center rounded-[4px] bg-[#E6F8DF] px-3 text-[10px] font-medium text-[#43A047]">
                      {t(log.moduleKey)}
                    </span>
                  </td>

                  <td className="px-4">
                    <button
                      type="button"
                      className="mx-auto flex h-[26px] w-[26px] items-center justify-center rounded-full hover:bg-[#F1F5F9]"
                      aria-label={t("viewDetails")}
                    >
                      <EyeIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex h-[58px] items-center justify-end gap-2 px-6">
          <button
            type="button"
            onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            disabled={currentPage === 1}
            className="text-[14px] font-bold text-[#FF8A00] disabled:opacity-40"
          >
            ‹
          </button>

          {Array.from({ length: Math.max(totalPages, 4) }, (_, index) => {
            const page = index + 1;
            const isActive = page === currentPage;

            return (
              <button
                key={page}
                type="button"
                onClick={() => {
                  if (page <= totalPages) setCurrentPage(page);
                }}
                disabled={page > totalPages}
                className={`h-[18px] w-[18px] rounded-[3px] text-[10px] font-bold ${
                  isActive
                    ? "bg-[#FF8A00] text-white"
                    : "bg-[#EEF0F3] text-[#64748B]"
                } disabled:cursor-default disabled:opacity-100`}
              >
                {page}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() =>
              setCurrentPage((page) => Math.min(totalPages, page + 1))
            }
            disabled={currentPage === totalPages}
            className="text-[14px] font-bold text-[#FF8A00] disabled:opacity-40"
          >
            ›
          </button>
        </div>
      </section>
    </main>
  );
}