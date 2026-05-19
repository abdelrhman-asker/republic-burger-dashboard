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
import Image from "next/image";
import searchIcon from "@/.././public/images/searchIcon.svg";
import editpen    from "@/.././public/images/editpen.svg";
import viewEye   from "@/.././public/images/viewEye.svg";
import trashIco  from "@/.././public/images/trashIco.svg";
import { useTranslations } from "next-intl";
import BannerModal, { BannerFormData } from "@/components/forms/Bannermodal";
import FilterSelect from "@/components/ui/filter-select";

// ─── Types ────────────────────────────────────────────────────────────────────

type BannerStatus = "Active" | "Inactive";

interface Banner {
  id: number;
  image: string | null;
  title: string;
  redirectLink: string;
  startDate: string;
  endDate: string;
  status: BannerStatus;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const statusClass: Record<BannerStatus, string> = {
  Active:   "bg-[#25BB001A] text-[#20A300] hover:bg-[#E8F8E5]",
  Inactive: "bg-[#FF5E2C1A] text-[#FFB800] hover:bg-[#E5E5E5]",
};

const ITEMS_PER_PAGE = 10;

const allBanners: Banner[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  image: null,
  title: "Summer Double Cheese Feast",
  redirectLink: "/promo/summer-feast",
  startDate: "Jun 01,2024",
  endDate: "Aug 31, 2024",
  status: i === 1 || i === 2 ? "Inactive" : "Active",
}));

// ─── Component ────────────────────────────────────────────────────────────────

export default function PromotionalBannersTable() {
  const t = useTranslations("PromotionalBanners");

  const [banners, setBanners]         = useState<Banner[]>(allBanners);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch]           = useState("");
  const [status, setStatus]           = useState("");
  const [modal, setModal]             = useState<null | "add" | "edit">(null);
  const [editTarget, setEditTarget]   = useState<Banner | null>(null);

  // ── Filtering ──
  const filtered = banners.filter((b) => {
    const matchSearch = !search || b.title.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !status || b.status === status;
    return matchSearch && matchStatus;
  });

  const totalPages     = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const startIndex     = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentBanners = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleFilterChange =
    (setter: (v: string) => void) =>
    (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
      setter(e.target.value);
      setCurrentPage(1);
    };

  // ── Modal handlers ──
  const openAdd    = () => { setEditTarget(null); setModal("add"); };
  const openEdit   = (banner: Banner) => { setEditTarget(banner); setModal("edit"); };
  const closeModal = () => { setModal(null); setEditTarget(null); };

  const handleSave = (data: BannerFormData) => {
    if (modal === "add") {
      const newBanner: Banner = {
        id: Date.now(),
        image: null,
        title: data.title || "New Banner",
        redirectLink: data.redirectLink,
        startDate: data.startDate,
        endDate: data.endDate,
        status: "Active",
      };
      setBanners((prev) => [newBanner, ...prev]);
    } else if (modal === "edit" && editTarget) {
      setBanners((prev) =>
        prev.map((b) =>
          b.id === editTarget.id
            ? { ...b, title: data.title, redirectLink: data.redirectLink, startDate: data.startDate, endDate: data.endDate }
            : b
        )
      );
    }
    closeModal();
  };

  const handleDelete = (id: number) => setBanners((prev) => prev.filter((b) => b.id !== id));

  return (
    <div className="space-y-4 mx-1 ">

      {/* Filters */}
      <div className="flex my-12 mt-[61px] items-center gap-3 flex-wrap justify-between">
        <div className="flex items-center gap-5 flex-wrap mx-4">

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

          {/* Status */}
          <FilterSelect value={status} onChange={handleFilterChange(setStatus)}>
            <option value="">{t("statusAll")}</option>
            <option value="Active">{t("statusActive")}</option>
            <option value="Inactive">{t("statusInactive")}</option>
          </FilterSelect>
        </div>

        {/* Add Banner button */}
        <button
          onClick={openAdd}
          className="px-15 py-2 rounded-xl bg-[#DC1213] text-white text-[16px] font-bold whitespace-nowrap hover:bg-[#b80f10] transition-colors"
        >
          {t("addBannerButton")}
        </button>
      </div>

      {/* Table Card */}
      <div className="w-full overflow-hidden border border-[#DCE0E5] rounded-[12px] rounded-b-none bg-white">
        <div className="overflow-x-auto">
          <Table className="min-w-[850px]">
            <TableHeader>
              <TableRow className="bg-[#F6F6F6]">
                {[
                  { label: t("colImage"),        center: false },
                  { label: t("colTitle"),        center: false },
                  { label: t("colRedirectLink"), center: false },
                  { label: t("colStartDate"),    center: false },
                  { label: t("colEndDate"),      center: false },
                  { label: t("colStatus"),       center: false },
                  { label: t("colActions"),      center: true  },
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
              {currentBanners.map((banner, index) => (
                <TableRow key={index} className="border-b border-[#EFEFEF] hover:bg-transparent">

                  {/* Image Thumbnail */}
                  <TableCell className="px-5 py-4">
                    <div className="h-[48px] w-[48px] rounded-[8px] bg-[#F1F1F1] border border-[#E0E0E0] flex items-center justify-center overflow-hidden">
                      {banner.image ? (
                        <img src={banner.image} alt={banner.title} className="object-cover w-full h-full" />
                      ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#BDBDBD" strokeWidth="1.5">
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <polyline points="21 15 16 10 5 21" />
                        </svg>
                      )}
                    </div>
                  </TableCell>

                  {/* Title */}
                  <TableCell className="px-5 py-4 text-[14px] text-start text-[#2E2E2EB3] font-medium leading-[20px] tracking-[0.5px]">
                    {banner.title}
                  </TableCell>

                  {/* Redirect Link */}
                  <TableCell className="px-5 py-4 text-[14px] text-start text-[#2E2E2EB3] font-medium leading-[20px] tracking-[0.5px]">
                    {banner.redirectLink}
                  </TableCell>

                  {/* Start Date */}
                  <TableCell className="px-5 py-4 text-[14px] text-start text-[#2E2E2EB3] font-medium leading-[20px] tracking-[0.5px]">
                    {banner.startDate}
                  </TableCell>

                  {/* End Date */}
                  <TableCell className="px-5 py-4 text-[14px] text-start text-[#2E2E2EB3] font-medium leading-[20px] tracking-[0.5px]">
                    {banner.endDate}
                  </TableCell>

                  {/* Status Badge */}
                  <TableCell className="px-5 py-4 text-start">
                    <Badge
                      className={`rounded-[6px] px-4 py-3 text-[10px] font-regular shadow-none leading-[20px] tracking-[0.5px] min-w-[90px] inline-flex justify-center ${statusClass[banner.status]}`}
                    >
                      {banner.status === "Active" ? t("statusActive") : t("statusInactive")}
                    </Badge>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="px-5 py-4 text-center">
                    <div className="flex items-center justify-center gap-0">
                      <button
                        onClick={() => openEdit(banner)}
                        className="w-8 rounded-lg text-gray-400 hover:text-[#F5A623] hover:bg-orange-50 transition-colors"
                      >
                        <Image src={editpen} alt="Edit" width={32} height={32} />
                      </button>
                      <button className="w-8 rounded-lg text-gray-400 hover:text-[#F5A623] hover:bg-orange-50 transition-colors">
                        <Image src={viewEye} alt="View" width={32} height={32} />
                      </button>
                      <button
                        onClick={() => handleDelete(banner.id)}
                        className="w-8 rounded-lg text-gray-400 hover:text-[#FF5E2C] hover:bg-red-50 transition-colors"
                      >
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

      {/* Modals */}
      {modal === "add" && (
        <BannerModal mode="add" onClose={closeModal} onSave={handleSave} />
      )}
      {modal === "edit" && editTarget && (
        <BannerModal
          mode="edit"
          initialData={{
            title: editTarget.title,
            redirectLink: editTarget.redirectLink,
            startDate: editTarget.startDate,
            endDate: editTarget.endDate,
          }}
          onClose={closeModal}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
