"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Logo from "@/./../public/images/MainLogoRed.svg";
import Image from "next/image";
export default function ResetPassword() {
  const t = useTranslations("auth");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add real authentication here
    router.push("/dashboard"); // Redirect to home after login
  };

  return (
    <main className="flex-1 h-full flex items-stretch justify-center p-8">
      <div className="w-full  space-y-6 flex flex-col items-normal justify-center">
        <div>
        <Image src={Logo} alt="Logo" className="mx-auto w-auto mb-10" />
        <h1 className="text-[28px] font-bold text-center">{t("forgotPasswordTitle")}</h1>
        <h5 className="text-[15px] mt-6 font-regular text-center text-[#666666]">
          {t("forgotPasswordSubtitle")}
        </h5>
        </div>
        <form className="space-y-4 flex flex-col w-full max-w-[391px] mx-auto mt-6" onSubmit={handleSubmit}>
          <div className=" mx-auto w-full max-w-[352px]">

          <label htmlFor="email" className=" text-sm font-medium">
            {t("email")}
          </label>
          <input
            type="email"
            placeholder={t("enteremail")}
            className="w-full px-4 py-3 border border-[#DEDEDE]  rounded-sm max-h-10 "
            />
            </div>
           
          <button
            type="submit"
            className="w-full px-4 py-3 bg-primarybg mt-10 text-white font-bold text-[22px] rounded-[10px]"
          >
            {t("sendLink")}
          </button>
        </form>
      </div>
    </main>
  );
}
