"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { redirect, useSearchParams, useRouter } from "next/navigation";

const plans = [
  {
    id: "lite",
    name: "Lite",
    price: 29,
    features: ["50Gb Data", "Up to 20Mbps", "Free Installation"],
  },
  {
    id: "plus",
    name: "Plus",
    price: 40,
    popular: true,
    features: [
      "Uncapped Data",
      "Up to 50Mbps",
      "Free Installation",
      "Priority support",
    ],
  },
  {
    id: "max",
    name: "Max",
    price: 45,
    features: [
      "Uncapped Data",
      "Up to 100Mbps",
      "Free Installation",
      "24/7 Priority support",
    ],
  },
  {
    id: "unlimited",
    name: "Unlimited",
    price: 60,
    features: [
      "Uncapped Data",
      "Up to 200Mbps",
      "Free Installation",
      "Dedicated account manager",
    ],
  },
];

export default function Plan() {
  const [selected, setSelected] = useState("lite");
  const [fibreOpen, setFibreOpen] = useState(true);
  const search = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (search.get("location")) {
      const selectedData = plans.find((item) => item.id === selected);
      if (selectedData) {
        router.push(
          `/home-internet/plan?location=${search.get("location")}&label=${selectedData.name}&value=${selectedData.price}&type=price`,
        );
      }
    }
  }, []);

  if (search.get("location")) {
    return (
      <div className="w-full">
        <div className="w-full max-w-3xl bg-white rounded-xl p-8 shadow-sm">
          {/* Header */}
          <div className="text-sm text-[#6b7280] mb-2">
            <div className="flex gap-1 items-center">
              <CiLocationOn color="#F2A413" size={15} strokeWidth={1} />
              <span className="font-medium text-[#F2A413]">
                {`${search.get("location")}`}
              </span>
              <button className="ml-2 text-[#2563eb] underline">
                <Link href="/home-internet">Change</Link>
              </button>
            </div>
          </div>

          <h1 className="text-3xl font-semibold text-[#111827] mb-2">
            Choose Your Plan
          </h1>
          <p className="text-[#6b7280] mb-6">
            Available services in your area. Expand a connection type to see
            packages.
          </p>

          {/* Fibre Section */}
          <div className="border border-[#d1d5db] rounded-xl">
            <div className="flex justify-between items-center p-4">
              <div>
                <h2 className="font-semibold text-[#111827]">Fibre</h2>
                <p className="text-sm text-[#6b7280]">
                  High-speed, stable wired connection
                </p>
              </div>
              <button
                onClick={() => setFibreOpen(!fibreOpen)}
                className="px-4 py-2 border rounded-lg text-sm"
              >
                {fibreOpen ? "Collapse" : "Expand"}
              </button>
            </div>

            {fibreOpen && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                {plans.map((plan) => {
                  const isSelected = selected === plan.id;

                  return (
                    <div
                      key={plan.id}
                      onClick={() => {
                        setSelected(plan.id);
                        router.push(
                          `/home-internet/plan?location=${search.get("location")}&label=${plan.name}&value=${plan.price}&type=price`,
                        );
                      }}
                      className={`relative border rounded-xl p-5 cursor-pointer transition 
                        ${
                          isSelected
                            ? "border-[#f59e0b] bg-[#fff7ed]"
                            : "border-[#e5e7eb] bg-white"
                        }`}
                    >
                      {plan.popular && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#f59e0b] text-white text-xs px-3 py-1 rounded-full">
                          MOST POPULAR
                        </span>
                      )}

                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-lg font-semibold">{plan.name}</h3>

                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center 
                            ${
                              isSelected
                                ? "bg-[#f59e0b] border-[#f59e0b]"
                                : "border-[#d1d5db]"
                            }`}
                        >
                          {isSelected && (
                            <FaCheck className="w-3 h-3 text-white" />
                          )}
                        </div>
                      </div>

                      <p className="text-[#111827] font-medium mb-3">
                        {selected === plan.id
                          ? plan.price
                            ? `${plan.price}/mo`
                            : "Select to see pricing"
                          : "Select to see pricing"}
                      </p>

                      <hr className="mb-3" />

                      <ul className="space-y-2 text-sm text-[#374151]">
                        {plan.features.map((f, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="w-4 h-4 bg-[#f59e0b] rounded-full flex items-center justify-center text-white text-[10px]">
                              ✓
                            </span>
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* LTE Section */}
          <div className="mt-4 border border-[#e5e7eb] rounded-xl p-4 flex justify-between items-center">
            <div>
              <h2 className="font-semibold">LTE</h2>
              <p className="text-sm text-[#6b7280]">
                Flexible wireless, quick to deploy
              </p>
            </div>
            <button className="px-4 py-2 border rounded-lg text-sm">
              Expand
            </button>
          </div>

          {/* FWA Section */}
          <div className="mt-4 border border-[#e5e7eb] rounded-xl p-4 flex justify-between items-center opacity-50">
            <div>
              <h2 className="font-semibold">Fixed Wireless (FWA)</h2>
              <p className="text-sm text-[#6b7280]">
                Not available at your address
              </p>
            </div>
            <span className="text-sm">Unavailable</span>
          </div>

          {/* Footer */}
          <div className="flex justify-between mt-6">
            <button
              className="px-6 py-3 border border-[#1f2937] rounded-lg"
              onClick={() => {
                router.push(`/home-internet`);
              }}
            >
              Back
            </button>
            <button
              className="px-6 py-3 bg-[#1f4d5a] text-white rounded-lg"
              onClick={() => {
                if (search.get("location")) {
                  const selectedData = plans.find(
                    (item) => item.id === selected,
                  );
                  if (selectedData) {
                    router.push(
                      `/home-internet/extras?location=${search.get("location")}&label=${selectedData.name}&value=${selectedData.price}&type=price`,
                    );
                  }
                }
              }}
            >
              Continue →
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    redirect("/home-internet");
  }
}
