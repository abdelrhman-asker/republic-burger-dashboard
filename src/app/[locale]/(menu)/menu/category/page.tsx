import CategoryManagementTable from "@/components/tables/CategoryManagementTable";

export default function MenuCategoryPage() {
  return (
    <main className="flex-1 flex flex-col p-8 px-4">
      <div className="flex items-start justify-between max-w-[80%]">
        <div>
          <h1 className="font-headFont font-extrabold text-[28px]">
            Category Management
          </h1>
        </div>
      </div>

      <CategoryManagementTable />
    </main>
  );
}
