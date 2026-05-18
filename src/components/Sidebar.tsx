"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import Logo from "@/./../public/images/MainLogoWhite.svg";
import dashboard from "@/./../public/images/dash.svg";
import branches from "@/./../public/images/branch.svg";
import orders from "@/./../public/images/orders.svg";
import coupons from "@/./../public/images/coup.svg";
import marketing from "@/./../public/images/market.svg";
import loayaltyProgram from "@/./../public/images/loyal prog.svg";
import users from "@/./../public/images/users.svg";
import staff from "@/./../public/images/staff.svg";
import refund from "@/./../public/images/refund.svg";
import settings from "@/./../public/images/settings.svg";
import menu from "@/./../public/images/menu.svg";
import arrDown from "@/./../public/images/arr down.svg";

export default function Sidebar() {
  const t        = useTranslations("navigation");
  const pathname = usePathname();

  // Each expandable item gets its own key in this record
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    "/menu":  pathname.startsWith("/menu"),
    "/staff": pathname.startsWith("/staff"),
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleItem = (href: string) =>
    setOpenItems((prev) => ({ ...prev, [href]: !prev[href] }));

  const links = [
    { href: "/dashboard",     label: t("Dashboard"),     icon: dashboard      },
    { href: "/branches",      label: t("branches"),      icon: branches       },
    { href: "/orders",        label: t("orders"),        icon: orders         },
    { href: "/coupons",       label: t("coupons"),       icon: coupons        },
    { href: "/marketing",     label: t("marketing"),     icon: marketing      },
    {
      href: "/menu",
      label: t("menu"),
      icon: menu,
      children: [
        { href: "/menu/category", label: t("category") },
        { href: "/menu/extra",    label: t("extra")    },
      ],
    },
    { href: "/loyaltyProgram", label: t("loyaltyProgram"), icon: loayaltyProgram },
    { href: "/users",          label: t("users"),           icon: users           },
    {
      href: "/staff",
      label: t("staff"),
      icon: staff,
      children: [
        { href: "/staff/rolesandpermissions", label: t("Roles&Permissions") },
        { href: "/staff/auditlogs",          label: t("AuditLogs")         },
      ],
    },
    { href: "/refund",   label: t("refund"),   icon: refund   },
    { href: "/settings", label: t("settings"), icon: settings },
  ];

  return (
    <>
      {/* Mobile hamburger */}
      <button
        type="button"
        onClick={() => setSidebarOpen(true)}
        className="fixed top-2 left-2 z-50 flex h-7 w-10 items-center justify-center rounded-md bg-primarybg text-white lg:hidden"
        aria-label="Open sidebar"
      >
        <span className="text-2xl leading-none">=</span>
      </button>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-50 min-h-screen pb-10 w-64 bg-primarybg pe-4
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:static lg:translate-x-0
        `}
      >
        {/* Mobile close button */}
        <div className="flex justify-end pt-4 ps-4 lg:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="text-white text-2xl"
            aria-label="Close sidebar"
          >
            ×
          </button>
        </div>

        <Image
          src={Logo}
          alt="Logo"
          className="mb-8 w-auto ps-4 pt-6 lg:pt-10 pb-6 mx-auto"
          width={100}
          height={100}
        />

        <nav className="space-y-2">
          {links.map((link) => {
            const isActive     = pathname === link.href || pathname.startsWith(`${link.href}/`);
            const hasChildren  = "children" in link;
            const isOpen       = !!openItems[link.href];

            if (hasChildren) {
              return (
                <div key={link.href}>
                  <div
                    className={`w-full flex items-center justify-between rounded-[10px] text-white transition-all ${
                      isActive ? "bg-secondary" : "hover:bg-white/10"
                    }`}
                  >
                    <Link
                      href={link.href}
                      className="flex flex-1 items-center gap-3 ps-10 py-2.5"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <Image className="w-8" src={link.icon} alt={link.label} />
                      <span>{link.label}</span>
                    </Link>

                    <button
                      type="button"
                      onClick={() => toggleItem(link.href)}
                      className="pe-4 ps-3 py-3 cursor-pointer"
                      aria-label="Toggle submenu"
                    >
                      <span
                        className={`block transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      >
                        <Image src={arrDown} alt="Open submenu" />
                      </span>
                    </button>
                  </div>

                  {isOpen && (
                    <div className="mt-2 ms-4 space-y-2">
                      {link.children?.map((child) => {
                        const isChildActive = pathname === child.href;
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setSidebarOpen(false)}
                            className={`block py-2 ps-14 rounded-[10px] text-white transition-all ${
                              isChildActive ? "bg-secondary" : "hover:bg-white/10"
                            }`}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 ps-10 py-2.5 rounded-[10px] text-white transition-all ${
                  isActive ? "bg-secondary" : "hover:bg-white/10"
                }`}
              >
                <Image className="w-8" src={link.icon} alt={link.label} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}