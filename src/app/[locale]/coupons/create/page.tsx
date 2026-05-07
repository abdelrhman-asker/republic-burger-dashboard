"use client";

import CreateCouponForm from "@/components/forms/CreateCouponForm";

export default function CreateCouponPage() {
  return (
    <main className="flex-1 flex flex-col p-8 px-4">
      <div className="mb-6">
        <h1 className="font-headFont font-extrabold text-[28px]">
          Create New Coupon
        </h1>
      </div>

      <CreateCouponForm />
    </main>
  );
}