"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import upload from "@/../public/images/upload.svg";

type ImageUploadBoxProps = {
  file: File | null;
  onFileChange: (file: File) => void;
  label?: string;
  hint?: string;
  className?: string;
  previewClassName?: string;
};

export default function ImageUploadBox({
  file,
  onFileChange,
  label = "Click to upload or drag and drop",
  hint = "SVG, PNG, JPG (max. 5MB)",
  className = "h-[142px] w-full",
  previewClassName = "h-full w-full",
}: ImageUploadBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const previewUrlRef = useRef<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    };
  }, []);

  const setFile = (selectedFile?: File) => {
    if (!selectedFile || !selectedFile.type.startsWith("image/")) return;
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
    }

    const nextPreviewUrl = URL.createObjectURL(selectedFile);
    previewUrlRef.current = nextPreviewUrl;
    setPreviewUrl(nextPreviewUrl);
    onFileChange(selectedFile);
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(event) => {
        event.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(event) => {
        event.preventDefault();
        setDragging(false);
        setFile(event.dataTransfer.files?.[0]);
      }}
      className={`relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[8px] border border-dashed transition-colors ${
        dragging
          ? "border-[#FF8A00] bg-[#FFF7ED]"
          : "border-[#CBD5E1] bg-[#F8FAFC] hover:border-[#FF8A00] hover:bg-[#FFF7ED]"
      } ${className}`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/svg+xml,image/png,image/jpeg,image/jpg"
        className="hidden"
        onChange={(event) => setFile(event.target.files?.[0])}
      />

      {previewUrl ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={previewUrl}
            alt={file?.name ?? "Uploaded image preview"}
            className={`object-contain ${previewClassName}`}
          />
          <div className="absolute inset-x-0 bottom-0 bg-black/55 px-3 py-2 text-center text-[12px] font-medium text-white">
            {file?.name}
          </div>
        </>
      ) : (
        <>
          <Image src={upload} alt="Upload" width={22} height={22} />
          <span className="mt-3 text-center text-[12px] font-medium text-[#334155]">
            {label}
          </span>
          <span className="text-center text-[11px] text-[#94A3B8]">{hint}</span>
        </>
      )}
    </div>
  );
}
