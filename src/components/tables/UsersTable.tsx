"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import searchIcon from "@/.././public/images/searchIcon.svg";
import editpen from "@/.././public/images/editpen.svg";
import viewEye from "@/.././public/images/viewEye.svg";
import { Link } from "@/i18n/navigation";

type UsersStatus = "Active" | "Suspend";
type LoyaltyTier = "Gold" | "Silver" | "Bronze";

const statusClass: Record<UsersStatus, string> = {
  Active:  "bg-[#25BB001A] text-[#25BB00] hover:bg-[#E8F8E5]",
  Suspend: "bg-[#FF5E2C1A] text-[#FF5E2C] hover:bg-[#FFECE6]",
};

const loyaltyClass: Record<LoyaltyTier, string> = {
  Gold:   "bg-[#FFF3CD] text-[#B8860B] hover:bg-[#FFF0B3]",
  Silver: "bg-[#F0F0F0] text-[#6E6E6E] hover:bg-[#E5E5E5]",
  Bronze: "bg-[#F5E6D3] text-[#A0522D] hover:bg-[#EDD9C0]",
};

const ITEMS_PER_PAGE = 10;

const allUsers = [
  { id: 1,  name: "Ali Ahmed", contact: "+20100997753", orders: 233, walletBalance: "45L.E", status: "Active"  as UsersStatus, loyaltyTier: "Gold"   as LoyaltyTier },
  { id: 2,  name: "Ali Ahmed", contact: "+20100997753", orders: 12,  walletBalance: "45L.E", status: "Suspend" as UsersStatus, loyaltyTier: "Gold"   as LoyaltyTier },
  { id: 3,  name: "Ali Ahmed", contact: "+20100997753", orders: 222, walletBalance: "45L.E", status: "Active"  as UsersStatus, loyaltyTier: "Gold"   as LoyaltyTier },
  { id: 4,  name: "Ali Ahmed", contact: "+20100997753", orders: 1,   walletBalance: "45L.E", status: "Active"  as UsersStatus, loyaltyTier: "Gold"   as LoyaltyTier },
  { id: 5,  name: "Ali Ahmed", contact: "+20100997753", orders: 3,   walletBalance: "45L.E", status: "Active"  as UsersStatus, loyaltyTier: "Gold"   as LoyaltyTier },
  { id: 6,  name: "Ali Ahmed", contact: "+20100997753", orders: 5,   walletBalance: "45L.E", status: "Active"  as UsersStatus, loyaltyTier: "Silver" as LoyaltyTier },
  { id: 7,  name: "Ali Ahmed", contact: "+20100997753", orders: 24,  walletBalance: "45L.E", status: "Active"  as UsersStatus, loyaltyTier: "Silver" as LoyaltyTier },
  { id: 8,  name: "Ali Ahmed", contact: "+20100997753", orders: 8,   walletBalance: "45L.E", status: "Active"  as UsersStatus, loyaltyTier: "Bronze" as LoyaltyTier },
  { id: 9,  name: "Ali Ahmed", contact: "+20100997753", orders: 17,  walletBalance: "45L.E", status: "Suspend" as UsersStatus, loyaltyTier: "Silver" as LoyaltyTier },
  { id: 10, name: "Ali Ahmed", contact: "+20100997753", orders: 44,  walletBalance: "45L.E", status: "Active"  as UsersStatus, loyaltyTier: "Gold"   as LoyaltyTier },
];

export default function UsersTable() {
  const t = useTranslations("Users");

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch]           = useState("");
  const [branch, setBranch]           = useState("");
  const [status, setStatus]           = useState("");
  const [loyaltyTier, setLoyaltyTier] = useState("");

  // Filtering logic
  const filtered = allUsers.filter((user) => {
    const matchSearch =
      !search ||
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.contact.includes(search);
    const matchStatus = !status || user.status === status;
    const matchLoyalty = !loyaltyTier || user.loyaltyTier === loyaltyTier;
    return matchSearch && matchStatus && matchLoyalty;
  });

  const totalPages   = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex   = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentUsers = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleFilterChange = (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setter(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-4">

      {/* Filters */}
      <div className="flex my-24 items-center gap-3 flex-wrap">

        {/* Search */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">
            <Image src={searchIcon} alt="Search" width={16} height={16} />
          </span>
          <input
            type="text"
            value={search}
            onChange={handleFilterChange(setSearch)}
            placeholder="Search by Name, phone"
            className="pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-sm text-gray-700 bg-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F5A623]/30 focus:border-[#F5A623] transition xl:w-[445px]"
          />
        </div>

        {/* Branch */}
        <select
          value={branch}
          onChange={handleFilterChange(setBranch)}
          className="px-4 py-2 rounded-xl border border-gray-200 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#F5A623]/30 focus:border-[#F5A623] transition"
        >
          <option value="">All Branches</option>
          <option>Down Town</option>
          <option>Uptown</option>
        </select>

        {/* Status */}
        <select
          value={status}
          onChange={handleFilterChange(setStatus)}
          className="px-4 py-2 rounded-xl border border-gray-200 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#F5A623]/30 focus:border-[#F5A623] transition"
        >
          <option value="">Status: All</option>
          <option value="Active">Active</option>
          <option value="Suspend">Suspend</option>
        </select>

        {/* Loyalty Tier */}
        <select
          value={loyaltyTier}
          onChange={handleFilterChange(setLoyaltyTier)}
          className="px-4 py-2 rounded-xl border border-gray-200 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-[#F5A623]/30 focus:border-[#F5A623] transition"
        >
          <option value="">Loyalty Tier : All</option>
          <option value="Gold">Gold</option>
          <option value="Silver">Silver</option>
          <option value="Bronze">Bronze</option>
        </select>
      </div>

      {/* Table Card */}
      <div className="w-full overflow-hidden rounded-[12px] rounded-b-none bg-white">

        <div className="overflow-x-auto">
          <Table className="min-w-[750px]">
            <TableHeader>
              <TableRow className="bg-[#F6F6F6] hover:bg-[#F5F5F5]">
                {[
                  { label: "User Name",      center: false },
                  { label: "Contact",        center: false },
                  { label: "Orders",         center: false },
                  { label: "Wallet Balance", center: false },
                  { label: "Status",         center: false },
                  { label: "Loyalty Tier",   center: false },
                  { label: "Actions",        center: true  },
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
              {currentUsers.map((user, index) => (
                <TableRow key={index} className="border-b border-[#EFEFEF] hover:bg-transparent">

                  {/* User Name */}
                  <TableCell className="px-5 py-4 text-[14px] text-start text-[#2E2E2EB3] font-medium leading-[20px] tracking-[0.5px]">
                    {user.name}
                  </TableCell>

                  {/* Contact */}
                  <TableCell className="px-5 py-4 text-[14px] text-start text-[#2E2E2EB3] font-medium leading-[20px] tracking-[0.5px]">
                    {user.contact}
                  </TableCell>

                  {/* Orders */}
                  <TableCell className="px-5 py-4 text-[14px] text-start text-[#2E2E2EB3] font-medium leading-[20px] tracking-[0.5px]">
                    {user.orders}
                  </TableCell>

                  {/* Wallet Balance */}
                  <TableCell className="px-5 py-4 text-[14px] text-start text-[#2E2E2EB3] font-medium leading-[20px] tracking-[0.5px]">
                    {user.walletBalance}
                  </TableCell>

                  {/* Status Badge */}
                  <TableCell className="px-5 py-4 text-start">
                    <Badge
                      className={`rounded-[6px] px-4 py-3 text-[10px] font-regular shadow-none leading-[20px] tracking-[0.5px] min-w-[90px] inline-flex justify-center ${statusClass[user.status]}`}
                    >
                      {user.status}
                    </Badge>
                  </TableCell>

                  {/* Loyalty Tier Badge */}
                  <TableCell className="px-5 py-4 text-start">
                    <Badge
                      className={`rounded-[6px] px-4 py-3 text-[10px] font-regular shadow-none leading-[20px] tracking-[0.5px] min-w-[90px] inline-flex justify-center ${loyaltyClass[user.loyaltyTier]}`}
                    >
                      {user.loyaltyTier}
                    </Badge>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="px-5 py-4 text-center">
                    <div className="flex items-center justify-center gap-0">
                      <Link
                        href={`/users/${user.id}`}
                        className="p-1.5 w-8 rounded-lg text-gray-400 hover:text-[#F5A623] hover:bg-orange-50 transition-colors"
                      >
                        <Image src={editpen} alt="Edit" width={32} height={32} />
                      </Link>
                      <button className="p-1.5 w-8 rounded-lg text-gray-400 hover:text-[#F5A623] hover:bg-orange-50 transition-colors">
                        <Image src={viewEye} alt="View" width={32} height={32} />
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