"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Logo from "@/./../public/images/MainLogoRed.svg";
import Image from "next/image";
export default function Login() {
  const t = useTranslations("auth");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add real authentication here
    router.push("/dashboard"); // Redirect to home after login
  };

  return (
    <main className="flex-1 h-full flex items-stretch justify-center p-8">
      <div className="w-full space-y-6 flex flex-col items-normal justify-center">
        <div>
        <Image src={Logo} alt="Logo" className="mx-auto w-auto mb-10" />
        <h1 className="text-[28px] font-bold text-center">{t("welcomeBack")}</h1>
        </div>
        <form className="space-y-4 flex flex-col w-full max-w-[391px] m-auto" onSubmit={handleSubmit}>
          <div className="mb-10 mx-auto w-full max-w-[352px]">

          <label htmlFor="email" className=" text-sm font-medium">
            {t("email")}
          </label>
          <input
            type="email"
            placeholder={t("enteremail")}
            className="w-full px-4 py-3 border border-[#DEDEDE]  rounded-sm max-h-10 "
            />
            </div>
            <div className="mb-10 mx-auto w-full max-w-[352px]">

          <label htmlFor="password" className=" text-sm font-medium">
            {t("password")}
          </label>
          <input
            type="password"
            placeholder={t("enterPassword")}
            className="w-full px-4 py-3 border border-[#DEDEDE] rounded-sm max-h-10 "
            />
<div className="flex justify-between mt-5">
  {/* Remember Me */}
  <label className="flex items-center gap- text-[10px] font-medium cursor-pointer">
    <input
      type="checkbox"
      className="w-3 h-3 accent-primarybg cursor-pointer  "
    />
    {t("rememberMe")}
  </label>

  {/* Forgot Password */}
  <button
    type="button"
    onClick={() => router.push("/resetpassword")}
    className="text-[10px] cursor-pointer hover:underline font-medium text-secondary"
  >
    {t("forgotPassword")}
  </button>
  </div>
</div>
          <button
            type="submit"
            className="w-full px-4 py-3 bg-primarybg mt-10 text-white font-bold text-[22px] rounded-[10px]"
          >
            {t("login")}
          </button>
        </form>
      </div>
    </main>
  );
}
