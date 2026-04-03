"use client";

import Image from "next/image";
import { useState, ReactNode } from "react";
import { FaCheck, FaRegCheckCircle } from "react-icons/fa";
import cn from "classnames";
import { redirect, useSearchParams, useRouter } from "next/navigation";
import PlanCard from "@/src/components/PlanCard";

// Types
interface Item {
  id: string;
  name: string;
  price: string;
  icon: ReactNode;
}

interface SectionProps {
  title: string;
  children: ReactNode;
}

interface CardProps {
  item: Item;
  selected: string[];
  toggle: (id: string) => void;
}

const entertainment: Item[] = [
  {
    id: "netflix",
    name: "Netflix",
    price: "$15/mo",
    icon: (
      <Image
        src="/social-media-icon/Netflix.png"
        alt="Netflix"
        width={40}
        height={40}
      />
    ),
  },
  {
    id: "spotify",
    name: "Spotify",
    price: "$10/mo",
    icon: (
      <Image
        src="/social-media-icon/Spotify.png"
        alt="Spotify"
        width={40}
        height={40}
      />
    ),
  },
  {
    id: "twitch",
    name: "Twitch",
    price: "$25/mo",
    icon: (
      <Image
        src="/social-media-icon/Twitch.png"
        alt="Twitch"
        width={40}
        height={40}
      />
    ),
  },
  {
    id: "binance",
    name: "Binance",
    price: "$50/mo",
    icon: (
      <Image
        src="/social-media-icon/Binance.png"
        alt="Binance"
        width={40}
        height={40}
      />
    ),
  },
  {
    id: "apple",
    name: "Apple",
    price: "$20/mo",
    icon: (
      <Image
        src="/social-media-icon/Vector.png"
        alt="Apple"
        width={40}
        height={40}
      />
    ),
  },
];

const gaming: Item[] = [
  {
    id: "ps",
    name: "PlayStation",
    price: "$20/mo",
    icon: (
      <Image
        src="/social-media-icon/PlayStation.png"
        alt="PlayStation"
        width={40}
        height={40}
      />
    ),
  },
  {
    id: "xbox",
    name: "Xbox",
    price: "$20/mo",
    icon: (
      <Image
        src="/social-media-icon/Xbox.png"
        alt="Xbox"
        width={40}
        height={40}
      />
    ),
  },
  {
    id: "steam",
    name: "Steam",
    price: "$25/mo",
    icon: (
      <Image
        src="/social-media-icon/Steam.png"
        alt="Steam"
        width={40}
        height={40}
      />
    ),
  },
  {
    id: "roblox",
    name: "Roblox",
    price: "$10/mo",
    icon: (
      <Image
        src="/social-media-icon/Roblox_Corporation.png"
        alt="Roblox"
        width={40}
        height={40}
      />
    ),
  },
  {
    id: "mc",
    name: "Minecraft",
    price: "$30/mo",
    icon: (
      <Image
        src="/social-media-icon/minecraft.png"
        alt="Minecraft"
        width={40}
        height={40}
      />
    ),
  },
];

const shoping: Item[] = [
  {
    id: "amazon",
    name: "Amazon",
    price: "$50/mo",
    icon: (
      <Image
        src="/social-media-icon/amazon.png"
        alt="Amazon"
        width={40}
        height={40}
      />
    ),
  },
];

const security: Item[] = [
  {
    id: "norton",
    name: "Norton Security",
    price: "$40/mo",
    icon: (
      <Image
        src="/social-media-icon/norton.png"
        alt="Norton"
        width={40}
        height={40}
      />
    ),
  },
  {
    id: "mcafee",
    name: "McAfee",
    price: "$35/mo",
    icon: (
      <Image
        src="/social-media-icon/mcafee-antivirus.png"
        alt="McAfee"
        width={40}
        height={40}
      />
    ),
  },
];

export default function Extras() {
  const [streaming, setStreaming] = useState<boolean>(true);
  const [dataBoost, setDataBoost] = useState<boolean>(false);
  const [selectedVouchers, setSelectedVouchers] = useState<string[]>([
    "spotify",
  ]);
  const [bundleActive, setBundleActive] = useState<boolean>(false);
  const [mobilePlan, setMobilePlan] = useState<string>("standard");

  const toggleVoucher = (id: string) => {
    setSelectedVouchers((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id],
    );
  };

  const search = useSearchParams();
  const router = useRouter();

  return (
    <div className="w-full lg:max-w-3xl bg-white rounded-xl p-4 xl:p-8 shadow-sm">
      <h1 className="font-exo font-bold  text-[24px] lg:text-[34px] leading-[1.2] tracking-normal mb-2">
        Enhance Your Plan
      </h1>
      <p className="font-exo font-normal  text-[12px] lg:text-[14px] leading-[1] tracking-normal text-[#2C6176] mb-6">
        Optional add-ons. Each selection updates your monthly and once-off
        totals instantly.
      </p>

      {/* Top Addons */}
      <div className="space-y-4 mb-6">
        <PlanCard
          image="/extra/Voucher.png"
          title="Streaming Voucher"
          description="Enjoy your favourite content with a monthly streaming credit."
          selected={streaming}
          onClick={() => setStreaming(!streaming)}
          price="$9/mo"
        />
        <PlanCard
          image="/extra/Failover.png"
          title="Extra Data Boost"
          description="Increase your monthly data allowance by 50GB."
          selected={dataBoost}
          onClick={() => setDataBoost(!dataBoost)}
          price="$15/mo"
        />
      </div>

      <Section title="ENTERTAINMENT">
        {entertainment.map((item) => (
          <Card
            key={item.id}
            item={item}
            selected={selectedVouchers}
            toggle={toggleVoucher}
          />
        ))}
      </Section>

      <Section title="GAMING">
        {gaming.map((item) => (
          <Card
            key={item.id}
            item={item}
            selected={selectedVouchers}
            toggle={toggleVoucher}
          />
        ))}
      </Section>

      <Section title="SHOPPING">
        {shoping.map((item) => (
          <Card
            key={item.id}
            item={item}
            selected={selectedVouchers}
            toggle={toggleVoucher}
          />
        ))}
      </Section>

      <Section title="SECURITY">
        {security.map((item) => (
          <Card
            key={item.id}
            item={item}
            selected={selectedVouchers}
            toggle={toggleVoucher}
          />
        ))}
      </Section>

      {/* Bundle */}
      <div className="border-2 border-dashed border-[#f59e0b] rounded-xl p-5 mt-6 bg-[#fff7ed]">
        <div
          className={cn(
            "flex flex-col md:flex-row justify-between items-center gap-4",
            {
              "mb-4 pb-4 border-b border-[#f59e0b]": bundleActive,
            },
          )}
        >
          <div className="flex gap-4">
            <div className="bg-[#FDECCC] rounded-lg py-4 px-2 text-2xl">📱</div>
            <div className="flex-1">
              <p className="font-exo font-bold text-[20px] leading-[1.2] tracking-normal">
                Bundle & Save 10%
              </p>
              <p className="text-sm text-[#6b7280]">
                Add a Mobile Plan and save 10% on your Internet package monthly
                price.
              </p>
            </div>
          </div>

          <button
            onClick={() => setBundleActive(!bundleActive)}
            className={`px-4 w-full md:w-[200px] py-2 rounded-lg border ${
              bundleActive
                ? "bg-[#ecfdf5] text-[#065f46] border-[#10b981]"
                : "bg-[#f59e0b] text-white border-[#f59e0b]"
            }`}
          >
            {bundleActive ? "✓ Bundle Active" : "Add Mobile Plan"}
          </button>
        </div>

        {bundleActive && (
          <div className="space-y-3">
            <p className="font-exo font-bold text-[14px] leading-[1] tracking-normal">
              Select Mobile Plan
            </p>
            {["basic", "standard", "global"].map((plan) => {
              const isActive = mobilePlan === plan;

              const data = {
                basic: {
                  title: "Basic Mobile",
                  desc: "3GB Data · Calls & SMS · Zimbabwe & SA",
                  price: "$19/mo",
                },
                standard: {
                  title: "Standard Mobile",
                  desc: "8GB Data · Calls & SMS · Zimbabwe & SA",
                  price: "$29/mo",
                },
                global: {
                  title: "Global eSIM",
                  desc: "10GB Data · 100+ countries",
                  price: "$39/mo",
                },
              }[plan as "basic" | "standard" | "global"];

              return (
                <div
                  key={plan}
                  onClick={() => setMobilePlan(plan)}
                  className={`flex justify-between items-center p-4 rounded-xl border cursor-pointer ${
                    isActive
                      ? "border-2 border-[#f59e0b] bg-[#fff7ed]"
                      : "border-[#e5e7eb] bg-[#FFFFFF]"
                  }`}
                >
                  <div>
                    <p className="font-exo font-bold text-[16px] leading-[1.5] tracking-normal">
                      {data.title}
                    </p>
                    <p className="text-sm text-[#6b7280]">{data.desc}</p>
                    <span className="lg:hidden block font-exo font-bold text-[16px] leading-[1.2] tracking-normal mt-3 text-[#2C6176]">
                      {data.price}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="hidden lg:block font-exo font-bold text-[16px] leading-[1.2] tracking-normal text-right text-[#2C6176]">
                      {data.price}
                    </span>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        isActive
                          ? "bg-[#f59e0b] border-[#f59e0b]"
                          : "border-[#d1d5db]"
                      }`}
                    >
                      {isActive && <FaCheck className="text-white text-xs" />}
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="mt-3 p-3 rounded-lg bg-[#ecfdf5] border border-[#10b981] text-[#065f46] font-[Exo] font-bold text-[14px] leading-[100%] tracking-[0%] flex items-center gap-2">
              <FaRegCheckCircle className="hidden sm:flex" />
              <FaRegCheckCircle size={30} className="sm:hidden flex" /> Bundle
              savings applied. You're saving 10% on your Internet package.
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex flex-col lg:flex-row gap-4 mt-6">
        <button
          className="px-6 py-3 border-3 border-[#1f4d5a] rounded-lg"
          onClick={() => {
            if (
              search.get("location") &&
              search.get("label") &&
              search.get("value") &&
              search.get("type")
            ) {
              router.push(
                `/home-internet/plan?location=${search.get("location")}&label=${search.get("label")}&value=${search.get("value")}&type=${search.get("type")}`,
              );
            }
          }}
        >
          Back
        </button>
        <button
          className="px-6 py-3 bg-[#1f4d5a] text-white rounded-lg"
          onClick={() => {
            if (
              search.get("location") &&
              search.get("label") &&
              search.get("value") &&
              search.get("type")
            ) {
              router.push(
                `/home-internet/equipment?location=${search.get("location")}&label=${search.get("label")}&value=${search.get("value")}&type=${search.get("type")}`,
              );
            }
          }}
        >
          Continue →
        </button>
      </div>
    </div>
  );
}

function Card({ item, selected, toggle }: CardProps) {
  const active = selected.includes(item.id);

  return (
    <div
      onClick={() => toggle(item.id)}
      className={`relative border rounded-xl p-4 cursor-pointer transition ${
        active ? "border-2 border-[#f59e0b] bg-[#fff7ed]" : "border-[#e5e7eb]"
      }`}
    >
      <div
        className={`absolute top-2 right-2 w-5 h-5 rounded-full border flex items-center justify-center ${
          active ? "bg-[#f59e0b] border-[#f59e0b]" : "border-[#d1d5db]"
        }`}
      >
        {active && <FaCheck className="text-white text-xs" />}
      </div>

      <div className="h-16 bg-[#f3f4f6] rounded-lg mb-3 flex items-center justify-center">
        {item.icon}
      </div>
      <p className="font-exo font-bold text-[14px] leading-[1.5] tracking-normal text-center mb-2">
        {item.name}
      </p>
      <p className="font-exo font-bold text-[16px] leading-[1.2] tracking-normal text-center text-[#2C6176]">
        {item.price}
      </p>
    </div>
  );
}

function Section({ title, children }: SectionProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#DCDCDC]">
        <div className="w-1 h-4 bg-[#f59e0b]" />
        <p className="text-xs tracking-widest text-[#6b7280]">{title}</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">{children}</div>
    </div>
  );
}
