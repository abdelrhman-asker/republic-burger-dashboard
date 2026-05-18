"use client";

import { useTranslations } from "next-intl";
import AddNewBranchForm from "@/components/forms/AddNewBranchForm";

export default function AddNewBranchPage() {
  const t = useTranslations("Branches");

  return (
    <main className="flex-1 flex flex-col p-8 px-4">
      <div className="mb-6">
        <h1 className="font-headFont font-extrabold text-[28px] mb-12">
          {t("addNewBranchTitle")}
        </h1>
      </div>

      <AddNewBranchForm />
    </main>
  );
}
