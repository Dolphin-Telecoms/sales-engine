"use client";

import { FC } from "react";
import { FiZap } from "react-icons/fi";

type HeroProps = {
  label?: string;
  title: string;
  highlight: string;
  description: string;
};

const Hero: FC<HeroProps> = ({
  label = "MOBILE SOUTH AFRICA",
  title,
  highlight,
  description,
}) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#2F6674] px-6 py-8 md:px-12 md:py-12">
      {/* Background Circles */}
      <div className="absolute -top-35 md:-top-20 -right-35 md:-right-20 h-64 w-64 rounded-full bg-[#3D7C8A] opacity-40"></div>
      <div className="hidden md:block absolute bottom-[-60px] right-[120px] h-40 w-40 rounded-full bg-[#3D7C8A] opacity-30"></div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl">
        {/* Label */}
        <div className="flex items-center gap-2 text-[12px] tracking-[2px] text-[#F59E0B] uppercase mb-3">
          {label}
        </div>

        {/* Title */}
        <h1 className="text-white text-[24px] lg:text-[34px] font-bold leading-tight">
          {title} <span className="text-[#F59E0B]">{highlight}</span>
        </h1>
        {/* Description */}
        <p className="mt-4 text-[#D1D5DB] text-[12px] lg:text-[14px] leading-relaxed">
          {description}
        </p>
        {/* Highlight Box */}
        <div className="mt-6 inline-flex items-center gap-3 border border-white/30 rounded-lg px-4 py-3 bg-white/5 backdrop-blur-sm">
          <FiZap className="text-white text-lg" />
          <span className="font-normal text-white text-[12px] lg:text-[14px] leading-[100%] tracking-[0%]">
            LTE & Fibre Customers Get 3GB Free Every Month
          </span>
        </div>

         {/* Footer Text */}
        <p className="text-[12px] lg:text-[14px] text-gray-300 mt-4 max-w-xl">
          Add your SIM to your existing Dolphin account to enjoy your monthly
          3GB benefit.
        </p>
      </div>
    </div>
  );
};

export default Hero;
