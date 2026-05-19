"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import FilterSelect from "@/components/ui/filter-select";
import Image from "next/image";
import searchIcon from "@/.././public/images/searchIcon.svg";
import editpen    from "@/.././public/images/editpen.svg";
import trashIco   from "@/.././public/images/trashIco.svg";
import { Link }   from "@/i18n/navigation";
import { useTranslations } from "next-intl";

// ─── Types ────────────────────────────────────────────────────────────────────

type StaffStatus = "Active" | "Inactive";

interface StaffMember {
  id: number;
  name: string;
  email: string;
  role: string;
  assignedBranch: string;
  lastLogin: string;
  status: StaffStatus;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const statusClass: Record<StaffStatus, string> = {
  Active:   "bg-[#25BB001A] text-[#20A300] hover:bg-[#E8F8E5]",
  Inactive: "bg-[#FF5E2C1A] text-[#FFB800] hover:bg-[#E5E5E5]",
};

const ITEMS_PER_PAGE = 10;

const allStaff: StaffMember[] = [
  { id: 1,  name: "Ahmed Ali", email: "e.rodriguez@burgerrep.com", role: "Manager",          assignedBranch: "Down Town", lastLogin: "2 hours ago", status: "Active"   },
  { id: 2,  name: "Ahmed Ali", email: "e.rodriguez@burgerrep.com", role: "Shift Supervisor", assignedBranch: "Down Town", lastLogin: "2 hours ago", status: "Inactive" },
  { id: 3,  name: "Ahmed Ali", email: "e.rodriguez@burgerrep.com", role: "Staff",            assignedBranch: "Down Town", lastLogin: "2 hours ago", status: "Active"   },
  { id: 4,  name: "Ahmed Ali", email: "e.rodriguez@burgerrep.com", role: "Staff",            assignedBranch: "Down Town", lastLogin: "2 hours ago", status: "Active"   },
  { id: 5,  name: "Ahmed Ali", email: "e.rodriguez@burgerrep.com", role: "Staff",            assignedBranch: "Down Town", lastLogin: "2 hours ago", status: "Active"   },
  { id: 6,  name: "Ahmed Ali", email: "e.rodriguez@burgerrep.com", role: "Staff",            assignedBranch: "Down Town", lastLogin: "2 hours ago", status: "Active"   },
  { id: 7,  name: "Ahmed Ali", email: "e.rodriguez@burgerrep.com", role: "Staff",            assignedBranch: "Down Town", lastLogin: "2 hours ago", status: "Active"   },
  { id: 8,  name: "Ahmed Ali", email: "e.rodriguez@burgerrep.com", role: "Staff",            assignedBranch: "Down Town", lastLogin: "2 hours ago", status: "Active"   },
  { id: 9,  name: "Ahmed Ali", email: "e.rodriguez@burgerrep.com", role: "Staff",            assignedBranch: "Down Town", lastLogin: "2 hours ago", status: "Active"   },
  { id: 10, name: "Ahmed Ali", email: "e.rodriguez@burgerrep.com", role: "Staff",            assignedBranch: "Down Town", lastLogin: "2 hours ago", status: "Inactive" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function StaffDirectoryTable() {
  const t = useTranslations("StaffDirectory");

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch]           = useState("");
  const [role, setRole]               = useState("");
  const [branch, setBranch]           = useState("");
  const [status, setStatus]           = useState("");

  const filtered = allStaff.filter((s) => {
    const matchSearch = !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase());
    const matchRole   = !role   || s.role   === role;
    const matchBranch = !branch || s.assignedBranch === branch;
    const matchStatus = !status || s.status === status;
    return matchSearch && matchRole && matchBranch && matchStatus;
  });

  const totalPages    = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const startIndex    = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentStaff  = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleFilterChange =
    (setter: (v: string) => void) =>
    (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
      setter(e.target.value);
      setCurrentPage(1);
    };

  return (
    <div className="space-y-4 mx-1 mt-8">

      {/* Filters */}
      <div className="flex my-12 mb-16 items-center gap-3 flex-wrap justify-between">
        <div className="flex items-center gap-3 flex-wrap mx-4">

          {/* Search */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <Image src={searchIcon} alt="Search" width={16} height={16} />
            </span>
            <input
              type="text"
              value={search}
              onChange={handleFilterChange(setSearch)}
              placeholder={t("searchPlaceholder")}
              className="pl-9 pr-4 py-2 rounded-[8px] border border-gray-200 text-sm text-gray-700 bg-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F5A623]/30 focus:border-[#F5A623] transition xl:w-[445px]"
            />
          </div>

          {/* Role */}
          <FilterSelect value={role} onChange={handleFilterChange(setRole)}>
            <option value="">{t("roleAll")}</option>
            <option value="Manager">{t("roleManager")}</option>
            <option value="Shift Supervisor">{t("roleShiftSupervisor")}</option>
            <option value="Staff">{t("roleStaff")}</option>
          </FilterSelect>

          {/* Branch */}
          <FilterSelect value={branch} onChange={handleFilterChange(setBranch)}>
            <option value="">{t("branchAll")}</option>
            <option value="Down Town">Down Town</option>
            <option value="Uptown">Uptown</option>
          </FilterSelect>

          {/* Status */}
          <FilterSelect value={status} onChange={handleFilterChange(setStatus)}>
            <option value="">{t("statusAll")}</option>
            <option value="Active">{t("statusActive")}</option>
            <option value="Inactive">{t("statusInactive")}</option>
          </FilterSelect>
        </div>

        {/* Add New Staff button */}
        <Link
          href="/staff/create"
          className="px-13 py-2 rounded-xl bg-[#DC1213] text-white text-[16px] font-bold whitespace-nowrap hover:bg-[#b80f10] transition-colors"
        >
          {t("addNewStaffButton")}
        </Link>
      </div>

      {/* Table Card */}
      <div className="w-full overflow-hidden border border-[#DCE0E5] rounded-[12px] rounded-b-none bg-white">
        <div className="overflow-x-auto">
          <Table className="min-w-[850px]">
            <TableHeader>
              <TableRow className="bg-[#F6F6F6]">
                {[
                  { label: t("colName"),           center: false },
                  { label: t("colEmail"),          center: true },
                  { label: t("colRole"),           center: true },
                  { label: t("colAssignedBranch"), center: true },
                  { label: t("colLastLogin"),      center: false },
                  { label: t("colStatus"),         center: false },
                  { label: t("colActions"),        center: true  },
                ].map(({ label, center }) => (
                  <TableHead
                    key={label}
                    className={`px-5 py-4 text-[16px] font-semibold text-[#2E2E2E] ${center ? "text-center" : "text-start"}`}
                  >
                    {label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {currentStaff.map((member, index) => (
                <TableRow key={index} className="border-b border-[#EFEFEF] hover:bg-transparent">

                  {/* Name */}
                  <TableCell className="px-5 py-4 text-[14px] text-start text-[#2E2E2EB3] font-medium leading-[20px] tracking-[0.5px]">
                    {member.name}
                  </TableCell>

                  {/* Email */}
                  <TableCell className="px-5 py-4 text-[14px] text-start text-[#2E2E2EB3] font-medium leading-[20px] tracking-[0.5px]">
                    {member.email}
                  </TableCell>

                  {/* Role */}
                  <TableCell className="px-5 py-4 text-[14px] text-start text-[#2E2E2EB3] font-medium leading-[20px] tracking-[0.5px]">
                    {member.role}
                  </TableCell>

                  {/* Assigned Branch */}
                  <TableCell className="px-5 py-4 text-[14px] text-center text-[#2E2E2EB3] font-medium leading-[20px] tracking-[0.5px]">
                    {member.assignedBranch}
                  </TableCell>

                  {/* Last Login */}
                  <TableCell className="px-5 py-4 text-[14px] text-start text-[#2E2E2EB3] font-medium leading-[20px] tracking-[0.5px]">
                    {member.lastLogin}
                  </TableCell>

                  {/* Status Badge */}
                  <TableCell className="px-5 py-4 text-start">
                    <Badge
                      className={`rounded-[6px] px-4 py-3 text-[10px] font-regular shadow-none leading-[20px] tracking-[0.5px] min-w-[90px] inline-flex justify-center ${statusClass[member.status]}`}
                    >
                      {member.status === "Active" ? t("statusActive") : t("statusInactive")}
                    </Badge>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="px-5 py-4 text-center">
                    <div className="flex items-center justify-center gap-0">
                      <Link
                        href={`/staff/${member.id}/edit`}
                        className="w-8 rounded-lg text-gray-400 hover:text-[#F5A623] hover:bg-orange-50 transition-colors"
                      >
                        <Image src={editpen} alt="Edit" width={32} height={32} />
                      </Link>
                      <button className="w-8 rounded-lg text-gray-400 hover:text-[#FF5E2C] hover:bg-red-50 transition-colors">
                        <Image src={trashIco} alt="Delete" width={32} height={32} />
                      </button>
                    </div>
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-end gap-2 px-5 py-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="text-[18px] font-bold text-[#FF8A00] disabled:opacity-30 cursor-pointer"
          >
            «
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`h-7 w-7 rounded-[6px] text-[13px] font-semibold transition-colors cursor-pointer ${
                page === currentPage
                  ? "bg-[#FF8A00] text-white"
                  : "bg-[#F1F1F1] text-[#6E6E6E] hover:bg-[#E5E5E5]"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="text-[18px] font-bold text-[#FF8A00] disabled:opacity-30 cursor-pointer"
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
}
