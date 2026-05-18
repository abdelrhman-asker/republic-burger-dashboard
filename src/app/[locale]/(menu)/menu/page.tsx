"use client";

import { useTranslations } from "next-intl";
import MenuTable from "@/components/tables/MenuTable";
import { useRouter } from "@/i18n/navigation"; // adjust to your router import

export default function MenuPage() {
  const t      = useTranslations("Menu");
  const router = useRouter();

  return (
    <main className="flex-1 flex flex-col p-8 px-4">
      <div className="flex items-start justify-between max-w-[80%]">
        <div>
          <h1 className="font-headFont font-extrabold text-[28px]">
            {t("mainTitle")}
          </h1>
        </div>
      </div>

      <MenuTable onAddNew={() => router.push("/menu/create")} />
    </main>
  );
}