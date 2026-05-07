"use client";

import { useTranslations } from "next-intl";
import UsersTable from "@/components/tables/UsersTable";

export default function Home() {
  const t = useTranslations("Users");

  return (
    <main className="flex-1 flex flex-col p-8 px-4">
      <div className="flex items-start justify-between max-w-[80%]">
        <div>
          <h1 className="font-headFont font-extrabold text-[28px]">
            {t("mainTitle")}
          </h1>
        </div>
      </div>

        <UsersTable />
    </main>
  );
}