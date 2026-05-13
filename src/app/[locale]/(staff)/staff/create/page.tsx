"use client";

import { useTranslations } from "next-intl";
import AddNewStaffForm from "@/components/forms/AddNewStaffForm";

export default function AddNewStaffPage() {
  const t = useTranslations("StaffDirectory");

  return (
    <main className="flex-1 flex flex-col p-8 px-4">
      <div className="mb-6">
        <h1 className="font-headFont font-extrabold text-[28px] mb-12">
          {t("addNewStaffTitle")}
        </h1>
      </div>

      <AddNewStaffForm />
    </main>
  );
}