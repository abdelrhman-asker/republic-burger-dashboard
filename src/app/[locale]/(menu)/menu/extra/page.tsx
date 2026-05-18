import ExtrasManagementTable from "@/components/tables/ExtrasManagementTable";

export default function MenuExtraPage() {
  return (
    <main className="flex-1 flex flex-col p-8 px-4">
      <div className="flex items-start justify-between max-w-[80%]">
        <div>
          <h1 className="font-headFont font-extrabold text-[28px]">
            Extras Management
          </h1>
        </div>
      </div>

      <ExtrasManagementTable />
    </main>
  );
}
