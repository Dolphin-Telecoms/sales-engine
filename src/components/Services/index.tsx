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
}

export default function Service({ title, subtitle, services }: ServiceType) {
  const [selected, setSelected] = useState<string>(
    services.length > 0 ? services[0].id : "",
  );

  const router = useRouter();

  return (
    <div className="w-full rounded-xl bg-white p-4 md:-6 lg:p-8 shadow">
      {/* Header */}
      {title ? (
        <h1 className="font-exo font-bold text-[24px] leading-[120%] lg:text-[34px] tracking-normal">{title}</h1>
      ) : null}
      {subtitle ? (
        <p className="mt-2 font-exo font-normal lg:text-[14px] text-[12px] leading-[100%] tracking-normal text-[#2C6176]">{subtitle}</p>
      ) : null}

      {/* Cards */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {services.map((service) => (
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
          onClick={() =>
            router.push(
              `${services.find((item) => item.id === selected)?.link ?? "#"}`,
            )
          }
        >
          Continue →
        </button>
      ) : null}
    </div>
  );
}
