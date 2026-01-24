"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

export function ImagePreview() {
  const [isOpen, setIsOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState("");

  // Global event listener for image clicks within the blog content
  // accessible via window.openImagePreview
  if (typeof window !== "undefined") {
    // @ts-ignore
    window.openImagePreview = (src: string) => {
      setImgSrc(src);
      setIsOpen(true);
    };
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
      onClick={() => setIsOpen(false)}
    >
      <button
        onClick={() => setIsOpen(false)}
        className="absolute top-4 right-4 text-white p-2 rounded-full bg-black/50 hover:bg-white/20 transition-colors"
      >
        <X size={24} />
      </button>
      <img
        src={imgSrc}
        alt="Preview"
        className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
