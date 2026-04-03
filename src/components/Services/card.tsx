// components/ServiceCard.tsx
"use client";

import React from "react";

type Props = {
  id: string;
  title: string;
  description: string;
  icon: React.JSX.Element;
  selected: boolean;
  onSelect: (id: string) => void;
};

const ServiceCard: React.FC<Props> = ({
  id,
  title,
  description,
  icon,
  selected,
  onSelect,
}) => {
  return (
    <div
      onClick={() => onSelect(id)}
      className={`
        relative cursor-pointer rounded-xl border p-5 transition-all
        ${
          selected
            ? "border-2 border-[#F59E0B] bg-[#F59E0B]/10 shadow-sm"
            : "border-2 border-gray-200 bg-white hover:border-gray-300"
        }
      `}
    >
      {/* Top Right Circle */}
      <div
        className={`
          absolute right-4 top-4 h-5 w-5 rounded-full border flex items-center justify-center
          ${selected ? "bg-[#F59E0B] border-[#F59E0B]" : "border-gray-300"}
        `}
      >
        {selected && <span className="text-white text-xs font-bold">✓</span>}
      </div>

      {/* Icon */}
      <div
        className={`
          mb-4 flex h-12 w-12 items-center justify-center rounded-lg text-xl
          ${selected ? "bg-[#FDECCC] text-[#F2A413]" : "bg-[#C9DFE4] text-[#2C6176]"}
        `}
      >
        {icon}
      </div>

      {/* Content */}
      <h3 className="font-exo font-bold text-[18px] lg:text-[20px] leading-[120%] tracking-normal">
        {title}
      </h3>
      <p className="mt-2 text-sm text-gray-500 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default ServiceCard;
