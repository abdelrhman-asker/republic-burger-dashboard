// app/[locale]/menu/create/page.tsx

"use client";

import { useTranslations } from "next-intl";
import CreateMenuItemForm from "@/components/forms/CreateMenuItemForm";

export default function CreateMenuItemPage() {
  const t = useTranslations("CreateMenuItem");

  return (
    <main className="flex-1 flex flex-col p-8 px-4">
      <div className="mb-6">
        <h1 className="font-headFont font-extrabold text-[28px]">
          {t("mainTitle")}
        </h1>
      </div>

      <CreateMenuItemForm />
    </main>
  );
}