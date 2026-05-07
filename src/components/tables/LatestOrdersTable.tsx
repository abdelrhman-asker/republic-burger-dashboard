import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const allOrders = [
  { id: "FD-8095", name: "Ali Ahmed", date: "22 March 2022", order: "Beef Burger", status: "Done" },
  { id: "FD-8096", name: "Sara Mohamed", date: "23 March 2022", order: "Chicken Wrap", status: "Ready" },
  { id: "FD-8097", name: "Omar Hassan", date: "23 March 2022", order: "Caesar Salad", status: "Process" },
  { id: "FD-8098", name: "Nour Ali", date: "24 March 2022", order: "Fish Sandwich", status: "Done" },
  { id: "FD-8099", name: "Karim Youssef", date: "24 March 2022", order: "Veggie Burger", status: "Done" },
  { id: "FD-8100", name: "Layla Ibrahim", date: "25 March 2022", order: "Beef Burger", status: "Ready" },
  { id: "FD-8101", name: "Ahmed Samir", date: "25 March 2022", order: "Grilled Chicken", status: "Done" },
  { id: "FD-8102", name: "Dina Khaled", date: "26 March 2022", order: "Pasta Alfredo", status: "Process" },
  { id: "FD-8103", name: "Youssef Nabil", date: "26 March 2022", order: "Beef Burger", status: "Done" },
  { id: "FD-8104", name: "Mona Farouk", date: "27 March 2022", order: "Shrimp Tacos", status: "Ready" },
  { id: "FD-8105", name: "Tarek Mansour", date: "27 March 2022", order: "Club Sandwich", status: "Done" },
  { id: "FD-8106", name: "Rania Adel", date: "28 March 2022", order: "Beef Burger", status: "Process" },
  { id: "FD-8107", name: "Hassan Fathy", date: "28 March 2022", order: "Margherita Pizza", status: "Done" },
  { id: "FD-8108", name: "Iman Sayed", date: "29 March 2022", order: "Beef Burger", status: "Done" },
  { id: "FD-8109", name: "Sherif Gamal", date: "29 March 2022", order: "BBQ Ribs", status: "Ready" },
  { id: "FD-8110", name: "Nadia Wahba", date: "30 March 2022", order: "Beef Burger", status: "Done" },
];

const ITEMS_PER_PAGE = 6;

const statusClass: Record<string, string> = {
  Done: "bg-[#E8F8E5] text-[#00A000] hover:bg-[#E8F8E5]",
  Ready: "bg-[#FFECE6] text-[#FF4B26] hover:bg-[#FFECE6]",
  Process: "bg-[#E8F0FF] text-[#1D64D8] hover:bg-[#E8F0FF]",
};

function LatestOrdersTable() {
  const [currentPage, setCurrentPage] = useState(1);
    const t = useTranslations("tables");
  const totalPages = Math.ceil(allOrders.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentOrders = allOrders.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="mt-24 w-full overflow-hidden rounded-[12px] rounded-b-none border border-[#DEDEDE] bg-white">
      <div className="flex items-center justify-between px-5 py-4">
        <h2 className="text-[17px] font-semibold text-[#2E2E2E]">
            {t("latestOrders")}
        </h2>
        <Link
          href="/orders"
          className="h-auto rounded-[4px] bg-[#F6F6F6] px-6 py-3 text-[12px] font-medium text-[#2E2E2E] hover:bg-[#F1F1F1] cursor-pointer"
        >
            {t("viewAll")}
        </Link>
      </div>

      <div className="overflow-x-auto">
        <Table className="min-w-[850px]">
          <TableHeader>
            <TableRow className="bg-[#F6F6F6] hover:bg-[#F5F5F5]">
              {["Number ID", "Name", "Date", "Order", "Status"].map((col) => (
                <TableHead key={col} className="px-5 py-4 text-[14px] font-medium text-[#2E2E2E]">
                  {col}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {currentOrders.map((item, index) => (
              <TableRow key={index} className="border-b border-[#EFEFEF] hover:bg-transparent">
                <TableCell className="px-5 py-4 text-[14px] text-[#2E2E2EB3] leading-[20px] tracking-[0.5px]">{item.id}</TableCell>
                <TableCell className="px-5 py-4 text-[14px] text-[#2E2E2EB3] leading-[20px] tracking-[0.5px]">{item.name}</TableCell>
                <TableCell className="px-5 py-4 text-[14px] text-[#2E2E2EB3] leading-[20px] tracking-[0.5px]">{item.date}</TableCell>
                <TableCell className="px-5 py-4 text-[14px] text-[#2E2E2EB3] leading-[20px] tracking-[0.5px]">{item.order}</TableCell>
                <TableCell className="px-5 py-4">
                  <Badge className={`rounded-[6px] px-4 py-2 text-[11px] font-medium shadow-none leading-[20px] tracking-[0.5px]" ${statusClass[item.status]}`}>
                    {item.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

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
          className="text-[18px] font-bold text-[#FF8A00] disabled:opacity-30 cursor-pointer "
        >
          »
        </button>
      </div>
    </div>
  );
}

export default LatestOrdersTable;