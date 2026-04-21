"use client";

import { useState, type JSX } from "react";
import ServiceCard from "./card";
import { useRouter } from "next/navigation";

type ServiceCard = {
  id: string;
  title: string;
  description: string;
  link: string;
  icon: JSX.Element; // can be emoji OR icon component later
};

interface ServiceType {
  title?: string;
  subtitle?: string;
  services: ServiceCard[];
  loading?: boolean;
}

export default function Service({
  title,
  subtitle,
  services,
  loading,
}: ServiceType) {
  const [selected, setSelected] = useState<string>(
    services.length > 0 ? services[0].id : "",
  );

  const router = useRouter();

  return (
    <div className="w-full rounded-xl bg-white p-4 md:-6 lg:p-8 shadow">
      {/* Header */}
      {title ? (
        <h1 className="font-exo font-bold text-[24px] leading-[120%] lg:text-[34px] tracking-normal">
          {title}
        </h1>
      ) : null}
      {subtitle ? (
        <p className="mt-2 font-exo font-normal lg:text-[14px] text-[12px] leading-[100%] tracking-normal text-[#2C6176]">
          {subtitle}
        </p>
      ) : null}

      {/* Cards */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {loading
          ? [1, 2, 3].map((_, i) => (
              <div key={i} className="relative rounded-xl border-2 border-gray-200 bg-white p-5 animate-pulse">
                {/* Top Right Circle */}
                <div className="absolute right-4 top-4 h-5 w-5 rounded-full border border-gray-300"></div>

                {/* Icon */}
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-200"></div>

                {/* Title */}
                <div className="h-5 w-3/4 bg-gray-200 rounded mb-2"></div>

                {/* Description */}
                <div className="h-3 w-full bg-gray-200 rounded mb-2"></div>
                <div className="h-3 w-5/6 bg-gray-200 rounded"></div>
              </div>
            ))
          : services.map((service) => (
              <ServiceCard
                key={service.id}
                {...service}
                selected={selected === service.id}
                onSelect={setSelected}
              />
            ))}
      </div>

      {/* Divider */}
      <div className="my-6 border-t border-gray-200" />

      {/* Button */}
      {services.length > 0 ? (
        <button
          className="
            bg-[#2F5D67] hover:bg-[#254c54]
            text-white px-6 py-3 rounded-lg font-medium transition
            w-full lg:w-auto
          "
          disabled={loading}
          onClick={() =>
            router.push(
              `${services.find((item) => item.id === selected)?.link ?? "#"}?homeCategory=${selected}`,
            )
          }
        >
          Continue →
        </button>
      ) : null}
    </div>
  );
}
