"use client";

import { useLocale, useTranslations } from "next-intl";
import LanguageSwitcher from "./Languageswitcher";
import Image from "next/image";
import { use, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const t = useTranslations("navigation");
  return (
    <header
      className={`h-16 top-4 border-b border-gray-200 bg-white flex items-center justify-between px-6 absolute ${
        isArabic ? "left-0" : "right-0"
      }`}
    >
      <LanguageSwitcher />

      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </button>

        {/* User Avatar + Dropdown */}
        <div className="relative">
          <button
            className="flex items-center gap-2"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-200 border border-gray-200">
              <Image
                src="/avatar.png"
                alt="User Avatar"
                width={40}
                height={40}
                className="object-cover w-full h-full"
                onError={(e) => {
                  // Fallback to initials if image fails
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
            {/* Chevron */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
                dropdownOpen ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-100 rounded-xl shadow-lg py-1 z-50">
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  {t("profile")}
              </button>
              <Link href="/settings" className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                {t("settings")}
              </Link>
              <hr className="my-1 border-gray-100" />
              <button className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors">
                {t("logout")}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}