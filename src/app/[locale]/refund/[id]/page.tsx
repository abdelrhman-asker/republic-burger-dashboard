import Image from "next/image";
import burger from "@/.././public/images/burger.svg"; 
import TimeIcon from "@/.././public/images/clockicon.svg"; 
import ordericon from "@/.././public/images/ordericon.svg"; 
import PhoneCust from "@/.././public/images/phoneCust.svg"; 
import { Bell, Phone, ShoppingBag } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function RefundDetailsPage({
    
  params,
}: {
  params: { id: string };
}) {
  const t = await getTranslations("Refund");
          const { id } = await params;


  return (
    <main className="min-h-screen bg-white px-8 py-6">
      <div className="max-w-[1160px]">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="flex items-center gap-4">
              <h1 className="text-[28px] font-extrabold">
              {t("RefundDetailsTitle")}  #{id}
              </h1>
              <span className="px-5 py-1 rounded bg-[#FFF1C7] text-[#F5A623] text-sm font-medium">
                Pending
              </span>
            </div>

            <div className="flex items-center gap-8 mt-5 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <Image src={TimeIcon} width={13} height={13} alt="time"/> 
                {t("submittedOn")}
                Sept 28, 2023 at 2:30 PM</span>
              <span className="flex items-center gap-1">
                <Image src={ordericon} width={13} height={13} alt="order" /> 
                {t("order")} 
                 #BR-8829
              </span>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <button className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center">
              <Bell size={16} />
            </button>
            <div className="w-9 h-9 rounded-full bg-gray-200" />
          </div>
        </div>

        <div className="flex flex-col  gap-x-32 gap-y-8">
            <div className="flex justify-between flex-wrap">
          {/* User Information */}
          <div className="w-[560px]">
          <Card  title={t("User Information")} action={t("View Full Profile")}>
            <div className="space-y-5">
              <div className="flex items-center gap-2">
                {/* dynamic from backend */}
                <strong>Ali Ahmed</strong>
                <span className="px-2 py-1 rounded-full bg-[#FFF1C7] text-[#F5A623] text-[10px]">
                {/* dynamic from backend */}
                  Gold Member
                </span>
              </div>
              <div className="flex gap-10 text-gray-400 text-xs">
                {/* dynamic from backend */}
                <span>+2010003435657</span>
                {/* dynamic from backend */}
                <span>5th Order</span>
              </div>
              <p className="text-gray-400 text-xs">0 LE {t("previousRefunds")}</p>
            </div>
          </Card>
</div>
          {/* History */}
          <div className="w-[440px]">

          <Card title={t("Request History")}>
            <div className="relative pl-5 space-y-10 text-xs">
              <div className="absolute left-[5px] top-[25px] bottom-[-25px] w-px bg-gray-200" />
              <HistoryDot active />
              <HistoryDot />
              <div>
                <p className="font-semibold">{t("requestcreated")}</p>
                {/* dynamic from backend */}
                <p className="text-gray-400">Today, 2:30 PM</p>
              </div>
              <div>
                <p className="font-semibold">{t("autoAssigned")}</p>
                {/* dynamic from backend */}
                <p className="text-gray-400">Today, 2:31 PM</p>
              </div>
            </div>
          </Card>
          </div>
</div>

 <div className="flex justify-between flex-wrap">
          {/* Order Summary */}
          <div className="w-[560px]">
          <Card title={t("Order Summary")}>
            <table className="w-full text-xs">
              <thead className="text-gray-500 border-b">
                <tr>
                  <th className="py-3 text-left">{t("quantity")} QTY</th>
                  <th className="py-3 text-center">{t("PRICE")}</th>
                  <th className="py-3 text-center">{t("ITEM")}</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3].map((i) => (
                  <tr key={i}>
                {/* dynamic from backend */}
                    <td className="py-4">Double Cheeseburger</td>
                {/* dynamic from backend */}
                    <td className="py-4 text-center">1</td>
                {/* dynamic from backend */}
                    <td className="py-4 text-center">12.50</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-[#FAFAFA]">
                <tr>
                  <td />
                  <td className="py-3 text-right text-gray-500">{t("SubTotal")}</td>
                  <td className="py-3 text-center font-semibold">$22.50</td>
                </tr>
                <tr>
                  <td />
                  <td className="py-3 text-right text-gray-500">{t("Tax")}</td>
                  <td className="py-3 text-center font-semibold">$1.80</td>
                </tr>
                <tr>
                  <td />
                  <td className="py-3 text-right font-bold">{t("Total")}</td>
                  <td className="py-3 text-center font-bold text-[#F5A623]">
                    $24.30
                  </td>
                </tr>
              </tfoot>
            </table>
          </Card>
</div>
          {/* Admin Decision */}
          <div className="w-[440px]">
          <Card title={t("Admin Decision")}>
            <label className="text-xs font-medium">{t("InternalNotes")}</label>
            <textarea
              placeholder={t("contextPlaceHolder")}
              className="mt-2 w-full h-24 resize-none rounded-lg border border-gray-200 p-4 text-xs outline-none"
            />
            <div className="flex gap-6 mt-8">
              <button className="flex-1 h-10 rounded-lg border border-red-500 text-red-600 font-semibold">
                {t("Reject")}
                              </button>
              <button className="flex-1 h-10 rounded-lg bg-[#E50914] text-white font-semibold">
                {t("Approve")}
              </button>
            </div>
          </Card>
          </div>
</div>

          {/* Refund Reason */}
          <section className="w-[945px] max-w-full rounded-xl border border-gray-200 overflow-hidden">
            <div className="bg-[#FAFAFA] px-6 py-4 border-b">
              <h2 className="font-bold text-lg">
                {t("RefundReason")}
                </h2>
            </div>

            <div className="p-6">
              <p className="text-xs text-gray-500 mb-3">{t("CustomerStatement")}</p>
              {/* dynamic from backend */}
              <div className="border border-gray-200 bg-[#FAFAFA] rounded-md p-4 text-sm text-gray-600 leading-6">
                “The food arrived completely cold after waiting for over an
                hour. Also, the burger was severely undercooked (pink in the
                middle) which is a safety concern. I couldn&apos;t eat it.
                Please refund the burger and fries.”
              </div>

              <p className="text-xs text-gray-500 mt-8 mb-4">{t("Gallery")}</p>
              <div className="flex gap-5">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-[145px] h-[145px] rounded-lg border border-[#F5A623] overflow-hidden"
                  >
                    <Image
                      src={burger}
                      alt="Burger"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              <button className="mt-12 flex items-center gap-2 px-5 h-10 rounded-lg border border-red-500 text-red-600 font-semibold text-sm">
                <Image src={PhoneCust} alt="Phone" width={18} height={18} />
                {t("ContactCustomer")}
              </button>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function Card({
  title,
  action,
  children,
}: {
  title: string;
  action?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-gray-200 overflow-hidden">
      <div className="bg-[#FAFAFA] px-5 py-4 border-b flex items-center justify-between">
        <h2 className="font-bold text-lg">{title}</h2>
        {action && (
          <button className="text-xs text-red-500 font-semibold">
            {action}
          </button>
        )}
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

function HistoryDot({ active }: { active?: boolean }) {
  return (
    <span
      className={`absolute left-0 w-3 h-3 rounded-full ${
        active ? "top-2 bg-[#F5A623]" : "top-[82px] bg-gray-300"
      }`}
    />
  );
}