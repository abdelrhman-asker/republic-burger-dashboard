"use client";

import * as React from "react";

type FilterSelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  className?: string;
};

const baseClassName =
  "ps-3 pe-8 py-2 lg:min-w-[130px] lg:min-h-[38px] rounded-[8px] border border-gray-200 text-sm text-gray-700 bg-white " +
  "appearance-none focus:outline-none focus:ring-2 focus:ring-[#F5A623]/30 focus:border-[#F5A623] transition";

export default function FilterSelect({ className = "", children, ...props }: FilterSelectProps) {
  return (
    <div className="relative">
      <select {...props} className={`${baseClassName} ${className}`.trim()}>
        {children}
      </select>
      <span className="absolute end-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M2 4L6 8L10 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </div>
  );
}
